export interface CreateTxRelayLambdaProps {
  /**
   * The address where the tx must be relayed
   */
  to: `0x${string}`;
  /**
   * The tx data to relay
   */
  txData: `0x${string}`;
}
