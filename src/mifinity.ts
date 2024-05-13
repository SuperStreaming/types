export type IframeTransactionProps = {
  client: {
    firstName: string;
    lastName: string;
    nationality: string;
    phone: string;
    dialingCode: string;
    dobYear: string;
    dobMonth: string;
    dobDay: string;
  };
  address: {
    addressLine1: string;
    countryCode: string;
    city: string;
  };
  money: {
    amount: number;
    currency: string;
  };
};
