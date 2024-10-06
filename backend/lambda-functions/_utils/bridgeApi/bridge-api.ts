import {
  ExchangeRateResponse, GetExchangeRateResponse,
  KYCLinkBridgeAPIItem,
  KYCLinksAPIResponse,
  LiquidationAddressAPIResponse,
  TransferRequest, TransferResponse
} from './bridge-api-types';
import axios from 'axios';
import { keccak256, toBytes } from 'viem';
import { loadBridgexyzSecret } from '../loadSecrets/load-secrets';
import assert from 'assert';
import { FluidloanCustomerDynDBItem } from '../globalTypes/global-types';
import cryptoRandomString from 'crypto-random-string';
import BigNumber from 'bignumber.js';

/**
 * Creates a KYC link for a new user.
 * @param params
 */
export const createKycLink = async (params: {
  authUserAddress: `0x${string}`;
  fullName: string;
  email: string;
  type: OnOffRampBridgexyzKycLinkType;
}): Promise<KYCLinkBridgeAPIItem> => {
  const bridgeApiKey = await loadBridgexyzSecret();
  const idempotencyKey = keccak256(toBytes(`${params.authUserAddress}2`), 'hex');
  const response = await axios.post<KYCLinkBridgeAPIItem>(
    'https://api.bridge.xyz/v0/kyc_links',
    {
      full_name: params.fullName,
      email: params.email,
      type: params.type,
      endorsements: ['base', 'sepa'],
    },
    {
      headers: {
        'Api-Key': bridgeApiKey,
        'Idempotency-Key': idempotencyKey,
      },
    },
  );
  return response.data;
};

/**
 * Creates a liquidation address for the user and returns it.
 * @param params
 */
export const createLiquidationAddress = async (params: {
  customer: FluidloanCustomerDynDBItem;
}): Promise<string> => {
  assert(!!params.customer._bridgeXyzDetails.idCustomer, 'Bridge Customer id is missing');
  const idExternalAccount = await createExternalAccount({
    customer: params.customer,
  });
  // create the liquidation address pointing to the external account just created
  const bridgeApiKey = await loadBridgexyzSecret();
  const idempotencyKey = keccak256(toBytes(`${idExternalAccount}`), 'hex');
  let response;
  try {
    response = await axios.post<LiquidationAddressAPIResponse>(
      `https://api.bridge.xyz/v0/customers/${params.customer._bridgeXyzDetails.idCustomer}/liquidation_addresses`,
      {
        chain: 'base',
        currency: 'usdc',
        external_account_id: idExternalAccount,
        destination_sepa_reference: 'FluidLoan Deposit',
        destination_payment_rail: 'sepa',
        destination_currency: 'eur',
        custom_developer_fee_percent: '0',
      },
      {
        headers: {
          'Api-Key': bridgeApiKey,
          'Idempotency-Key': idempotencyKey,
        },
      },
    );
  } catch (e: any) {
    console.error('Error creating liquidation address:', e);
    throw e;
  }
  let liquidationAddress = response.data.address;
  assert(!!liquidationAddress, 'Liquidation address not created');
  return liquidationAddress;
};

/**
 * This function returns the kyc status of a customer from email
 * @param email
 */
export const getCustomerKycFromEmail = async (email: string): Promise<KYCLinkBridgeAPIItem> => {
  // get the customerId from the bridgeAPI
  const bridgeApiKey = await loadBridgexyzSecret();
  const encodedEmail = encodeURIComponent(email);
  const response = await axios.get<KYCLinksAPIResponse>(
    `https://api.bridge.xyz/v0/kyc_links?email=${encodedEmail}`,
    {
      headers: {
        'Api-Key': bridgeApiKey,
      },
    },
  );
  let retrievedCustomer = response.data;
  assert(retrievedCustomer.count === 1, 'The email should be unique');
  return retrievedCustomer.data[0];
};

/**
 * This function returns the kyc status of a customer from the kyc Link id
 * @param idKycLink
 */
export const getCustomerKycStatus = async (idKycLink: string): Promise<KYCLinkBridgeAPIItem> => {
  // get the customerId from the bridgeAPI
  const bridgeApiKey = await loadBridgexyzSecret();
  const response = await axios.get<KYCLinkBridgeAPIItem>(
    `https://api.bridge.xyz/v0/kyc_links/${idKycLink}`,
    {
      headers: {
        'Api-Key': bridgeApiKey,
      },
    },
  );
  return response.data;
};

/**
 * Create an external account of type IBAN for an existing customer.
 * Returns the id of the external account
 */
export const createExternalAccount = async (params: {
  customer: FluidloanCustomerDynDBItem;
}): Promise<string> => {

  let bankDetails = params.customer._bridgeExternalAccountDetails;

  let apiCallBody = {
    currency: 'eur',
    account_owner_name: bankDetails.firstName + ' ' + bankDetails.lastName,
    account_type: 'iban',
    iban: {
      account_number: bankDetails.ibanDetails.iban,
      bic: bankDetails.ibanDetails.bic,
      country: bankDetails.ibanDetails.country,
    },
    account_owner_type: 'individual',
    first_name: bankDetails.firstName,
    last_name: bankDetails.lastName,
    bank_name: bankDetails.bankName,
  };

  const bridgeApiKey = await loadBridgexyzSecret();
  // Perform the axios call to the bridgexyz API
  let response;
  try {
    response = await axios.post(
      `https://api.bridge.xyz/v0/customers/${params.customer._bridgeXyzDetails.idCustomer}/external_accounts`,
      apiCallBody,
      {
        headers: {
          'Idempotency-Key': cryptoRandomString({ length: 15, type: 'alphanumeric' }),
          'Api-Key': bridgeApiKey,
        },
      },
    );
  } catch (e: any) {
    if ( !!e.response && !!e.response.data && e.response.data.code === 'duplicate_external_account' ) {
      return e.response.data.id;
    } else {
      console.error('Error creating external account:', e);
      throw e;
    }
  }
  return response.data.id;
};


/**
 * Gets the current exchange rate between two currencies.
 * @param params
 */
export const getExchangeRate = async (params: { from: string; to: string }): Promise<GetExchangeRateResponse> => {
  assert(params.from && params.to, 'From and To currencies are required');
  assert(params.from === 'usd', 'Only USD to EUR is supported');
  assert(params.to === 'eur', 'Only USD to EUR is supported');
  const bridgeApiKey = await loadBridgexyzSecret();
  const response = await axios.get<ExchangeRateResponse>('https://api.bridge.xyz/v0/exchange_rates', {
    headers: {
      'Api-Key': bridgeApiKey,
    },
    params: {
      from: params.from,
      to: params.to,
    },
  });
  return {
    buy_rate: parseFloat(response.data.buy_rate),
    midmarket_rate: parseFloat(response.data.midmarket_rate),
    sell_rate: parseFloat(response.data.sell_rate),
  };
};


/**
 * Creates a transfer from EUR IBAN/SEPA to Base USDC.
 * @param params
 */
export const createEurSepaOnRampTransfer = async (params: {
  customer: FluidloanCustomerDynDBItem;
  amount: number;
  destinationAddress: `0x${string}`;
}): Promise<TransferResponse> => {
  const bridgeApiKey = await loadBridgexyzSecret();

  // Get customer's external account ID
  // const externalAccountId = params.customer._bridgeExternalAccountDetails?.idExternalAccount;
  // assert(!!externalAccountId, 'Customer external account ID is missing');
  assert(!!params.customer._bridgeXyzDetails.idCustomer, 'Customer id is missing');

  const requestBody: TransferRequest = {
    amount: BigNumber(params.amount).toFixed(2, 0), // always round up
    on_behalf_of: params.customer._bridgeXyzDetails.idCustomer,
    source: {
      currency: 'eur',
      payment_rail: 'sepa',
      // external_account_id: externalAccountId,
    },
    destination: {
      currency: 'usdc',
      payment_rail: 'base',
      to_address: params.destinationAddress,
    },
  };

  // Generate an idempotency key
  const idempotencyKey = keccak256(
    toBytes(cryptoRandomString({ length: 15, type: 'alphanumeric' })), // currently we do not put any consistent idempotency key
    'hex',
  );

  let response;
  try {
    response = await axios.post<TransferResponse>('https://api.bridge.xyz/v0/transfers', requestBody, {
      headers: {
        'Api-Key': bridgeApiKey,
        'Idempotency-Key': idempotencyKey,
      },
    });
  } catch (e: any) {
    console.error(e);
    throw e;
  }
  return response.data;
};
