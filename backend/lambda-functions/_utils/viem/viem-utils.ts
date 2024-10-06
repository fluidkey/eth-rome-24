import {
  AbiItem,
  createPublicClient,
  createWalletClient, encodeFunctionData,
  encodePacked,
  fallback,
  http,
  PrivateKeyAccount,
  toBytes,
} from 'viem';
import { base } from 'viem/chains';
import { CallMultisendInput } from './viem-utils-types';

export const SAFE_MODULE_ABI = [{ inputs: [{ internalType: 'address', name: 'smartAccount', type: 'address' }], name: 'AlreadyInitialized', type: 'error' }, { inputs: [{ internalType: 'address', name: 'smartAccount', type: 'address' }], name: 'NotInitialized', type: 'error' }, { inputs: [], name: 'AAVE_ORACLE', outputs: [{ internalType: 'contract AaveOracle', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'AAVE_V3_POOL', outputs: [{ internalType: 'contract AaveV3Pool', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'USDC', outputs: [{ internalType: 'contract ERC20', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [], name: 'WETH_GATEWAY', outputs: [{ internalType: 'contract WETHGateway', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'address', name: 'safe', type: 'address' }], name: 'borrow', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'smartAccount', type: 'address' }], name: 'isInitialized', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'uint256', name: 'typeID', type: 'uint256' }], name: 'isModuleType', outputs: [{ internalType: 'bool', name: '', type: 'bool' }], stateMutability: 'pure', type: 'function' }, { inputs: [], name: 'name', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'pure', type: 'function' }, { inputs: [{ internalType: 'address', name: '', type: 'address' }], name: 'offRampAddress', outputs: [{ internalType: 'address', name: '', type: 'address' }], stateMutability: 'view', type: 'function' }, { inputs: [{ internalType: 'bytes', name: 'data', type: 'bytes' }], name: 'onInstall', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'bytes', name: 'data', type: 'bytes' }], name: 'onUninstall', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [{ internalType: 'address', name: 'safe', type: 'address' }], name: 'repay', outputs: [], stateMutability: 'nonpayable', type: 'function' }, { inputs: [], name: 'version', outputs: [{ internalType: 'string', name: '', type: 'string' }], stateMutability: 'pure', type: 'function' }] as AbiItem[];
export const SAFE_MODULE_ADDRESS = '0x0Ff6bD338c7bCFc3E4f4063e9E6d04B440bB8864'.toLowerCase();
export const createViemPublicClient = () => {
  return createPublicClient({
    chain: {
      id: 8453,
      rpcUrls: {
        default: { http: ['{ALCHEMY_URL_THERE}'] },
      },
      name: 'base',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18,
      },
    },
    transport: fallback([
      http('{ALCHEMY_URL_THERE}'),
      http(), // finally fall back to the public one
    ]),
  });
};
export const createViemWalletClient = (account: PrivateKeyAccount) => {
  return createWalletClient({
    account: account,
    chain: base,
    transport: fallback([
      http('{ALCHEMY_URL_THERE}'),
      http(), // finally fall back to the public one
    ]),
  });
};

/**
 * Encode a single operation that needs to be performed by the multisend
 * @param operation
 * @param to
 * @param value
 * @param data
 */
const encodeTransaction = ({ operation = 0, to, value, data }: CallMultisendInput) => {
  const dataLength = BigInt(toBytes(data).length);
  const encoded = encodePacked(
    ['uint8', 'address', 'uint256', 'uint256', 'bytes'],
    [operation, to, value, dataLength, data],
  ).slice(2);
  return encoded;
};

/**
 * Transform a list of transactions into a hex value, that's the input parameter for the Safe Multisend
 * @param callMultisendInputs
 */
export const encodeMultisend = (callMultisendInputs: CallMultisendInput[]): string => {
  const encoded = '0x' + callMultisendInputs.map(tx => encodeTransaction(tx)).join('');
  return encoded;
};

/**
 * Function that receives in input the list of outgoing transactions and prepares the data to be sent to the multicall.
 * The response is a 0x txData string field, ready to be passed as calldata in the relayer call, along with the
 * address of the multicall contract
 * @param params
 */
export const prepareTxDataForMulticall = (params: {
  txs: string[];
  safeAddress: string;
}): {
  txData: `0x${string}`;
  multicallAddress: `0x${string}`;
} => {
  const encodedTxs = encodeMultisend(params.txs.map(t => {
    return {
      operation: 0,
      to: params.safeAddress as `0x${string}`,
      value: BigInt(0),
      data: t as `0x${string}`,
    };
  }));
  const txData = encodeFunctionData({
    abi: [{ inputs: [{ internalType: 'bytes', name: 'transactions', type: 'bytes' }], name: 'multiSend', outputs: [], stateMutability: 'payable', type: 'function' }] as AbiItem[],
    functionName: 'multiSend',
    args: [
      encodedTxs,
    ],
  });
  return {
    txData: txData,
    multicallAddress: '0x9641d764fc13c8B624c04430C7356C1C7C8102e2' as `0x${string}`,
  };
};
