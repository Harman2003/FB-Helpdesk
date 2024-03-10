import { useEffect, useState } from "react";
import Chat from "../components/chat";
import Sidebar from "../components/sidebar/Sidebar";
import Menu from "../components/sidebar/menu";
import { socket } from "@/setup/socket/socket";
import useAuth from "@/setup/hooks/auth/useAuth";
import Ping from "@/components/Ping/Ping";
import usePage from "@/setup/hooks/auth/usePage";
import { useNavigate } from "react-router-dom";
const Conversations = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { page, pageFetching } = usePage();

  const [status, setStatus] = useState<"connected" | "disconnected" | "error">(
    "disconnected"
  );

  useEffect(() => {
    function onConnect() {
      console.log("came");
      setStatus("connected");
    }
    function onDisconnect() {
      setStatus("disconnected");
    }
    function onError() {
      setStatus("error");
    }
    socket.auth = { access_token: auth.accessToken };
    socket.connect();
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.on("connect_error", onError);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log(page.status)
    if (page.status === "disconnected") {
      navigate("/connect");
    }
  }, [pageFetching])

  return pageFetching ? (
    <div className="w-full h-full flex">
      <span className="m-auto text-lg font-Montserrat">Connecting To Page...</span>
    </div>
  ) : (
    <div className="w-full h-full flex">
      <div className="w-[72px]">
        <Sidebar />
      </div>
      <div className="w-[300px]">
        <Menu />
      </div>
      <div className="flex-grow">
        <Chat />
      </div>

      <div className="fixed bottom-3 right-3">
        <Ping status={status} />
      </div>
    </div>
  );
};

export default Conversations;
