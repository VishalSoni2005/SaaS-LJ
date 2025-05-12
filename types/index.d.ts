interface loginInParams {
  email: string;
  idToken: string;
}

interface RegisterParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  id: string;
}

interface Customer {
  customer_id: number
  name: string
  contact_number: string
  address: string
  total_due: number
  last_purchase: string
  total_spent: number
  created_at: string
}