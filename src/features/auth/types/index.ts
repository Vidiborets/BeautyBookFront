export interface signUpPayload {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export type AuthUser = {
  id: number;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
};

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};
