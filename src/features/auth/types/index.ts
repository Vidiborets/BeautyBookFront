export interface signUpPayload {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export type Sallons = { name: string; address: string };

export type AuthUser = {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  sallons?: Sallons[];
};

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

export type UpdateUserPayload = {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
};
