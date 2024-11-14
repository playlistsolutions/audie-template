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
  category: string;
  deleted: boolean;
  description: string;
  id: number;
  image: string;
  imageUri: string;
  publishedAt: string;
  summary: string;
  title: string;
}

interface NewsResponse {
  data: { result: News[] }
  message: string
  errors: object[]
}

export async function getNews(page: string, size: number) {
  const response = await api.get<NewsResponse>(`api/v1/News?CurrentPage=${page}&PageSize=${size}`);

  return response.data.data;
}