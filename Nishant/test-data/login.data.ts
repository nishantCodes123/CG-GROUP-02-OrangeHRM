export type LoginData = {
  username: string;
  password: string;
  caseName: string;
};

export const invalidLoginData: LoginData[] = [
  {
    caseName: 'invalid username and password',
    username: 'wrong-user',
    password: 'wrong-password',
  },
  {
    caseName: 'blank username and password',
    username: '',
    password: '',
  },
];

export const validLoginData: LoginData = {
  caseName: 'documented demo credentials',
  username: 'Admin',
  password: 'admin123',
};
