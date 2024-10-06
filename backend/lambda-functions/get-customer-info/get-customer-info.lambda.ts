import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { verifyPrivyAuth } from '../_utils/verifyPrivyAuth/verify-privy-auth';
import assert from 'assert';
import {
  convertCustomerDynDbToCustomer,
  getCustomerFromAuthWalletAddress,
  getCustomerFromIdCustomer,
  updateKycAndTosStatus,
  updateLiquidationAddress,
} from '../_utils/customerDynamoDB/customer-dynamodb';
import { FluidloanCustomer } from '../_utils/globalTypes/global-types';
import { createLiquidationAddress, getCustomerKycStatus } from '../_utils/bridgeApi/bridge-api';
import { callLambdaFunctionAsync } from '../_utils/callLambdaFunction/call-lambda-function';
import { LambdaClient } from '@aws-sdk/client-lambda';
import { resourceNameManager } from '../_utils/resource-name-manager/resource-name-manager';
import { CreateFluidLoanSafeLambdaProps } from '../create-fluid-loan-safe/create-fluid-loan-safe-types';

const environment: string = process.env.ENVIRONMENT as string;
if (environment === undefined) throw new Error('ENVIRONMENT env variable is missing');

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2<FluidloanCustomer>> => {
  console.log('headers', event.headers);
  const authUser = await verifyPrivyAuth(event.headers);
  assert(!!authUser.userAddress, 'User address is missing');

  // load the customer
  let customer = await getCustomerFromAuthWalletAddress(authUser.userAddress);
  if (!customer) {
    return {
      statusCode: 201,
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  // get the updated kyc status from bridge
  const updateKyc = await getCustomerKycStatus(customer._bridgeXyzDetails.idKycLink);
  if (customer.tosStatus !== updateKyc.tos_status || customer.kycStatus !== updateKyc.kyc_status
    || customer._bridgeXyzDetails.idCustomer !== updateKyc.customer_id) {
    assert(!!updateKyc.customer_id, 'Customer id is expected');
    await updateKycAndTosStatus({
      idCustomer: customer.idCustomer,
      bridgeIdCustomer: updateKyc.customer_id,
      tosStatus: updateKyc.tos_status as OnOffRampBridgexyzTosStatus,
      kycStatus: updateKyc.kyc_status as OnOffRampBridgexyzKycStatus,
    });
    customer.tosStatus = updateKyc.tos_status as OnOffRampBridgexyzTosStatus;
    customer.kycStatus = updateKyc.kyc_status as OnOffRampBridgexyzKycStatus;
    customer._bridgeXyzDetails.idCustomer = updateKyc.customer_id;
  }

  // if the kyc status is verified but we don't have liquidationAddress, let's created it
  if (customer && customer.kycStatus === OnOffRampBridgexyzKycStatus.APPROVED && customer.tosStatus === OnOffRampBridgexyzTosStatus.APPROVED
    && !customer.liquidationAddress) {
    const liquidationAddressCreated = await createLiquidationAddress({
      customer: customer,
    });
    await updateLiquidationAddress({
      idCustomer: customer.idCustomer,
      liquidationAddress: liquidationAddressCreated,
    });
    // call the creation of the fluidLoan Safe
    await callLambdaFunctionAsync({
      lambdaClient: new LambdaClient({}),
      functionName: `${resourceNameManager.getEnvironment()}-fluidloan-eth-rome-24-create-fluid-loan-safe-lambda`,
      payload: {
        idCustomer: customer.idCustomer,
      } as CreateFluidLoanSafeLambdaProps,
    });

    // reload the customer
    customer = await getCustomerFromIdCustomer(customer.idCustomer);
    assert(!!customer, 'Customer not found');
  }

  return {
    statusCode: 201,
    body: JSON.stringify(convertCustomerDynDbToCustomer(customer)),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
