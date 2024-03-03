import { ComponentProps, forwardRef } from "react";
type InputProps = {
  field: string;
} & ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(({ field, ...props }, ref) => {
  return (
    <div>
      <span className="font-semibold">{field}</span>
      <input
        ref={ref}
        className="w-full outline-none h-10 rounded-md border-2 mt-1 px-2"
        {...props}
      />
    </div>
  );
})

export default Input;
