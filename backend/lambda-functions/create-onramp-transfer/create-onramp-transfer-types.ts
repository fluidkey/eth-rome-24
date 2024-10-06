export interface CreateOnrampTransferResponse {
  /** Unique identifier for the transfer. */
  idTransfer: string;
  /** Deposit instructions if required. */
  source_deposit_instructions?: {
    /** Payment rail for the deposit. */
    payment_rail: string;

    /** Amount for the deposit. */
    amount: string;

    /** Currency for the deposit. */
    currency: string;

    /** Required deposit message. */
    deposit_message: string;

    /** Bank name for wire or SEPA deposits. */
    bank_name: string;

    /** Bank address for wire or SEPA deposits. */
    bank_address: string;

    /** IBAN for SEPA deposits. */
    iban: string;

    /** BIC for SEPA deposits. */
    bic: string;

    /** Account holder name for SEPA deposits. */
    account_holder_name: string;
  };
}
