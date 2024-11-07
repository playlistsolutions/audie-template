import {api} from '../../config/axios';

export interface Participant {
  id: number;
  name: string;
  personId: number;
  promotionId: number;
}

interface ParticipantResponse {
  data: Participant[]
  message: string
  errors: object[]
}

export async function getParticipant(promotionId: string) {
  const response = await api.get<ParticipantResponse>(
    '/api/v1/Participant/ByPromotionID/' + promotionId,
  );

  return response.data.data;
}
