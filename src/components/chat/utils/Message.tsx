import { formatMessageTime } from "@/utils/formatMessageTime";
import { tw } from "../../../utils/tw";

interface MessageProps {
  name: string;
  text: string;
  payload: { type: string; url: string };
  time: string;
  icon: string;
  mode: "self" | "other";
  type: "first" | "last" | "both" | "none";
}
const Message: React.FC<MessageProps> = ({
  name,
  text,
  payload,
  time,
  icon,
  mode,
  type,
}) => {
  const isIconVisible =
    type == "both" ||
    (mode == "self" && type == "last") ||
    (mode == "other" && type == "first");
  const isTimeVisible = type == "both" || type == "last";

  return (
    <div
      className={tw(
        "flex flex-col",
        type == "last" || type == "both" ? "mb-8" : "mb-1",
        mode == "self" && "items-end"
      )}
    >
      <div
        className={tw(
          "w-fit items-start gap-3 max-w-[80%]",
          mode == "self" ? "flex" : "flex flex-row-reverse"
        )}
      >
        <div
          title={formatMessageTime(time)}
          className={tw("flex flex-col", mode === "self" && "items-end")}
        >
          {payload.type === "text" && (
            <div className="border bg-white rounded-lg p-2 w-fit">{text}</div>
          )}
          {payload.type === "sticker" && (
            <img
              src={payload.url}
              alt="sticker"
              className="max-w-[45px] w-auto h-auto my-2"
            />
          )}
          {payload.type === "image" && (
            <img
              src={payload.url}
              alt="image"
              className="block max-w-[500px] max-h-[300px] w-auto h-auto rounded-2xl border mt-3 mb-1"
            />
          )}
          {isTimeVisible && (
            <div className="px-2">
              <span className="text-xs text-gray-800 font-medium">{name}</span>
              <span className="text-xs text-gray-800">
                - {formatMessageTime(time)}
              </span>
            </div>
          )}
        </div>
        <img
          src={icon}
          alt="profile-icon"
          className={tw(
            !isIconVisible && "invisible",
            "rounded-full aspect-square w-8 object-cover my-[6px]"
          )}
        />
      </div>
    </div>
  );
};

export default Message;
