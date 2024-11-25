import { api } from "@/config/axios";

interface PostUserEvaluationPayload {
  personId: number,
  mD5: string
}

export async function postUserEvaluation(payload: PostUserEvaluationPayload) {
  const response = await api.post('/api/v1/MusicEvaluation/personevaluation', payload);

  return response.data.data;
}