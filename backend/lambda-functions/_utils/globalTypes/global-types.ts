import { OfframpAccountCreate } from '../../create-new-customer/create-new-customer-types';

/**
 * Interface representing a Fluidloan Customer.
 */
export interface FluidloanCustomer {
  /** The unique identifier for the customer, formatted as `flcus_{rand15}` */
  idCustomer: string;
  /** The wallet address the user used to connect and authenticate */
  authWalletAddress: string;
  /** The status of the Terms of Service, can be either `pending` or `approved` */
  tosStatus: OnOffRampBridgexyzTosStatus;
  /** The status of the KYC process, can be one of the specified statuses */
  kycStatus: OnOffRampBridgexyzKycStatus;
  /** The reason why the user has not been KYCd, if applicable */
  kycRejectionReason?: string;
  /** Links related to KYC and Terms of Service */
  kycLinks: {
    /** Link to the Terms of Service document */
    tos: string;
    /** Link to the KYC document */
    kyc: string;
  };
  /** The type of KYC, can be either `individual` or `business` */
  kycType: OnOffRampBridgexyzKycLinkType;
  /** The liquidation address in 0x hex format */
  liquidationAddress?: string;
  /** The chain ID of the liquidation address */
  liquidationAddressChain: number;
  /** The address of the fluidloan safe deployed */
  fluidLoanSafe?: string;
}

/**
 * Interface representing a Fluidloan Customer item in DynamoDB.
 * Extends the FluidloanCustomer interface.
 */
export interface FluidloanCustomerDynDBItem extends FluidloanCustomer {
  /** Details related to bridge xyz */
  _bridgeXyzDetails: {
    /** The idCustomer for bridge xyz */
    idCustomer?: string;
    /** The KYC link for bridge xyz */
    idKycLink: string;
  };
  /** Offramp account where money are sent - stored at account creation time so that can later be used once KYC completes */
  _bridgeExternalAccountDetails: OfframpAccountCreate;
}
