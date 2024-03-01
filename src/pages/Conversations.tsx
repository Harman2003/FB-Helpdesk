import ChatSection from "../components/chat/ChatSection";
import Sidebar from "../components/sidebar/Sidebar";
import Menu from "../components/sidebar/menu";

const Conversations = () => {
  return (
    <div className="w-full h-full flex">
      <div className="w-[72px]">
        <Sidebar />
      </div>
      <div className="w-[300px]">
        <Menu />
      </div>
      <div className="flex-grow">
        <ChatSection />
      </div>
    </div>
  );
};

export default Conversations;
