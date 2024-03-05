import { AxiosInstance, AxiosResponse } from "axios";

export interface loginProps {
  email: string;
  password: string;
  remember: boolean;
  axios: AxiosInstance;
}
export const login = async ({
  email,
  password,
  remember,
  axios,
}: loginProps): Promise<AxiosResponse | void> => {
  const response = await axios.post(
    "/auth/login",
    {
      email: email,
      password: password,
      remember: remember,
    },
    { withCredentials: true }
  );
  return response;
};
