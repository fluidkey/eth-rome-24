export interface CreateNewCustomerLambdaProps {
  /** Full name of the customer */
  fullName: string;
  /** Email address of the customer */
  email: string;
  /** Type of the customer, either 'individual' or 'business' */
  type: OnOffRampBridgexyzKycLinkType;
  /** Details of the bank account where to offramp money */
  offrampAccount: OfframpAccountCreate;
}

export interface OfframpAccountCreate {
  /** First name of the account holder */
  firstName: string;
  /** Last name of the account holder */
  lastName: string;
  /** Name of the bank */
  bankName: string;
  /** IBAN details */
  ibanDetails: {
    /** IBAN number */
    iban: string;
    /** BIC code */
    bic: string;
    /** Country code (ISO 3166-1) */
    country: string;
  };
}
