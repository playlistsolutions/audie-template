import {api} from '@/config/axios';

interface PostAccountInfoPayload {
  provider: string;
  displayName: string;
  gender: number;
  birthDate: Date;
  password: string;
  uid: null;
  userId: string;
  lastLogin: null;
  dateJoined: null;
  ExtraData: {
    name: string;
    email: string;
    phoneNumber: string;
    uid: null;
  };
}

export async function postAccountInfo(payload: PostAccountInfoPayload) {
  const response = await api.post('/api/v1/AuthAccount', payload);

  return response.data;
}
