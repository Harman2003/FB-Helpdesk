import { AxiosInstance, AxiosResponse } from "axios";

export interface sendMessageProps {
  message: string;
  conversation_id: string;
  axios: AxiosInstance;
}
export const sendMessage = async ({
  message,
  conversation_id,
  axios,
}: sendMessageProps): Promise<AxiosResponse | void> => {
  const response = await axios.post("/chat/messages", {
    message,
    conversation_id,
  });
  return response;
};
