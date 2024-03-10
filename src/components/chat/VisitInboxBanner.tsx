import { FaInbox } from "react-icons/fa6";
const NotFound = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center gap-10 font-Montserrat italic text-gray-100">
      <FaInbox size={100}/>
      <span className="text-4xl font-thin">
        VISIT INBOX FOR CHATS
      </span>
    </div>
  );
};

export default NotFound;
