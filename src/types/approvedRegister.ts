import { Experience } from "./experience";

export interface IApprovedRegister {
  experiences: Experience[];
  cpf: string;
  name: string;
  birthDate: string;
  phone: string;
  cep: string;
  city: string;
  state: string;
  neighborhood: string;
  pcd: string;
  gender: string;
  race: string;
  education: string;
  courses: string;

  rg: string;
  docIssuedOrg: string;
  docIssuedState: string;
  docExpeditionDate: string;
  maritalStatus: string;
  motherName: string;
  fatherName: string;
  street: string;
  number: string;
  complement: string;
}
