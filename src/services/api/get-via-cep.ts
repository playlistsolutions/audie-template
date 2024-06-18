import {api} from '@/config/axios';

interface GetViaCEPResponse {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

export async function getViaCep(CEP: string) {
  const response = await api.get<GetViaCEPResponse>(
    `https://viacep.com.br/ws/${CEP}/json/`,
  );

  return response.data;
}
