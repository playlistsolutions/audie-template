import { api } from '../../config/axios';

interface Level {
  id: number;
  levelDescription: string;
  levelImage: string;
  levelName: string;
  nivel: number;
  stationId: number;
}

export interface LevelResponse {
  level: { currentLevel: Level };
  promotionCriterias: number;
}

interface GetLevelResponse {
  data: LevelResponse
  message: string
  errors: object[]
}

export async function getLevel(personId: number) {
  const response = await api.post<GetLevelResponse>(
    '/api/v1/Level/setLevel/' + personId,
  );

  return response.data.data;
}
