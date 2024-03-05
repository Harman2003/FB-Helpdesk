import { AxiosInstance, AxiosResponse } from "axios";

export interface connectFBPageProps {
  email: string;
  mode: "authorize" | "connect";
  page_id: string;
  page_name: string;
  axios: AxiosInstance;
}
export const connectFBPage = async ({
  email,
  mode,
  page_id,
  page_name,
  axios,
}: connectFBPageProps): Promise<AxiosResponse | void> => {
  const response = await axios.post(
    "/page/connect",
    { page_id, page_name },
    { params: { email, mode } }
  );
  return response;
};
