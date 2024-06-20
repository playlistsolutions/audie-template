import {api} from '../../config/axios';

export async function getXML() {
  const response = await api.get('/api/v1/Xml/');

  return response.data;
}
