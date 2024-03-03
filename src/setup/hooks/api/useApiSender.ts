import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
// import { toast } from "react-toastify";
import useAxiosPrivate from "../auth/useAxiosPrivate";
import axios from "@/setup/axios/axios";
import { toast } from "sonner";

const useApiSender = (call: any, isPrivate: boolean) => {
  const axiosPrivate = useAxiosPrivate();
  const apiCall: any = async (params: any) => {
    if (isPrivate) {
      return await call({ ...params, axios: axiosPrivate });
    } else {
      return await call({ ...params, axios: axios });
    }
  };

   const { mutateAsync, isLoading, data, status} = useMutation(apiCall, {
     onSuccess: (response: AxiosResponse) => {
       console.log(response?.data);
     },
     onSettled(res, error) {
       let message;
       if (error) {
         message = (error as any).response?.data?.message;
         if (!message) message = "Something went wrong";
         toast.error(message);
       } else {
         message = res?.data?.message;
         if(message)toast.success(message);
       }
     },
   });

  const send = async (params: any) => mutateAsync(params);
  return {
    send,
    isLoading,
    data: data?.data,
    status,
  };
};
export default useApiSender;
