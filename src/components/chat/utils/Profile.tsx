import { SlCallOut } from "react-icons/sl";
import { FaUserCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { tw } from "../../../utils/tw";

const Profile = () => {
  return (
      <div className="w-full h-full">
      <div className="bg-white flex flex-col items-center py-10 border-b">
        <a
          href="https://google.com"
          target="_blank"
          className="relative mb-2 group"
        >
          <img
            src="https://avatars.githubusercontent.com/u/124599?v=4"
            alt="profile-icon"
            className="rounded-full aspect-square w-16 object-cover"
          />
          <span className="hidden group-hover:flex w-full h-full rounded-full bg-black/60 text-white underline items-center justify-center absolute top-0">
            view
          </span>
        </a>
        <span className="text-xl font-medium">Amit RG</span>
        <span
          className={tw(
            "flex items-center",
            false && "text-[#32b52d]",
            "text-gray-400"
          )}
        >
          <GoDotFill size={16} />
          <span className="text-sm">Offline</span>
        </span>

        <div className="flex gap-3 mt-4">
          <div className="flex gap-2 items-center px-3 py-0.5 rounded-md border-2 border-gray-400 font-medium text-gray-600">
            <SlCallOut />
            <span>Call</span>
          </div>
          <div className="flex gap-2 items-center px-3 py-0.5 rounded-lg border-2 border-gray-400 font-medium text-gray-600">
            <FaUserCircle />
            <span>Profile</span>
          </div>
        </div>
      </div>

      <div className="w-full p-4">
              <div className="w-full bg-white rounded-md border p-3">
                  <span className="font-medium">Customer details</span> 
                  <div className="grid grid-cols-2">
                      <span>Email</span>
                      <span>amit@richpanel.com</span>
                      <span>First Name</span>
                      <span>Amit</span>
                      <span>LastName</span>
                      <span>RG</span>
                  </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
