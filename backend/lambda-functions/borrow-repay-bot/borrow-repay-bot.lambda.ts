import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { getSingleCustomerIdFromFluidLoanSafe } from '../_utils/customerDynamoDB/customer-dynamodb';
import { SAFE_MODULE_ABI, SAFE_MODULE_ADDRESS } from '../_utils/viem/viem-utils';
import { encodeFunctionData } from 'viem';
import { callLambdaFunctionAsync } from '../_utils/callLambdaFunction/call-lambda-function';
import { LambdaClient } from '@aws-sdk/client-lambda';
import { resourceNameManager } from '../_utils/resource-name-manager/resource-name-manager';
import { CreateTxRelayLambdaProps } from '../relay-tx/relay-tx-types';
import { getTransactionInitiatorOnBaseMainnet } from '../_utils/alchemy/alchemy-utils';
import { RELAYER_ADDRESS } from '../../_utils/constants';

const environment: string = process.env.ENVIRONMENT as string;
if (environment === undefined) throw new Error('ENVIRONMENT env variable is missing');

// TODO - this is here just for hackathon purposes - in prod should be a separate process
const alchemyApiToken: string = process.env.ALCHEMY_API_TOKEN as string;
if (alchemyApiToken === undefined) throw new Error('ALCHEMY_API_TOKEN env variable is missing');

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('event.headers', event.headers);
  console.log('event.body', event.body);

  const body = !!event.body ? JSON.parse(event.body) : {};
  if ( body.event === undefined || body.event === null ) {
    console.error('Event is missing');
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Webhook handled successfully',
      }),
    };
  }
  // add all the addresses found in the event - only if the value is not 0
  // do it for ETH and USDC
  const alchemyNetwork: { network: string; activity: any } = body.event;
  if ( alchemyNetwork.network === undefined ||
    alchemyNetwork.network === null ||
    alchemyNetwork.network !== 'BASE_MAINNET') {
    console.warn('Network is not BASE_MAINNET');
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Webhook handled successfully',
      }),
    };
  }
  const addressesMovedUSDC: string[] = [];
  const addressesMovedETH: string[] = [];
  for ( const activity of alchemyNetwork.activity ) {
    if ( activity.value === 0 ) continue;
    let txHash = activity.hash;
    let txInititator = await getTransactionInitiatorOnBaseMainnet(txHash);
    if (txInititator.toLowerCase() === RELAYER_ADDRESS) {
      console.log('tx of the relay - ignoring it');
      continue;
    }
    // we track only the address where money has been sent to, that is when the money is received by our safes
    if ( activity.asset === 'ETH' ) {
      // addressesMovedETH.push(activity.fromAddress);
      addressesMovedETH.push(activity.toAddress);
    } else if ( activity.asset === 'USDC' ) {
      // addressesMovedUSDC.push(activity.fromAddress);
      addressesMovedUSDC.push(activity.toAddress);
    }
  }

  for ( const address of Array.from(new Set(addressesMovedETH)) ) {
    const idCustomer = await getSingleCustomerIdFromFluidLoanSafe(address.toLowerCase());
    if (!idCustomer) {
      continue;
    }
    console.log('Execute borrow module for address: ', address);
    // borrow with safeAddress as parameter
    const txData = encodeFunctionData({
      abi: SAFE_MODULE_ABI,
      functionName: 'borrow',
      args: [address],
    });
    await callLambdaFunctionAsync({
      lambdaClient: new LambdaClient({}),
      functionName: `${resourceNameManager.getEnvironment()}-fluidloan-eth-rome-24-relay-tx-lambda`,
      payload: {
        to: SAFE_MODULE_ADDRESS,
        txData: txData,
      } as CreateTxRelayLambdaProps,
    });
  }
  for ( const address of Array.from(new Set(addressesMovedUSDC)) ) {
    const idCustomer = await getSingleCustomerIdFromFluidLoanSafe(address.toLowerCase());
    if (!idCustomer) {
      continue;
    }
    console.log('Execute repay module for address: ', address);
    // repay with safeAddress as parameter
    const txData = encodeFunctionData({
      abi: SAFE_MODULE_ABI,
      functionName: 'repay',
      args: [address],
    });
    await callLambdaFunctionAsync({
      lambdaClient: new LambdaClient({}),
      functionName: `${resourceNameManager.getEnvironment()}-fluidloan-eth-rome-24-relay-tx-lambda`,
      payload: {
        to: SAFE_MODULE_ADDRESS,
        txData: txData,
      } as CreateTxRelayLambdaProps,
    });
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Webhook handled successfully',
    }),
  };
};
