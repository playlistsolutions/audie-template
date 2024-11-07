import { useQuery } from '@tanstack/react-query';
import { api } from '../../config/axios';
import { PromotionPagination } from './get-account-by-auth-id';

interface Rules {
  ageStart: number;
  ageEnd: number;
  rangeAge: boolean;
  operatorBetweenAges: boolean;
  operatorBetween: string | null;
  state: string | null;
  neighborhood: string | null;
  city: string | null;
  gender: string | null;
}

interface PromotionRules {
  id: number;
  promotionId: number;
  rules: Rules;
  isActive: boolean;
  createTime: string;
  updateTime: string;
  stationId: number;
  station: string | null;
}

export interface Advertising {
  id: number;
  stationId: number;
  localId: number;
  description: string;
  title: string;
  image: string;
  imageUrl: string;
  isAd: boolean;
  position: number;
  externalUrl: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  dateUndefined: boolean;
  promotionRules: PromotionRules;
}

interface AdvertisingResponse {
  data: Advertising[]
  message: string
  errors: object[]
}

export async function getAdvertising(page: string, lastId: string | undefined) {
  const response = await api.get<AdvertisingResponse>(`api/v1/Promotion/ad?${lastId ? `LastId=${lastId}` : `CurrentPage=${page}`}&PageSize=10`);

  return response.data.data;
}