import { User } from '@privy-io/server-auth';

export interface VerifiedPrivyUser {
  privyUser: User;
  userAddress: `0x${string}`;
}
