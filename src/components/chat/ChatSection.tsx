import { useState } from "react";
import TextBox from "./utils/TextBox";
import Message from "./utils/Message";
import Profile from "./utils/Profile";
import { tw } from "../../utils/tw";

interface ChatProps {
  id: string;
  source_id: string;
  source_name: string;
  time: number;
  message: string;
}
const ChatSection = () => {
  const [chats, setChats] = useState<ChatProps[]>();
  
  return (
    <div className="h-full w-full flex">
      <div className="bg-gray-50 flex-1 h-full flex flex-col">
        <div
          className="px-8 py-4 border-b bg-white"
        >
          <span className="text-xl font-semibold">Amit RG</span>
        </div>

        <div className="px-8 py-4 flex flex-col flex-grow justify-between">
          {/* messages */}
          <div className="flex flex-col gap-5">
            <Message mode="other" text="Hello there, How are you?" />
            <Message mode="self" text="Hello there, How are you?" />
            <Message mode="other" text="Hello there, How are you?" />
          </div>

          <div className="w-full max-w-[800px] self-center">
            <TextBox />
          </div>
        </div>
      </div>

      <aside
        className={tw(
          "bg-slate-100 w-[340px] h-full border-l overflow-hidden"
        )}
      >
        <Profile />
      </aside>
    </div>
  );
};

export default ChatSection;
