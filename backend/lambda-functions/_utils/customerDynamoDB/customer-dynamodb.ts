import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import cryptoRandomString from 'crypto-random-string';
import { FluidloanCustomer, FluidloanCustomerDynDBItem } from '../globalTypes/global-types';
import { OfframpAccountCreate } from '../../create-new-customer/create-new-customer-types';

const ddbClient = new DynamoDBClient({});
const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false,
};
const unmarshallOptions = {
  wrapNumbers: false,
};
const dynamoDBDocument = DynamoDBDocument.from(ddbClient, { marshallOptions, unmarshallOptions });

const CUSTOMER_TABLE_NAME = `${process.env.ENVIRONMENT}.fluidloan-eth-rome-24-customer.dynamodb-table`;

/**
 * Create a new customer in the DynamoDB table.
 * @param params
 */
export const createCustomer = async (params: {
  authWalletAddress: `0x${string}`;
  tosStatus: OnOffRampBridgexyzTosStatus;
  kycStatus: OnOffRampBridgexyzKycStatus;
  kycLinks: {
    tos: string;
    kyc: string;
  };
  kycType: OnOffRampBridgexyzKycLinkType;
  idKycLink: string;
  offrampAccount: OfframpAccountCreate;
}): Promise<FluidloanCustomer> => {
  const { authWalletAddress, tosStatus, kycStatus, kycLinks, kycType } = params;

  const item: FluidloanCustomerDynDBItem = {
    idCustomer: `flcus_${cryptoRandomString({ length: 15, type: 'alphanumeric' })}`,
    authWalletAddress,
    tosStatus,
    kycStatus,
    kycLinks,
    kycType,
    liquidationAddressChain: 8453,
    _bridgeExternalAccountDetails: params.offrampAccount,
    _bridgeXyzDetails: {
      idKycLink: params.idKycLink,
    },
  };

  await dynamoDBDocument.put({
    TableName: CUSTOMER_TABLE_NAME,
    Item: item,
  });

  return convertCustomerDynDbToCustomer(item);
};

/**
 * Get a customer from DynamoDB using idCustomer.
 * @param idCustomer
 */
export const getCustomerFromIdCustomer = async (idCustomer: string): Promise<FluidloanCustomerDynDBItem | undefined> => {
  const result = await dynamoDBDocument.get({
    TableName: CUSTOMER_TABLE_NAME,
    Key: { idCustomer },
  });

  return result.Item as FluidloanCustomerDynDBItem | undefined;
};

/**
 * Get a customer using authWalletAddress.
 * This function first queries the 'authWalletAddress-index' to find the idCustomer,
 * then retrieves the full customer record using getCustomerFromIdCustomer.
 * @param authWalletAddress
 */
export const getCustomerFromAuthWalletAddress = async (
  authWalletAddress: `0x${string}`,
): Promise<FluidloanCustomerDynDBItem | undefined> => {
  const queryResult = await dynamoDBDocument.query({
    TableName: CUSTOMER_TABLE_NAME,
    IndexName: 'authWalletAddress-index',
    KeyConditionExpression: 'authWalletAddress = :authWalletAddress',
    ExpressionAttributeValues: {
      ':authWalletAddress': authWalletAddress,
    },
    ProjectionExpression: 'idCustomer',
  });

  if (queryResult.Items && queryResult.Items.length > 0) {
    const { idCustomer } = queryResult.Items[0];
    return getCustomerFromIdCustomer(idCustomer);
  } else {
    return undefined;
  }
};

/**
 * Get a customer using fluidLoanSafe.
 * This function first queries the 'fluidLoanSafe-index' to find the idCustomer,
 * then retrieves the full customer record using getCustomerFromIdCustomer.
 * @param fluidLoanSafe
 */
export const getCustomerFromFluidLoanSafe = async (fluidLoanSafe: string): Promise<FluidloanCustomerDynDBItem | undefined> => {
  const queryResult = await dynamoDBDocument.query({
    TableName: CUSTOMER_TABLE_NAME,
    IndexName: 'fluidLoanSafe-index',
    KeyConditionExpression: 'fluidLoanSafe = :fluidLoanSafe',
    ExpressionAttributeValues: {
      ':fluidLoanSafe': fluidLoanSafe,
    },
    ProjectionExpression: 'idCustomer',
  });

  if (queryResult.Items && queryResult.Items.length > 0) {
    const { idCustomer } = queryResult.Items[0];
    return getCustomerFromIdCustomer(idCustomer);
  } else {
    return undefined;
  }
};

/**
 * Removed the values that are part of the dynamodb object but should not be publicly exposed (All starting with _)
 * @param customer
 */
export const convertCustomerDynDbToCustomer = (customer: FluidloanCustomerDynDBItem): FluidloanCustomer => {
  const cleanedCustomer: Partial<FluidloanCustomerDynDBItem> = { ...customer };

  for (const key in cleanedCustomer) {
    if (key.startsWith('_')) {
      delete (cleanedCustomer as Record<string, unknown>)[key];
    }
  }

  return cleanedCustomer as FluidloanCustomer;
};

/**
 * Update the liquidationAddress for a customer in the DynamoDB table.
 * @param params
 */
export const updateLiquidationAddress = async (params: {
  idCustomer: string;
  liquidationAddress: string;
}): Promise<void> => {
  await dynamoDBDocument.update({
    TableName: CUSTOMER_TABLE_NAME,
    Key: { idCustomer: params.idCustomer },
    UpdateExpression: 'SET liquidationAddress = :liquidationAddress',
    ExpressionAttributeValues: {
      ':liquidationAddress': params.liquidationAddress,
    },
  });
};

/**
 * Update the kycStatus and tosStatus for a customer in the DynamoDB table.
 * @param params
 */
export const updateKycAndTosStatus = async (params: {
  idCustomer: string;
  bridgeIdCustomer: string;
  kycStatus: OnOffRampBridgexyzKycStatus;
  tosStatus: OnOffRampBridgexyzTosStatus;
}): Promise<void> => {
  await dynamoDBDocument.update({
    TableName: CUSTOMER_TABLE_NAME,
    Key: { idCustomer: params.idCustomer },
    UpdateExpression: 'SET #kycStatus = :kycStatus, #tosStatus = :tosStatus, #bridgeXyzDetails.#idCustomer = :bridgeIdCustomer',
    ExpressionAttributeNames: {
      '#kycStatus': 'kycStatus',
      '#tosStatus': 'tosStatus',
      '#bridgeXyzDetails': '_bridgeXyzDetails',
      '#idCustomer': 'idCustomer',
    },
    ExpressionAttributeValues: {
      ':kycStatus': params.kycStatus,
      ':tosStatus': params.tosStatus,
      ':bridgeIdCustomer': params.bridgeIdCustomer,
    },
  });
};

/**
 * Update the fluidLoanSafe for a customer in the DynamoDB table.
 * @param params
 */
export const updateFluidLoanSafe = async (params: {
  idCustomer: string;
  fluidLoanSafe: string;
}): Promise<void> => {
  await dynamoDBDocument.update({
    TableName: CUSTOMER_TABLE_NAME,
    Key: { idCustomer: params.idCustomer },
    UpdateExpression: 'SET fluidLoanSafe = :fluidLoanSafe',
    ExpressionAttributeValues: {
      ':fluidLoanSafe': params.fluidLoanSafe,
    },
  });
};

/**
 * Get the customer based on the fluidLoanSafe address passed.
 * Throws an error if more than one customer is found.
 * @param fluidLoanSafe
 */
export const getSingleCustomerIdFromFluidLoanSafe = async (fluidLoanSafe: string): Promise<string | undefined> => {
  const queryResult = await dynamoDBDocument.query({
    TableName: CUSTOMER_TABLE_NAME,
    IndexName: 'fluidLoanSafe-index',
    KeyConditionExpression: 'fluidLoanSafe = :fluidLoanSafe',
    ExpressionAttributeValues: {
      ':fluidLoanSafe': fluidLoanSafe,
    },
    ProjectionExpression: 'idCustomer',
  });

  if (!queryResult.Items || queryResult.Items.length === 0) {
    return undefined; // No customer found
  }

  if (queryResult.Items.length > 1) {
    throw new Error('Multiple customers found with the same fluidLoanSafe.');
  }

  return queryResult.Items[0].idCustomer;
};
