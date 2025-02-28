let base_url_dev = "https://mare-api-2bda.onrender.com";

const currentURL = base_url_dev;

const servicesAPI = {
  user: `${currentURL}/user`,
  candidate: `${currentURL}/candidates`,
} as const;

export type ServiceType = keyof typeof servicesAPI;

export const servicesApi = <T extends ServiceType>(
  service: T
): (typeof servicesAPI)[T] => {
  return servicesAPI[service];
};
