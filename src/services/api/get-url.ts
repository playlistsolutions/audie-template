import {api} from '@/config/axios';
import {useQuery} from '@tanstack/react-query';

export async function getUrls() {
  const response = await api.get('/api/v1/url/all');

  return response.data;
}

export const useUrls = () =>
  useQuery({
    queryKey: ['social-media'],
    queryFn: getUrls,
  });
