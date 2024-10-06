import assert from 'assert';
import axios from 'axios';

/**
 * Adds an address to the list of addresses being tracked by a specific Alchemy webhook.
 * This function sends a PATCH request to the Alchemy dashboard API to add a new address
 * to the list of addresses associated with a given webhook ID. It requires an Alchemy API token
 * for authentication and the address to add. The address is converted to lowercase before being sent.
 * Both the Alchemy API token and the address are required and their absence will throw an AssertionError.
 * @param {string} alchemyApiToken - The API token for authenticating with the Alchemy API.
 * @param {string} address - The address to be added to the tracking list.
 * @returns {Promise<void>} A promise that resolves when the address has been successfully added.
 * @throws {AssertionError} If `alchemyApiToken` or `address` is falsy, indicating they are required but not provided.
 */
export const addAddressUnderTracking = async (
  alchemyApiToken: string, address: string,
): Promise<void> => {
  assert(!!alchemyApiToken, 'alchemyApiToken is required');
  assert(!!address, 'address is required');
  await axios.patch(
    'https://dashboard.alchemy.com/api/update-webhook-addresses',
    {
      webhook_id: 'wh_53e4ulutievpn6wp',
      addresses_to_add: [address.toLowerCase()],
      addresses_to_remove: [],
    },
    {
      headers: {
        'X-Alchemy-Token': alchemyApiToken,
      },
    },
  );
};

/**
 * Retrieves the address that initiated a transaction given its hash and the chain ID.
 * This function sends a POST request to the Alchemy API to fetch the transaction details,
 * then extracts and returns the 'from' address, which is the address that initiated the transaction.
 * It requires an Alchemy API token for authentication, the transaction hash, and the chain ID.
 * The transaction hash and chain ID are required and their absence will throw an AssertionError.
 * @param {string} txHash - The hash of the transaction.
 * @returns {Promise<string>} A promise that resolves to the address that initiated the transaction.
 * @throws {AssertionError} If `alchemyApiToken`, `txHash`, or `chainId` are falsy, indicating they are required but not provided.
 */
export const getTransactionInitiatorOnBaseMainnet = async (
  txHash: string,
): Promise<string> => {
  // Validate inputs
  assert(!!txHash, 'txHash is required');

  // Construct the Alchemy API URL
  const alchemyUrl = '{ALCHEMY_URL_THERE}';

  // Prepare the JSON-RPC payload
  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'eth_getTransactionByHash',
    params: [txHash],
  };

  // Send the POST request to Alchemy API
  const response = await axios.post(alchemyUrl, payload);

  // Check for errors in the response
  assert(
    response.data && !response.data.error,
    response.data.error ? response.data.error.message : 'Unknown error from Alchemy API',
  );

  // Extract the 'from' address from the transaction data
  const transaction = response.data.result;
  assert(transaction, 'Transaction not found');

  const fromAddress = transaction.from;
  assert(!!fromAddress, 'Transaction does not have a from address');

  return fromAddress;
};
