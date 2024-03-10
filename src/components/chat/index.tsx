import { Route, Routes } from "react-router-dom";
import ChatSection from "./ChatSection";
import VisitInboxBanner from "./VisitInboxBanner";
import { useQueryParams } from "@/setup/hooks/utils/useQueryParams";
import VisitChatBanner from "./VisitChatBanner";

const Main = () => {
  const { chat_id } = useQueryParams();
  return (
    <Routes>
      <Route
        path="/"
        element={chat_id ? <ChatSection /> : <VisitChatBanner />}
      />
      <Route path="*" element={<VisitInboxBanner />} />
    </Routes>
  );
};

export default Main;
