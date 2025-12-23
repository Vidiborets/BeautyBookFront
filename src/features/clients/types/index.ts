export type Client = {
  id: number;
  name: string;
  phone?: string;
  note?: string;
};

export type CreateClientPayload = {
  name: string;
  phone?: string;
  note?: string;
};

export type ClientFormValues = {
  name: string;
  phone: string;
  note: string;
};

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};
