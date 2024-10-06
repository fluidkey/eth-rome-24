import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import { FluidloanCustomer } from '../_utils/globalTypes/global-types';
import { verifyPrivyAuth } from '../_utils/verifyPrivyAuth/verify-privy-auth';
import assert from 'assert';
import {
  convertCustomerDynDbToCustomer,
  createCustomer,
  getCustomerFromAuthWalletAddress,
} from '../_utils/customerDynamoDB/customer-dynamodb';
import { createKycLink, getCustomerKycFromEmail } from '../_utils/bridgeApi/bridge-api';

const environment: string = process.env.ENVIRONMENT as string;
if (environment === undefined) throw new Error('ENVIRONMENT env variable is missing');

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2<FluidloanCustomer>> => {
  console.log('event.headers', event.headers);
  console.log('event.body', event.body);
  const body:CreateNewCustomerLambdaProps = JSON.parse(event.body || '{}');
  assert(!!body.fullName, 'Full name is required');
  assert(!!body.email, 'Email is required');
  assert(!!body.type && body.type === OnOffRampBridgexyzKycLinkType.INDIVIDUAL, 'Type is required and must be individual');
  assert(!!body.offrampAccount, 'Offramp account is required');
  assert(!!body.offrampAccount.firstName, 'First name is required');
  assert(!!body.offrampAccount.lastName, 'Last name is required');
  assert(!!body.offrampAccount.bankName, 'Bank name is required');
  assert(!!body.offrampAccount.ibanDetails, 'IBAN details are required');
  assert(!!body.offrampAccount.ibanDetails.iban, 'IBAN is required');
  assert(!!body.offrampAccount.ibanDetails.bic, 'BIC is required');
  assert(!!body.offrampAccount.ibanDetails.country, 'Country is required');
  const authUser = await verifyPrivyAuth(event.headers);
  assert(!!authUser.userAddress, 'User address is missing');

  console.log(`Creating new wallet for user ${authUser.userAddress}`);

  // check if the user already exists
  const customer = await getCustomerFromAuthWalletAddress(authUser.userAddress);
  if (customer) {
    // if the customer already exists, return the customer
    return {
      statusCode: 201,
      body: JSON.stringify(convertCustomerDynDbToCustomer(customer)),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  // Call the Bridgexyz API to generate a new link
  let bridgeKycLink;
  try {
    bridgeKycLink = await createKycLink({
      authUserAddress: authUser.userAddress,
      fullName: body.fullName,
      email: body.email,
      type: body.type,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      // case when a kyc is created but the email is already existing for another user
      if (error.response?.data && error.response.data.code === 'duplicate_record') {
        console.log('User already exists in bridgexyz - retrieve its data');
        // the user is already a fluidkey user - let's move data from that user to here
        try {
          bridgeKycLink = await getCustomerKycFromEmail(body.email);
        } catch (intError) {
          throw new Error('Failed to duplicate user from fluidkey to fluidloan');
        }
      } else {
        throw error;
      }
    } else {
      throw error;
    }
  }
  assert(!!bridgeKycLink, 'Failed to create a KYC link');
  assert(!!bridgeKycLink.id, 'KYC Link ID is missing');

  // store the user created inside dynamoDB
  const newCustomer = await createCustomer({
    authWalletAddress: authUser.userAddress,
    kycLinks: {
      kyc: bridgeKycLink.kyc_link,
      tos: bridgeKycLink.tos_link,
    },
    kycStatus: bridgeKycLink.kyc_status as OnOffRampBridgexyzKycStatus,
    kycType: bridgeKycLink.type as OnOffRampBridgexyzKycLinkType,
    tosStatus: bridgeKycLink.tos_status as OnOffRampBridgexyzTosStatus,
    offrampAccount: body.offrampAccount,
    idKycLink: bridgeKycLink.id,
  });

  // return the Customer object with the KYC data
  return {
    statusCode: 201,
    body: JSON.stringify(newCustomer),
    headers: {
      'Content-Type': 'application/json',
    },
  };

};
