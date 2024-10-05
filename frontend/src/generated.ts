import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// aavePool
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const aavePoolAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'previousAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
      {
        name: 'newAdminRole',
        internalType: 'bytes32',
        type: 'bytes32',
        indexed: true,
      },
    ],
    name: 'RoleAdminChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleGranted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32', indexed: true },
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'sender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'RoleRevoked',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ADDRESSES_PROVIDER',
    outputs: [
      {
        name: '',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ASSET_LISTING_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'BRIDGE_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DEFAULT_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'EMERGENCY_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FLASH_BORROWER_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'POOL_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'RISK_ADMIN_ROLE',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'addAssetListingAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'bridge', internalType: 'address', type: 'address' }],
    name: 'addBridge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'addEmergencyAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'borrower', internalType: 'address', type: 'address' }],
    name: 'addFlashBorrower',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'addPoolAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'addRiskAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'role', internalType: 'bytes32', type: 'bytes32' }],
    name: 'getRoleAdmin',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'grantRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'hasRole',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'isAssetListingAdmin',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'bridge', internalType: 'address', type: 'address' }],
    name: 'isBridge',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'isEmergencyAdmin',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'borrower', internalType: 'address', type: 'address' }],
    name: 'isFlashBorrower',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'isPoolAdmin',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'isRiskAdmin',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'removeAssetListingAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'bridge', internalType: 'address', type: 'address' }],
    name: 'removeBridge',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'removeEmergencyAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'borrower', internalType: 'address', type: 'address' }],
    name: 'removeFlashBorrower',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'removePoolAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'admin', internalType: 'address', type: 'address' }],
    name: 'removeRiskAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'renounceRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'account', internalType: 'address', type: 'address' },
    ],
    name: 'revokeRole',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'role', internalType: 'bytes32', type: 'bytes32' },
      { name: 'adminRole', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setRoleAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const aavePoolAddress = {
  8453: '0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33',
} as const

/**
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const aavePoolConfig = {
  address: aavePoolAddress,
  abi: aavePoolAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// aaveUiPoolDataProvider
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16)
 */
export const aaveUiPoolDataProviderAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '_networkBaseTokenPriceInUsdProxyAggregator',
        internalType: 'contract IEACAggregatorProxy',
        type: 'address',
      },
      {
        name: '_marketReferenceCurrencyPriceInUsdProxyAggregator',
        internalType: 'contract IEACAggregatorProxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ETH_CURRENCY_UNIT',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MKR_ADDRESS',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_bytes32', internalType: 'bytes32', type: 'bytes32' }],
    name: 'bytes32ToString',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    name: 'getReservesData',
    outputs: [
      {
        name: '',
        internalType: 'struct IUiPoolDataProviderV3.AggregatedReserveData[]',
        type: 'tuple[]',
        components: [
          { name: 'underlyingAsset', internalType: 'address', type: 'address' },
          { name: 'name', internalType: 'string', type: 'string' },
          { name: 'symbol', internalType: 'string', type: 'string' },
          { name: 'decimals', internalType: 'uint256', type: 'uint256' },
          {
            name: 'baseLTVasCollateral',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'reserveLiquidationThreshold',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'reserveLiquidationBonus',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'reserveFactor', internalType: 'uint256', type: 'uint256' },
          {
            name: 'usageAsCollateralEnabled',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'borrowingEnabled', internalType: 'bool', type: 'bool' },
          {
            name: 'stableBorrowRateEnabled',
            internalType: 'bool',
            type: 'bool',
          },
          { name: 'isActive', internalType: 'bool', type: 'bool' },
          { name: 'isFrozen', internalType: 'bool', type: 'bool' },
          { name: 'liquidityIndex', internalType: 'uint128', type: 'uint128' },
          {
            name: 'variableBorrowIndex',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'liquidityRate', internalType: 'uint128', type: 'uint128' },
          {
            name: 'variableBorrowRate',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'stableBorrowRate',
            internalType: 'uint128',
            type: 'uint128',
          },
          {
            name: 'lastUpdateTimestamp',
            internalType: 'uint40',
            type: 'uint40',
          },
          { name: 'aTokenAddress', internalType: 'address', type: 'address' },
          {
            name: 'stableDebtTokenAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'variableDebtTokenAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'interestRateStrategyAddress',
            internalType: 'address',
            type: 'address',
          },
          {
            name: 'availableLiquidity',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalPrincipalStableDebt',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'averageStableRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'stableDebtLastUpdateTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'totalScaledVariableDebt',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'priceInMarketReferenceCurrency',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'priceOracle', internalType: 'address', type: 'address' },
          {
            name: 'variableRateSlope1',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'variableRateSlope2',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'stableRateSlope1',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'stableRateSlope2',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'baseStableBorrowRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'baseVariableBorrowRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'optimalUsageRatio',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'isPaused', internalType: 'bool', type: 'bool' },
          { name: 'isSiloedBorrowing', internalType: 'bool', type: 'bool' },
          {
            name: 'accruedToTreasury',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'unbacked', internalType: 'uint128', type: 'uint128' },
          {
            name: 'isolationModeTotalDebt',
            internalType: 'uint128',
            type: 'uint128',
          },
          { name: 'flashLoanEnabled', internalType: 'bool', type: 'bool' },
          { name: 'debtCeiling', internalType: 'uint256', type: 'uint256' },
          {
            name: 'debtCeilingDecimals',
            internalType: 'uint256',
            type: 'uint256',
          },
          { name: 'eModeCategoryId', internalType: 'uint8', type: 'uint8' },
          { name: 'borrowCap', internalType: 'uint256', type: 'uint256' },
          { name: 'supplyCap', internalType: 'uint256', type: 'uint256' },
          { name: 'eModeLtv', internalType: 'uint16', type: 'uint16' },
          {
            name: 'eModeLiquidationThreshold',
            internalType: 'uint16',
            type: 'uint16',
          },
          {
            name: 'eModeLiquidationBonus',
            internalType: 'uint16',
            type: 'uint16',
          },
          {
            name: 'eModePriceSource',
            internalType: 'address',
            type: 'address',
          },
          { name: 'eModeLabel', internalType: 'string', type: 'string' },
          { name: 'borrowableInIsolation', internalType: 'bool', type: 'bool' },
          { name: 'virtualAccActive', internalType: 'bool', type: 'bool' },
          {
            name: 'virtualUnderlyingBalance',
            internalType: 'uint128',
            type: 'uint128',
          },
        ],
      },
      {
        name: '',
        internalType: 'struct IUiPoolDataProviderV3.BaseCurrencyInfo',
        type: 'tuple',
        components: [
          {
            name: 'marketReferenceCurrencyUnit',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'marketReferenceCurrencyPriceInUsd',
            internalType: 'int256',
            type: 'int256',
          },
          {
            name: 'networkBaseTokenPriceInUsd',
            internalType: 'int256',
            type: 'int256',
          },
          {
            name: 'networkBaseTokenPriceDecimals',
            internalType: 'uint8',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
    ],
    name: 'getReservesList',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'provider',
        internalType: 'contract IPoolAddressesProvider',
        type: 'address',
      },
      { name: 'user', internalType: 'address', type: 'address' },
    ],
    name: 'getUserReservesData',
    outputs: [
      {
        name: '',
        internalType: 'struct IUiPoolDataProviderV3.UserReserveData[]',
        type: 'tuple[]',
        components: [
          { name: 'underlyingAsset', internalType: 'address', type: 'address' },
          {
            name: 'scaledATokenBalance',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'usageAsCollateralEnabledOnUser',
            internalType: 'bool',
            type: 'bool',
          },
          {
            name: 'stableBorrowRate',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'scaledVariableDebt',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'principalStableDebt',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'stableBorrowLastUpdateTimestamp',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
      { name: '', internalType: 'uint8', type: 'uint8' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'marketReferenceCurrencyPriceInUsdProxyAggregator',
    outputs: [
      {
        name: '',
        internalType: 'contract IEACAggregatorProxy',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'networkBaseTokenPriceInUsdProxyAggregator',
    outputs: [
      {
        name: '',
        internalType: 'contract IEACAggregatorProxy',
        type: 'address',
      },
    ],
    stateMutability: 'view',
  },
] as const

/**
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16)
 */
export const aaveUiPoolDataProviderAddress = {
  8453: '0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16',
} as const

/**
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16)
 */
export const aaveUiPoolDataProviderConfig = {
  address: aaveUiPoolDataProviderAddress,
  abi: aaveUiPoolDataProviderAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// erc20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    inputs: [
      { name: 'owner', type: 'address', indexed: true },
      { name: 'spender', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'value', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePool = /*#__PURE__*/ createUseReadContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"ADDRESSES_PROVIDER"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolAddressesProvider =
  /*#__PURE__*/ createUseReadContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'ADDRESSES_PROVIDER',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"ASSET_LISTING_ADMIN_ROLE"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolAssetListingAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'ASSET_LISTING_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"BRIDGE_ROLE"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolBridgeRole = /*#__PURE__*/ createUseReadContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
  functionName: 'BRIDGE_ROLE',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"DEFAULT_ADMIN_ROLE"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolDefaultAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'DEFAULT_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"EMERGENCY_ADMIN_ROLE"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolEmergencyAdminRole =
  /*#__PURE__*/ createUseReadContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'EMERGENCY_ADMIN_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"FLASH_BORROWER_ROLE"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolFlashBorrowerRole =
  /*#__PURE__*/ createUseReadContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'FLASH_BORROWER_ROLE',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"POOL_ADMIN_ROLE"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolPoolAdminRole = /*#__PURE__*/ createUseReadContract(
  {
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'POOL_ADMIN_ROLE',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"RISK_ADMIN_ROLE"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolRiskAdminRole = /*#__PURE__*/ createUseReadContract(
  {
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'RISK_ADMIN_ROLE',
  },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"getRoleAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolGetRoleAdmin = /*#__PURE__*/ createUseReadContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
  functionName: 'getRoleAdmin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"hasRole"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolHasRole = /*#__PURE__*/ createUseReadContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
  functionName: 'hasRole',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"isAssetListingAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolIsAssetListingAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'isAssetListingAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"isBridge"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolIsBridge = /*#__PURE__*/ createUseReadContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
  functionName: 'isBridge',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"isEmergencyAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolIsEmergencyAdmin =
  /*#__PURE__*/ createUseReadContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'isEmergencyAdmin',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"isFlashBorrower"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolIsFlashBorrower =
  /*#__PURE__*/ createUseReadContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'isFlashBorrower',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"isPoolAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolIsPoolAdmin = /*#__PURE__*/ createUseReadContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
  functionName: 'isPoolAdmin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"isRiskAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolIsRiskAdmin = /*#__PURE__*/ createUseReadContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
  functionName: 'isRiskAdmin',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"supportsInterface"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useReadAavePoolSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePool = /*#__PURE__*/ createUseWriteContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"addAssetListingAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolAddAssetListingAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'addAssetListingAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"addBridge"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolAddBridge = /*#__PURE__*/ createUseWriteContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
  functionName: 'addBridge',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"addEmergencyAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolAddEmergencyAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'addEmergencyAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"addFlashBorrower"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolAddFlashBorrower =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'addFlashBorrower',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"addPoolAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolAddPoolAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'addPoolAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"addRiskAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolAddRiskAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'addRiskAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolGrantRole = /*#__PURE__*/ createUseWriteContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
  functionName: 'grantRole',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"removeAssetListingAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolRemoveAssetListingAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'removeAssetListingAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"removeBridge"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolRemoveBridge =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'removeBridge',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"removeEmergencyAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolRemoveEmergencyAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'removeEmergencyAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"removeFlashBorrower"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolRemoveFlashBorrower =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'removeFlashBorrower',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"removePoolAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolRemovePoolAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'removePoolAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"removeRiskAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolRemoveRiskAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'removeRiskAdmin',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolRenounceRole =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolRevokeRole = /*#__PURE__*/ createUseWriteContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
  functionName: 'revokeRole',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"setRoleAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWriteAavePoolSetRoleAdmin =
  /*#__PURE__*/ createUseWriteContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'setRoleAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePool = /*#__PURE__*/ createUseSimulateContract({
  abi: aavePoolAbi,
  address: aavePoolAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"addAssetListingAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolAddAssetListingAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'addAssetListingAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"addBridge"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolAddBridge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'addBridge',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"addEmergencyAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolAddEmergencyAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'addEmergencyAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"addFlashBorrower"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolAddFlashBorrower =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'addFlashBorrower',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"addPoolAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolAddPoolAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'addPoolAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"addRiskAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolAddRiskAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'addRiskAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"grantRole"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolGrantRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'grantRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"removeAssetListingAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolRemoveAssetListingAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'removeAssetListingAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"removeBridge"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolRemoveBridge =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'removeBridge',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"removeEmergencyAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolRemoveEmergencyAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'removeEmergencyAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"removeFlashBorrower"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolRemoveFlashBorrower =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'removeFlashBorrower',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"removePoolAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolRemovePoolAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'removePoolAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"removeRiskAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolRemoveRiskAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'removeRiskAdmin',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"renounceRole"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolRenounceRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'renounceRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"revokeRole"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolRevokeRole =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'revokeRole',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link aavePoolAbi}__ and `functionName` set to `"setRoleAdmin"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useSimulateAavePoolSetRoleAdmin =
  /*#__PURE__*/ createUseSimulateContract({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    functionName: 'setRoleAdmin',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aavePoolAbi}__
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWatchAavePoolEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: aavePoolAbi,
  address: aavePoolAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aavePoolAbi}__ and `eventName` set to `"RoleAdminChanged"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWatchAavePoolRoleAdminChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    eventName: 'RoleAdminChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aavePoolAbi}__ and `eventName` set to `"RoleGranted"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWatchAavePoolRoleGrantedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    eventName: 'RoleGranted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link aavePoolAbi}__ and `eventName` set to `"RoleRevoked"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33)
 */
export const useWatchAavePoolRoleRevokedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: aavePoolAbi,
    address: aavePoolAddress,
    eventName: 'RoleRevoked',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16)
 */
export const useReadAaveUiPoolDataProvider =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"ETH_CURRENCY_UNIT"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16)
 */
export const useReadAaveUiPoolDataProviderEthCurrencyUnit =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'ETH_CURRENCY_UNIT',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"MKR_ADDRESS"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16)
 */
export const useReadAaveUiPoolDataProviderMkrAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'MKR_ADDRESS',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"bytes32ToString"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16)
 */
export const useReadAaveUiPoolDataProviderBytes32ToString =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'bytes32ToString',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"getReservesData"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16)
 */
export const useReadAaveUiPoolDataProviderGetReservesData =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'getReservesData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"getReservesList"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16)
 */
export const useReadAaveUiPoolDataProviderGetReservesList =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'getReservesList',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"getUserReservesData"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16)
 */
export const useReadAaveUiPoolDataProviderGetUserReservesData =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'getUserReservesData',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"marketReferenceCurrencyPriceInUsdProxyAggregator"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16)
 */
export const useReadAaveUiPoolDataProviderMarketReferenceCurrencyPriceInUsdProxyAggregator =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'marketReferenceCurrencyPriceInUsdProxyAggregator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link aaveUiPoolDataProviderAbi}__ and `functionName` set to `"networkBaseTokenPriceInUsdProxyAggregator"`
 *
 * [__View Contract on Base Basescan__](https://basescan.org/address/0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16)
 */
export const useReadAaveUiPoolDataProviderNetworkBaseTokenPriceInUsdProxyAggregator =
  /*#__PURE__*/ createUseReadContract({
    abi: aaveUiPoolDataProviderAbi,
    address: aaveUiPoolDataProviderAddress,
    functionName: 'networkBaseTokenPriceInUsdProxyAggregator',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useReadErc20 = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20Allowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20BalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20Decimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"name"`
 */
export const useReadErc20Name = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20Symbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20TotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20Abi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWriteErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20Approve = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20Transfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20TransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: erc20Abi,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__
 */
export const useSimulateErc20 = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20Approve = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20Abi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20Transfer = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20Abi, functionName: 'transfer' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20Abi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20TransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20Abi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__
 */
export const useWatchErc20Event = /*#__PURE__*/ createUseWatchContractEvent({
  abi: erc20Abi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20ApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20Abi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20TransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20Abi,
    eventName: 'Transfer',
  })
