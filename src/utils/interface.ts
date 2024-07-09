export type Transaction = {
  payment_type?: string;
  transaction_details: {
    order_id: string;
    gross_amount: number;
  };
  bank_transfer?: {
    bank?: string;
    account_number?: string;
  };
  credit_card?: {
    secure?: boolean;
  };
  customer_details: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
};
