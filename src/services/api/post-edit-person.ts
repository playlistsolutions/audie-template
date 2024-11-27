import { api } from '../../config/axios';

export interface UpdatePersonPayload {
  name: string;
  email: string;
  cellphone: string;
  nationalRegister: string;
  stateRegister: string;
  birthDate: Date;
  gender: number
}

export async function updatePerson(id: number, payload: UpdatePersonPayload) {
  const response = await api.put('/api/v1/Person/' + id, payload);

  return response.data.data;
}
