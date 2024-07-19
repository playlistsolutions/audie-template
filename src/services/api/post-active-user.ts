import { api } from '../../config/axios';

export async function postActiveUser(id: string) {
  const response = await api.post('/api/v1/AuthAccount/activeUser/' + id);

  return response.data;
}