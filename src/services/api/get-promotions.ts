import {useQuery} from '@tanstack/react-query';
import {api} from '../../config/axios';

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

export interface GetPromotionsResponse {
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

export async function getPromotions() {
  const response = await api.get<GetPromotionsResponse[]>('api/v1/Promotion');

  return response.data;
}

export const usePromotions = () =>
  useQuery({
    queryKey: ['promotions'],
    queryFn: getPromotions,
    initialData: [],
  });
