import { tw } from "../../../utils/tw";

interface MessageProps {
  text: string;
  time: number;
  icon: string;
  mode: "self" | "other";
}
const Message: React.FC<MessageProps> = ({ text, time, icon, mode }) => {
  return (
    <div className={tw("flex flex-col", mode == "self" && "items-end")}>
      <div
        className={tw(
          "w-fit items-end gap-2",
          mode == "self" ? "flex" : "flex flex-row-reverse"
        )}
      >
        <div className="border bg-white rounded-lg relative">
          <div className="p-2">{text}</div>
          <div
            className={tw(
              "absolute bottom-0 translate-y-full",
              mode == "self" && "right-0"
            )}
          >
            <span className="text-xs text-gray-800 font-medium">Amit RG</span>
            <span className="text-xs text-gray-800">- Mar 05, 2.22AM</span>
          </div>
        </div>
        <img
          src="https://avatars.githubusercontent.com/u/124599?v=4"
          alt="profile-icon"
          className="rounded-full aspect-square w-8 object-cover"
        />
      </div>
    </div>
  )
}

export default Message;
