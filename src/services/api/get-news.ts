import { useQuery } from '@tanstack/react-query';
import { api } from '../../config/axios';

interface NewsCategory {
  createTime: Date;
  deleted: boolean;
  id: number;
  isActive: boolean;
  name: string;
}

export interface News {
  author: string;
  newsCategory: NewsCategory;
  deleted: boolean;
  description: string;
  id: number;
  image: string;
  imageUrl: string;
  publishedAt: string;
  summary: string;
  title: string;
}

interface NewsResponse {
  data: News[]
  message: string
  errors: object[]
}

export async function getNews(page: string, lastId: string | undefined) {
  const response = await api.get<NewsResponse>(`api/v1/News?${lastId ? `LastId=${lastId}` : `CurrentPage=${page}`}&PageSize=20`);

  return response.data.data;
}