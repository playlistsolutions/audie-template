import {useQuery} from '@tanstack/react-query';
import {api} from '../../config/axios';

export interface GetNewsResponse {
  author: string;
  category: string;
  categoryId: number;
  deleted: boolean;
  description: string;
  id: number;
  image: string;
  imageUrl: string;
  publishedAt: string;
  summary: string;
  title: string;
}

export async function getNews() {
  const response = await api.get<GetNewsResponse[]>('api/v1/News/');

  return response.data;
}

export const useNews = () =>
  useQuery({
    queryKey: ['news'],
    queryFn: getNews,
    initialData: [],
    refetchOnWindowFocus: false,
  });
