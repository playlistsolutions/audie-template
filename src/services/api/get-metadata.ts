import axios from 'axios';
import {api} from '../../config/axios';

export async function getMetadata() {
  const response = await api.get('/api/v1/Xml');
  const xml = await axios.get(response.data.data).then((i) => i.data)
  return xml;
}