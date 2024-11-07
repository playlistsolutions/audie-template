import { api } from '../../config/axios';

export interface PostVerifyCodePayload {
  To: string;
  Code: string;
  Valid: boolean;
}

export async function verifyCode(payload: PostVerifyCodePayload) {
  const response = await api.post('/api/v1/doLogin/VerifyCode', payload);

  return response.data.data;
}
