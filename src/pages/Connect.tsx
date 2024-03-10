import { useLogin } from "react-facebook";
import { useEffect, useState } from "react";
import useApiReceiver from "@/setup/hooks/api/useApiReceiver";
import useAuth from "@/setup/hooks/auth/useAuth";
import connectSpinner from "@/assets/connectSpinner.svg";
import spinner from "@/assets/spinner.svg";
import Modal from "@/components/modal/Modal";
import { connectFBUser } from "@/webApi/connectFBUser";
import useApiSender from "@/setup/hooks/api/useApiSender";
import { disconnectFB } from "@/webApi/disconnectFB";
import { Link } from "react-router-dom";
import usePage from "@/setup/hooks/auth/usePage";

const Connect = () => {
  const { auth } = useAuth();
  const { page, pageFetching, refetch } = usePage();
  const { login } = useLogin();
  const [isModal, setIsModal] = useState<boolean>(false);
  // const { data, isLoading, receive } = useApiReceiver(
  //   "/page/status",
  //   { email: auth.email },
  //   true
  // );
  const { page_id, page_name, status } = page;
  const { send: connect, isLoading: connecting } = useApiSender(
    connectFBUser,
    true
  );
  const { send: disconnect, isLoading: disconnecting } = useApiSender(
    disconnectFB,
    true
  );

  const onConnect = async () => {
    try {
      const { authResponse } = await login({
        scope:
          "email, public_profile, pages_show_list, pages_manage_metadata, pages_messaging",
      });

      await connect({
        email: auth.email,
        mode: "authorize",
        user_token: authResponse?.accessToken,
      });
      setIsModal(true);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onDisconnect = async () => {
    try {
      await disconnect({ email: auth.email });
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (!isModal || !connecting || !disconnecting) refetch();
  }, [isModal, connecting, disconnecting]);

  return (
    <div className="bg-[#044080] w-full h-full flex px-4 font-Montserrat relative">
      <div className="m-auto bg-white w-full max-w-[400px] min-h-[200px]  p-8 rounded-2xl flex flex-col justify-center items-center gap-5">
        {pageFetching ? (
          <img src={connectSpinner} alt="connecting..." className="w-6" />
        ) : (
          <>
            <span className="text-lg self-center font-semibold">
              Facebook Page Integration
            </span>
            {status === "connected" && (
              <div className="flex justify-center gap-1 text-lg self-center overflow-ellipsis w-full whitespace- overflow- ">
                <span className="whitespace-nowrap">Integrated Page :</span>
                <div className="text-lg self-center font-semibold ">
                  {page_name}
                </div>
              </div>
            )}
            {status === "connected" && (
              <button
                className="w-full bg-[#b21217] rounded-md h-12 p-3 mt-2 text-white flex justify-center"
                onClick={onDisconnect}
                disabled={disconnecting}
              >
                {disconnecting ? (
                  <img src={spinner} alt="Loading..." className="w-6" />
                ) : (
                  "Delete Integration"
                )}
              </button>
            )}

            {status === "connected" ? (
              <Link
                to={"/app"}
                className="w-full bg-[#044080] rounded-md h-12 p-3 mt-2 text-white flex justify-center cursor-pointer"
              >
                {connecting ? (
                  <img src={spinner} alt="Loading..." className="w-6" />
                ) : (
                  "Reply To Messages"
                )}
              </Link>
            ) : (
              <button
                className="w-full bg-[#044080] rounded-md h-12 p-3 mt-2 text-white flex justify-center cursor-pointer"
                onClick={onConnect}
                disabled={connecting}
              >
                {connecting ? (
                  <img src={spinner} alt="Loading..." className="w-6" />
                ) : (
                  "Connect Page"
                )}
              </button>
            )}
          </>
        )}

        {isModal && <Modal isOpen={isModal} close={() => setIsModal(false)} />}
      </div>
    </div>
  );
};

export default Connect;
