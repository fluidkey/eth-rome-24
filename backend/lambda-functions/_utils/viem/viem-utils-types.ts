export interface CallMultisendInput {
  operation?: number;
  to: `0x${string}`;
  value: bigint;
  data: `0x${string}`;
}
