export type Saloon = {
  id: number;
  name: string;
  address: string;
  phone?: string;
  employees?: SaloonEmployee[];
};

export type CreateSaloonPayload = {
  name: string;
  address: string;
  phone?: string;
};

export type UpdateSaloonPayload = Partial<CreateSaloonPayload>;

export type SaloonEmployee = {
  id: number;
  name: string;
  role?: string;
  phone?: string;
  schedule?: string;
};

export type SaloonFormValues = {
  name: string;
  address: string;
  phone?: string;
  employees: {
    name: string;
    role?: string;
    phone?: string;
    schedule?: string;
  }[];
};
