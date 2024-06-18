import {api} from '@/config/axios';
import {useQuery} from '@tanstack/react-query';

export interface GetParticipantResponse {
  id: number;
  name: string;
  personId: number;
  promotionId: number;
}

export async function getParticipant(promotionId: string) {
  const response = await api.get<GetParticipantResponse[]>(
    '/api/v1/Participant/ByPromotionID/' + promotionId,
  );

  return response.data;
}

export const useParticipants = (promotionId: string) =>
  useQuery({
    queryKey: ['participants'],
    queryFn: () => getParticipant(promotionId),
  });
