import fetchApi from "../fetchApi";

export type ListAllCandidatesResponse = {
  id: string;
  created_at: string;
  destroyed_at: string | null;
  updated_at: string | null;
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
  courses: string[];
  file: string | null;
  note: string;
  registration_via: "whatsapp" | "platform";
};

const LIST_ALL_CANDIDATES = async (
  token: string
): Promise<{
  res: ListAllCandidatesResponse[] | null;
  status: number | null;
}> => {
  return await fetchApi({
    service: "candidate",
    method: "GET",
    endPoint: `/list-all-candidates`,
    token,
  });
};

export default LIST_ALL_CANDIDATES;
