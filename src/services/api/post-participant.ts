import {api} from '@/config/axios';

export interface PostParticipantPayload {
  isActive: boolean;
  personId: number;
  promotionId: number;
}

export async function postParticipant(payload: PostParticipantPayload) {
  const response = await api.post('/api/v1/Participant', payload);

  return response.data;
}
