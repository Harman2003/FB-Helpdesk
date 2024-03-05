import { AxiosInstance, AxiosResponse } from "axios";

export interface disconnectFBProps {
  email: string;
  axios: AxiosInstance;
}
export const disconnectFB = async ({
  email,
  axios,
}: disconnectFBProps): Promise<AxiosResponse | void> => {
  const response = await axios.delete(
    "/page/disconnect",
    { params: { email} }
  );
  return response;
};
