"use client";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { PrivyProvider } from '@privy-io/react-auth'
import { WagmiProvider } from '@privy-io/wagmi';
import { config } from '@/config/privyWagmiConfig';
const queryClient = new QueryClient();

export function PrivyWagmiProvider({children}: {children: React.ReactNode}) {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        appearance: {
          theme: 'light',
        },
        embeddedWallets: { 
          createOnLogin: 'users-without-wallets'
        },
        loginMethods: ['farcaster', 'email', 'wallet']  
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
        {children}
      </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  );
}