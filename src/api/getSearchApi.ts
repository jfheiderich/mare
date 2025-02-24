import { IAPICEPResponse } from "types/apiCEPResponse";

const getSearchAddressByCEP = async (cep: string): Promise<IAPICEPResponse> => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

  if (!response.ok) {
    throw new Error("Erro ao buscar os dados");
  }

  const res: IAPICEPResponse = await response.json();
  return res;
};

export { getSearchAddressByCEP };
