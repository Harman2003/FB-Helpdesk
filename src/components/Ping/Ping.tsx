import { tw } from "@/utils/tw";
import React from "react";

interface PingProps {
  status: "connected" | "disconnected" | "error";
}
const Ping: React.FC<PingProps> = ({ status }) => {
  const light_ping = {
    connected: "bg-[rgb(22,163,74,0.2)]",
    disconnected: "bg-[rgb(202,138,4,0.2)]",
    error: "bg-[rgb(220,38,38,0.2)]",
  };
  const dark_ping = {
    connected: "bg-[rgb(22,163,74,0.5)]",
    disconnected: "bg-[rgb(202,138,4,0.5)]",
    error: "bg-[rgb(220,38,38,0.5)]",
  };
  const text_color = {
    connected: "text-[rgb(22,163,74,0.6)]",
    disconnected: "text-[rgb(202,138,4,0.6)]",
    error: "text-[rgb(220,38,38,0.6)]",
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={tw(
          light_ping[status],
          "inline-block rounded-full size-4 relative animate-pulse"
        )}
      >
        <span
          className={tw(
            dark_ping[status],
            "size-2 inline-block rounded-full absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2"
          )}
        />
      </span>
      <span className={tw(text_color[status], "text-xs uppercase font-medium")}>
        {status}
      </span>
    </div>
  );
};

export default Ping;
