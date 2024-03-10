import useAxiosPrivate from "@/setup/hooks/auth/useAxiosPrivate";
import { useQueryParams } from "@/setup/hooks/utils/useQueryParams";
import { socket } from "@/setup/socket/socket";
import StickerIcon from "@/assets/sticker_icon.svg?react";
import ImageIcon from "@/assets/image_icon.svg?react";
import { formatTimeDuration } from "@/utils/formatTimeDuration";
import { Checkbox } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { MdOutlineSort } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { Link } from "react-router-dom";
import { AxiosResponse } from "axios";
import { tw } from "@/utils/tw";
import Loader from "@/components/loader/Loader";

interface ConversationProps {
  _id: string;
  customer_id: string;
  customer_name: string;
  last_message: string;
  updatedAt: string;
  seen: number;
}
interface ConversationRecordProps {
  data: Record<string, ConversationProps>;
  ids: [string];
}
const InboxMenu = () => {
  const axiosPrivate = useAxiosPrivate();
  const { chat_id } = useQueryParams();
  const [conversationRecord, setConversationRecord] =
    useState<ConversationRecordProps>({ data: {}, ids: [""] });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toggleRefetch, setToggleRefetch] = useState<boolean>(false);
  const refetch = () => setToggleRefetch((prev) => !prev);

  //http request
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response: AxiosResponse = await axiosPrivate.get(
          "/chat/conversations"
        );

        const chatData: Record<string, ConversationProps> = {};
        response.data?.forEach((chat: ConversationProps) => {
          chatData[chat._id] = chat;
        });

        const chatIds = response.data.map(
          (chat: ConversationProps) => chat._id
        );

        setConversationRecord({ data: chatData, ids: chatIds });
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [toggleRefetch]);

  console.log(conversationRecord);
  //websocket listeners
  useEffect(() => {
    function newConversation(data: ConversationProps) {
      console.log(data, "came new one");
      setConversationRecord((current) => {
        if (!current.ids.includes(data._id)) {
          current.ids.unshift(data._id);
        }
        current.data[data._id] = data;
        return { ...current };
      });
    }
    function updateConversation(
      data: ConversationProps,
      callback: (response: any) => void
    ) {
      console.log(data, "update one");
      setConversationRecord((current) => {
        current.data[data._id] = {
          ...current.data[data._id],
          ...data,
          seen: chat_id === data._id ? 0 : data.seen,
        };

        current.ids.sort((id, id_) => {
          const time = new Date(current.data[id].updatedAt);
          const time_ = new Date(current.data[id_].updatedAt);
          return time_.getTime() - time.getTime();
        });

        return { ...current };
      });

      //acknowledgement
      if (data._id === chat_id) {
        console.log("callback sent");
        callback({ chat_id });
      } else callback({ chat_id: null });
    }
    socket.on("new_conversation", newConversation);
    socket.on("update_conversation", updateConversation);

    return () => {
      socket.off("new_conversation", newConversation);
      socket.off("update_conversation", updateConversation);
    };
  }, [chat_id]);

  return (
    <div className="w-[300px] h-full border-r border-b overflow-y-auto flex flex-col">
      <div className="flex items-center gap-2 p-4 border-b">
        <MdOutlineSort color="gray" />
        <span className="text-xl font-semibold">Conversations</span>
        <RxReload className="ml-auto" onClick={refetch} />
      </div>
      <div className="flex-grow overflow-y-auto">
        {isLoading ? (
          <Loader />
        ) : conversationRecord.ids.length > 0 ? (
          conversationRecord.ids.map(
            (chat_id: string) =>
              chat_id && (
                <Item
                  key={chat_id}
                  conversation={conversationRecord.data[chat_id]}
                />
              )
          )
        ) : (
          <div className="h-full w-full flex flex-col justify-center items-center text-2xl font-bold text-gray-200">
            <span>No</span>
            <span>Conversation</span>
            <span>Available</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Item = ({ conversation }: { conversation: ConversationProps }) => {
  const { chat_id } = useQueryParams();
  const { _id, customer_name, updatedAt, last_message, seen } = conversation;
  const [hidden, setHidden] = useState<boolean>(false);
  useEffect(() => {
    setHidden(false);
  }, [updatedAt]);

  return (
    <Link to={`/app?chat_id=${_id}`}>
      <div
        className={tw(
          "border-b p-3 hover:bg-gray-50 transition-colors duration-300 cursor-pointer relative",
          _id === chat_id && "bg-gray-100"
        )}
        onClick={() => setHidden(true)}
      >
        <div className="flex">
          <Checkbox size="2" variant="surface" className="self-center" />
          <div className="w-[60%] ml-2">
            <div className="font-medium overflow-hidden overflow-ellipsis whitespace-nowrap">
              {customer_name}
            </div>
            <div className="text-xs font-medium">Facebook Messenger</div>
          </div>
          <span
            className={tw(
              "ml-auto text-sm transition-all duration-100",
              seen > 0 && !hidden && "text-green-500"
            )}
          >
            {formatTimeDuration(updatedAt)}
          </span>
        </div>
        <div className="mt-2 text-xs">
          <div className="font-medium">Customer Chat</div>
          <div className="text-gray-900 w-full overflow-hidden whitespace-nowrap overflow-ellipsis flex gap-1 items-center">
            {last_message === "image" && (
              <span>
                <ImageIcon color="gray" />
              </span>
            )}
            {last_message === "sticker" && (
              <span>
                <StickerIcon color="gray" />
              </span>
            )}
            {last_message}
          </div>
        </div>

        {/* notification */}
        <div
          className={tw(
            seen > 0 && !hidden
              ? "scale-100 opacity-100"
              : "scale-50 opacity-0",
            " transition-all duration-100 absolute top-1/2 -translate-y-1/2 right-3"
          )}
        >
          <span className="bg-green-500 text-white text-xs font-medium rounded-full size-6 flex justify-center items-center">
            {seen}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default InboxMenu;
