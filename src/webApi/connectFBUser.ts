import { AxiosInstance, AxiosResponse } from "axios";

export interface connectFBProps {
  email: string;
  mode: "authorize" | "connect";
  user_token: string;
  axios: AxiosInstance;
}
export const connectFBUser = async ({
  email,
  mode,
  user_token,
  axios,
}: connectFBProps): Promise<AxiosResponse | void> => {
  const response = await axios.post(
    "/page/connect",
    {},{params:{email, mode, user_token}}
  );
  return response;
};
