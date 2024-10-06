import { APIGatewayProxyEventHeaders } from 'aws-lambda';
import { PrivyClient, User } from '@privy-io/server-auth';
import assert from 'assert';
import { VerifiedPrivyUser } from './verify-privy-auth-types';

/**
 * Verify the Privy Auth token and returns the auth user
 * @param headers
 */
export const verifyPrivyAuth = async (headers: APIGatewayProxyEventHeaders): Promise<VerifiedPrivyUser> => {
  const appId = process.env.PRIVY_APP_ID as string;
  const appSecret = process.env.PRIVY_APP_SECRET as string;
  assert(!!appId, 'PRIVY_APP_ID is missing');
  assert(!!appSecret, 'PRIVY_APP_SECRET is missing');

  let privyUser: User;
  let userAddress: `0x${string}`;
  try {
    const privyClient = new PrivyClient(appId, appSecret);
    const authToken = headers.authorization?.replace(/^Bearer /, '');
    assert(!!authToken, 'Authorization header is missing');
    const verifiedClaims = await privyClient.verifyAuthToken(
      authToken,
    );
    let privyUserId = verifiedClaims.userId;
    privyUser = await privyClient.getUserById(privyUserId);
    assert(!!privyUser.wallet?.address, 'User address is missing');
    userAddress = privyUser.wallet?.address.toLowerCase() as `0x${string}`;
    assert(!!userAddress, 'User address is missing');
  } catch (error) {
    console.error(error);
    throw error;
  }
  return {
    privyUser: privyUser,
    userAddress: userAddress,
  };
};
