import { api } from "@/config/axios";

interface PostMusicEvaluationPayload {
  personId: number,
  name: string,
  singer: string,
  mD5: string,
  evaluation: number
}

export async function postMusicEvaluation(payload: PostMusicEvaluationPayload) {
  const response = await api.post('/api/v1/MusicEvaluation', payload);

  return response.data.data;
}