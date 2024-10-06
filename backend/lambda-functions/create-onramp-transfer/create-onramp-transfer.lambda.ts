import { APIGatewayProxyEvent, APIGatewayProxyResultV2 } from 'aws-lambda';
import assert from 'assert';
import { getCustomerFromAuthWalletAddress } from '../_utils/customerDynamoDB/customer-dynamodb';
import { createEurSepaOnRampTransfer, getExchangeRate } from '../_utils/bridgeApi/bridge-api';
import { CreateOnrampTransferResponse } from './create-onramp-transfer-types';
import { verifyPrivyAuth } from '../_utils/verifyPrivyAuth/verify-privy-auth';

const environment: string = process.env.ENVIRONMENT as string;
if (environment === undefined) throw new Error('ENVIRONMENT env variable is missing');

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResultV2<CreateOnrampTransferResponse>> => {
  console.log('event.headers', event.headers);
  console.log('event.body', event.body);
  const authUser = await verifyPrivyAuth(event.headers);
  assert(!!authUser.userAddress, 'User address is missing');

  const body = !!event.body ? JSON.parse(event.body) : {};
  const amount = body.amount;
  assert(!!amount, 'Amount is required');
  assert(typeof amount === 'number', 'Amount must be a number');
  assert(amount > 0, 'Amount must be greater than 0');

  // load the customer
  const customer = await getCustomerFromAuthWalletAddress(authUser.userAddress);
  assert(!!customer, 'Customer not found');
  assert(!!customer.fluidLoanSafe, 'Customer safe not found');

  // eval the amount to be paid back in eur
  let exchangeRage = await getExchangeRate({
    from: 'usd',
    to: 'eur',
  });
  // here we add a + cents just to avoid rounding error in the hackathon demo
  let eurToSend = (amount + 0.01) * exchangeRage.buy_rate; // use the most conservative rate

  // create the transfer API
  const transfer = await createEurSepaOnRampTransfer({
    amount: eurToSend,
    customer,
    destinationAddress: customer.fluidLoanSafe as `0x${string}`,
  });

  console.log('Transfer created', transfer);

  // return the details with the money to pay
  return {
    statusCode: 201,
    body: JSON.stringify({
      idTransfer: transfer.id,
      source_deposit_instructions: {
        amount: transfer.source_deposit_instructions?.amount,
        currency: transfer.source_deposit_instructions?.currency,
        payment_rail: transfer.source_deposit_instructions?.payment_rail,
        iban: transfer.source_deposit_instructions?.iban,
        deposit_message: transfer.source_deposit_instructions?.deposit_message,
        bic: transfer.source_deposit_instructions?.bic,
        account_holder_name: transfer.source_deposit_instructions?.account_holder_name,
        bank_name: transfer.source_deposit_instructions?.bank_name,
        bank_address: transfer.source_deposit_instructions?.bank_address,
      },
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
