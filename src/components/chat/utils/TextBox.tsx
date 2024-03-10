import { IoSendSharp } from "react-icons/io5";
import { ComponentProps } from "react";

type TextBoxProps = {
  submit: React.FormEventHandler<HTMLFormElement>;
} & ComponentProps<"input">;

const TextBox: React.FC<TextBoxProps> = ({submit, ...props }) => {
  return (
    <div className="w-full p-2 rounded-md border border-gray-300 outline-blue-600/60 bg-white">
      <form className="flex items-center gap-2" onSubmit={submit}>
        <input
          type="text"
          className="w-full outline-none"
          placeholder="Message Here"
          {...props}
        />
        <button type="submit">
          <IoSendSharp size={20} color="#044080f5" />
        </button>
      </form>
    </div>
  );
};

export default TextBox;
