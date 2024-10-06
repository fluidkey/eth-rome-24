/** Response from the KYC Link API */
export interface KYCLinkBridgeAPIItem {
  /** Unique identifier for the KYC link */
  id: string;

  /** Email of the customer associated with the KYC link */
  email: string;

  /** Type of KYC being performed ('individual' or 'business') */
  type: 'individual' | 'business';

  /** Link to the KYC flow */
  kyc_link: string;

  /** URL for accepting terms of service */
  tos_link: string;

  /** Current status of the KYC process */
  kyc_status: 'not_started' | 'pending' | 'incomplete' | 'awaiting_ubo' | 'manual_review' | 'under_review' | 'approved' | 'rejected';

  /** Current status of the terms of service acceptance */
  tos_status: 'pending' | 'approved';

  /** Date and time when the KYC link was created */
  created_at: string;

  /** Unique identifier for the associated customer, present when both kyc_status and tos_status are approved */
  customer_id?: string;

  /** List of rejection reasons, if applicable */
  rejection_reasons?: {
    /** Developer-specific reason for rejection */
    developer_reason: string;

    /** Customer-facing reason for rejection */
    reason: string;

    /** Date and time when the rejection reason was created */
    created_at: string;
  }[];
}


/** Response from the KYC Links API */
export interface KYCLinksAPIResponse {
  /** Total number of items in data */
  count: number;

  /** List of KYC links */
  data: KYCLinkBridgeAPIItem[];
}

/** Liquidation Address Response Schema */
export interface LiquidationAddressAPIResponse {
  /** Chain on which the liquidation address is created */
  chain: 'arbitrum' | 'avalanche_c_chain' | 'base' | 'ethereum' | 'optimism' | 'polygon' | 'solana' | 'stellar';

  /** The liquidation address created */
  address: `0x${string}`;

  /** Currency being used for liquidation */
  currency: 'usdc' | 'usdt' | 'dai';

  /** External bank account ID to which Bridge will send the funds */
  external_account_id?: string;

  /** Developer's prefunded account ID to which Bridge will send the funds */
  prefunded_account_id?: string;

  /** Message to be sent with a wire transfer */
  destination_wire_message?: string;

  /** Reference message to be sent with a SEPA transaction */
  destination_sepa_reference?: string;

  /** Reference message to be sent with an ACH transaction */
  destination_ach_reference?: string;

  /** Payment rail used to send funds to the customer */
  destination_payment_rail: 'ach' | 'wire' | 'ach_push' | 'ach_same_day' | 'arbitrum' | 'avalanche_c_chain' | 'base' | 'ethereum' | 'optimism' | 'polygon' | 'sepa' | 'solana' | 'stellar' | 'swift';

  /** Currency used to send funds to the customer */
  destination_currency: 'usdc' | 'usdt' | 'dai' | 'usd' | 'eur';

  /** Crypto wallet address to which funds will be sent */
  destination_address?: string;

  /** Memo included in the blockchain transaction */
  destination_blockchain_memo?: string;

  /** Developer fee percent for this Liquidation Address */
  custom_developer_fee_percent?: string | null;

  /** State of the liquidation address */
  state?: 'active' | 'deactivated';
}


/** Exchange Rate Response Schema */
export interface ExchangeRateResponse {
  /** The midmarket exchange rate. */
  midmarket_rate: string;

  /** The rate for buying the target currency, including Bridge's fee. */
  buy_rate: string;

  /** The rate for selling the target currency, including Bridge's fee. */
  sell_rate: string;
}


/** Exchange Rate Response Schema */
export interface GetExchangeRateResponse {
  /** The midmarket exchange rate. */
  midmarket_rate: number;

  /** The rate for buying the target currency, including Bridge's fee. */
  buy_rate: number;

  /** The rate for selling the target currency, including Bridge's fee. */
  sell_rate: number;
}

/** Transfer Request Schema */
export interface TransferRequest {
  /** A unique identifier for the transfer in your system (optional). */
  client_reference_id?: string;

  /** The amount to transfer, in the smallest currency unit (e.g., cents). */
  amount: string;

  /** The ID of the customer on behalf of whom the transfer is made. */
  on_behalf_of: string;

  /** Developer fee amount in the smallest currency unit (optional). */
  developer_fee?: string;

  /** Source details for the transfer. */
  source: {
    /** Currency of the source funds. */
    currency: string;

    /** Payment rail for the source. */
    payment_rail: string;

    /** External account ID if applicable. */
    external_account_id?: string;
  };

  /** Destination details for the transfer. */
  destination: {
    /** Currency of the destination funds. */
    currency: string;

    /** Payment rail for the destination. */
    payment_rail: string;

    /** External account ID if applicable. */
    external_account_id?: string;

    /** Blockchain address if applicable. */
    to_address?: string;
  };
}

/** Transfer Response Schema */
export interface TransferResponse {
  /** Unique identifier for the transfer. */
  id: string;

  /** Client-provided reference ID for the transfer. */
  client_reference_id?: string;

  /** The amount transferred, represented as a decimal string. */
  amount: string;

  /** Currency of the transfer. */
  currency: string;

  /** The ID of the customer on behalf of whom the transfer is made. */
  on_behalf_of: string;

  /** Developer fee amount represented as a decimal string. */
  developer_fee?: string;

  /** Source details for the transfer. */
  source: {
    /** Currency of the source funds. */
    currency: string;

    /** Payment rail for the source. */
    payment_rail: string;

    /** External account ID if applicable. */
    external_account_id?: string;

    /** Deprecated OMAD for wire transfers. */
    omad?: string;

    /** IMAD for wire transfers. */
    imad?: string;

    /** Bank beneficiary name for wire transfers. */
    bank_beneficiary_name?: string;

    /** Bank beneficiary address for wire transfers. */
    bank_beneficiary_address?: string;

    /** Bank routing number for wire transfers. */
    bank_routing_number?: string;

    /** Bank name for wire transfers. */
    bank_name?: string;

    /** Deposit description for ACH transfers. */
    description?: string;

    /** From address for crypto wallet transfers. */
    from_address?: string;
  };

  /** Deposit instructions if required. */
  source_deposit_instructions?: {
    /** Payment rail for the deposit. */
    payment_rail: string;

    /** Amount for the deposit. */
    amount: string;

    /** Currency for the deposit. */
    currency: string;

    /** From address for crypto deposit transfers. */
    from_address?: string;

    /** To address for crypto deposit transfers. */
    to_address?: string;

    /** Required deposit message. */
    deposit_message?: string;

    /** Bank name for wire or SEPA deposits. */
    bank_name?: string;

    /** Bank address for wire or SEPA deposits. */
    bank_address?: string;

    /** Bank routing number for wire or SEPA deposits. */
    bank_routing_number?: string;

    /** Bank account number for wire or SEPA deposits. */
    bank_account_number?: string;

    /** Beneficiary name for wire or SEPA deposits. */
    bank_beneficiary_name?: string;

    /** Beneficiary address for wire or SEPA deposits. */
    bank_beneficiary_address?: string;

    /** IBAN for SEPA deposits. */
    iban?: string;

    /** BIC for SEPA deposits. */
    bic?: string;

    /** Account holder name for SEPA deposits. */
    account_holder_name?: string;
  };

  /** Destination details for the transfer. */
  destination: {
    /** Currency of the destination funds. */
    currency: string;

    /** Payment rail for the destination. */
    payment_rail: string;

    /** External account ID if applicable. */
    external_account_id?: string;

    /** OMAD for wire transfers. */
    omad?: string;

    /** IMAD for wire transfers. */
    imad?: string;

    /** Trace number for ACH transfers. */
    trace_number?: string;

    /** Wire message for wire transfers. */
    wire_message?: string;

    /** SEPA reference for SEPA transactions. */
    sepa_reference?: string;

    /** ACH reference for ACH transactions. */
    ach_reference?: string;

    /** To address for crypto wallet transfers. */
    to_address?: string;

    /** Blockchain memo for crypto transactions. */
    blockchain_memo?: string;
  };

  /** Transfer status. */
  state: 'awaiting_funds' | 'in_review' | 'funds_received' | 'payment_submitted' | 'payment_processed' | 'canceled' | 'error' | 'returned' | 'refunded';

  /** Receipt details for the transfer. */
  receipt?: {
    /** Initial amount of the transfer. */
    initial_amount: string;

    /** Developer fee for the transfer. */
    developer_fee: string;

    /** Exchange fee for the transfer. */
    exchange_fee: string;

    /** Subtotal amount after fees. */
    subtotal_amount: string;

    /** Remaining prefunded balance for Prefunded Accounts. */
    remaining_prefunded_balance?: string;

    /** Gas fee for crypto transfers. */
    gas_fee?: string;

    /** Final amount after gas fees. */
    final_amount?: string;

    /** Source transaction hash for on-chain deposits. */
    source_tx_hash?: string;

    /** Destination transaction hash for on-chain transfers. */
    destination_tx_hash?: string;

    /** Effective exchange rate for SEPA transfers. */
    exchange_rate?: string;

    /** URL for user-facing receipt. */
    url?: string;
  };

  /** Return details if the transfer is returned. */
  return_details?: {
    /** Reason for the return. */
    reason: string;
  };

  /** Date and time when the transfer was created. */
  created_at: string;

  /** Date and time when the transfer was last updated. */
  updated_at: string;
}


