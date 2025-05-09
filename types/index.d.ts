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