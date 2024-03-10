import { AxiosInstance, AxiosResponse } from "axios";

export interface loginProps {
  axios: AxiosInstance;
}
export const logout = async ({
  axios,
}: loginProps): Promise<AxiosResponse | void> => {
  const response = await axios.post(
    "/auth/logout",
    { withCredentials: true }
  );
  return response;
};
