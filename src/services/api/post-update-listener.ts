import { api } from "@/config/axios"

export const updateListenerStatus = (listenerID: string) => {
  return api.put('/api/v1/Listener/' + listenerID).then(i => i.data)
}