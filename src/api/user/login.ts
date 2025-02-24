import fetchApi from "../fetchApi";

export type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  id: string;
  name: string;
  email: string;
  role: string;
  token: string;
};

const LOGIN = async (
  data: LoginData
): Promise<{ res: LoginResponse | null; status: number | null }> => {
  return await fetchApi({
    service: "user",
    method: "POST",
    endPoint: `/login`,
    data,
  });
};

export default LOGIN;
