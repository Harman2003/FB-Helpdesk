import { IoSendSharp } from "react-icons/io5";

const TextBox = () => {
  return (
    <div className="w-full flex items-center gap-2 p-2 rounded-md border border-gray-300 outline-blue-600/60 bg-white">
      <input
        type="text"
        className="w-full outline-none"
        placeholder="Message Here"
      ></input>
      <IoSendSharp size={20} color="#044080f5" />
    </div>
  );
};

export default TextBox;
