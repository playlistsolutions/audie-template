import { api } from '../../config/axios';

interface GetVerificationCodePayload {
  To: string;
}

export async function getVerificationCode({ To }: GetVerificationCodePayload) {
  const response = await api.post('/api/v1/doLogin/VerificationCode/', { To });

  return response.data.data;
}
