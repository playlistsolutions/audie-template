import {api} from '../../config/axios';
import {useQuery} from '@tanstack/react-query';

export async function getMetadata(URL: string) {
  const response = await api.get(URL);

  return response.data;
}

export const useParticipants = (URL: string) =>
  useQuery({
    queryKey: ['metadata'],
    queryFn: () => getMetadata(URL),
    refetchInterval: 120000,
    refetchIntervalInBackground: true,
  });
