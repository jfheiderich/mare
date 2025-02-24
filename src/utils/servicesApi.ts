const url_dev = "";

const currentURL = url_dev;

const servicesAPI = {
  // whatsappCode: `${currentURL}/wpp`,
} as const;

export type ServiceType = keyof typeof servicesAPI;

export const servicesApi = <T extends ServiceType>(
  service: T
): (typeof servicesAPI)[T] => {
  return servicesAPI[service];
};
