import { Experience } from "./experience";

export interface ICandidateRegister {
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
}
