import {api} from '@/config/axios';

interface GetVerificationCodePayload {
  To: string;
  Message: string;
}

export async function getVerificationCode({
  To,
  Message,
}: GetVerificationCodePayload) {
  const response = await api.post('/api/v1/doLogin/VerificationCode/', {
    To,
    Message,
  });

  return response.data;
}
