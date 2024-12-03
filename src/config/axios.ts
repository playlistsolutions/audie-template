import axios from 'axios';
import { AUDIE_API_URL, AUDIE_API_KEY } from '@env';

const api = axios.create({
  baseURL: AUDIE_API_URL,
  headers: { 'X-Api-Key': AUDIE_API_KEY },
});

export { api };
