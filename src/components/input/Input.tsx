import React, { ComponentProps } from "react";
type InputProps = {
  field: string;
} & ComponentProps<"input">;
const Input: React.FC<InputProps> = ({ field, ...props }) => {
  return (
    <div>
      <span className="font-semibold">{field}</span>
      <input
        className="w-full outline-none h-10 rounded-md border-2 mt-1 px-2"
        {...props}
      />
    </div>
  );
};

export default Input;
