import { AxiosInstance, AxiosResponse } from "axios";

export interface registerProps {
  name: string;
  email: string;
  password: string;
  remember: boolean;
  axios: AxiosInstance;
}
export const register = async ({
  name,
  email,
  password,
  remember,
  axios,
}: registerProps): Promise<AxiosResponse | void> => {
  const response = await axios.post(
    "/auth/register",
    {
      name: name,
      email: email,
      password: password,
      remember: remember,
    },
    { withCredentials: true }
  );
  return response;
};
