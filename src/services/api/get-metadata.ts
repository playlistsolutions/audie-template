import {api} from '../../config/axios';
import {useQuery} from '@tanstack/react-query';

export async function getMetadata() {
  const response = await api.get('/api/v1/Xml');

  return response.data;
}

export const useMetadata = () =>
  useQuery({
    queryKey: ['metadata'],
    queryFn: () => getMetadata(),
    refetchInterval: 120000,
    refetchIntervalInBackground: true,
  });
