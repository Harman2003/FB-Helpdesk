import React, { useState } from "react";

const Connect = () => {
  const [isConnected, setConnected] = useState<boolean>(false);
  return (
    <div className="bg-[#044080] w-full h-full flex px-4 font-Montserrat">
      <div className="m-auto bg-white w-full max-w-[400px] p-8 rounded-2xl flex flex-col gap-5">
        <span className="text-lg self-center font-semibold">
          Facebook Page Integration
        </span>
        <span className="text-lg self-center">
          Integrated Page :{" "}
          <span className="text-lg self-center font-semibold ">
            Sample Page
          </span>
        </span>
        <button className="bg-[#b21217] rounded-md p-3 mb-2 text-white">
          Delete Integration
        </button>
        <button className="bg-[#044080] rounded-md p-3 mb-2 text-white">
          Connect Page
        </button>
      </div>
    </div>
  );
};

export default Connect;
