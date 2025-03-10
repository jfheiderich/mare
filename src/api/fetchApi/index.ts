import { servicesApi, ServiceType } from "./services-api";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

interface FetchApiProps {
  endPoint?: string;
  service: ServiceType;
  method: HttpMethod;
  data?: object;
  token?: string;
  params?: Record<string, string | number | boolean>;
}

const buildQueryParams = (
  params: Record<string, string | number | boolean>
) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    query.append(key, String(value));
  });
  return query.toString();
};

const fetchApi = async (props: FetchApiProps) => {
  const { endPoint = "", method, service, data, token, params } = props;

  let apiRoute = `${servicesApi(service)}${endPoint}`;

  if (params && Object.keys(params).length > 0) {
    const queryString = buildQueryParams(params);
    apiRoute += `?${queryString}`;
  }

  const headers: HeadersInit = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (data && ["POST", "PATCH", "PUT"].includes(method)) {
    config.body = JSON.stringify(data);
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetch(apiRoute, config);

    let res = null;
    if (response.status !== 204) {
      res = await response.json().catch(() => null);
    }

    return { res, status: response.status };
  } catch (error) {
    console.error(error);
    return { res: null, status: null };
  }
};

export default fetchApi;
