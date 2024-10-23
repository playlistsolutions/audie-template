import { api } from '../../config/axios';

export interface PostVerifyCodePayload {
  Sid: string;
  ServiceSid: string;
  AccountSid: string;
  To: string;
  Channel: string;
  Code: string;
  Message: string;
  Status: string;
  Valid: boolean;
  Url: string;
}

export async function verifyCode(payload: PostVerifyCodePayload, code: string) {
  const response = await api.post('/api/v1/doLogin/VerifyCode/' + code, payload,);

  return response.data;
}
