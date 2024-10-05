import { defineConfig } from '@wagmi/cli'
import { base } from 'viem/chains'
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20Abi } from 'viem';

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'erc20',
      abi: erc20Abi,
    },
  ],
  plugins: [
    react(),
    etherscan({
      apiKey: "YBMY8Z9SAM77NUINWEMNCD13K1QTS24Y3R",
      chainId: base.id,
      contracts: [
        {
          name: "aavePool",
          address: {
            [base.id]: "0x43955b0899Ab7232E3a454cf84AedD22Ad46FD33",
          },
        },
        {
          name: "aaveUiPoolDataProvider",
          address: {
            [base.id]: "0x5d4D4007A4c6336550DdAa2a7c0d5e7972eebd16",
          },
        },
      ],
    }),
  ],
})
