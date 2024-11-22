import { api } from "@/config/axios";

interface PostActiveListenerPayload {
  personId: number | null;
}

export const postActiveListener = (playload: PostActiveListenerPayload) => {
  return api.post('/api/v1/Listener/ActiveListeners', playload).then(i => i.data.data)
}