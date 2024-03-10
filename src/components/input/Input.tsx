import { tw } from "@/utils/tw";
import { ComponentProps, forwardRef } from "react";
type InputProps = {
  field: string;
  className?: string;
} & ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(({ field, className, ...props }, ref) => {
  return (
    <div>
      <span className="font-semibold">{field}</span>
      <input
        ref={ref}
        className={tw("w-full outline-none h-10 rounded-md border-2 mt-1 px-2", className)}
        {...props}
      />
    </div>
  );
})

export default Input;
