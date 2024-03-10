import { SlCallOut } from "react-icons/sl";
import { FaUserCircle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { tw } from "../../../utils/tw";
import { ProfileProps } from "../ChatSection";

const Profile: React.FC<ProfileProps> = ({
  firstname,
  lastname,
  customer_id,
  img,
  gender,
  timezone,
}) => {
  return (
    <aside
      className={tw("bg-slate-100 w-[340px] h-full border-l overflow-hidden")}
    >
      <div className="w-full h-full">
        <div className="bg-white flex flex-col items-center py-10 border-b">
          <a
            href="https://google.com"
            target="_blank"
            className="relative mb-2 group"
          >
            <img
              src={img}
              alt="profile-icon"
              className="rounded-full aspect-square w-16 object-cover"
            />
            <span className="hidden group-hover:flex w-full h-full rounded-full bg-black/60 text-white underline items-center justify-center absolute top-0">
              view
            </span>
          </a>
          <span className="text-xl font-medium">
            {firstname.concat(" ", lastname)}
          </span>
          <span className="text-gray-400 text-xs">{customer_id}</span>

          <div className="flex gap-3 mt-4">
            <div className="flex gap-2 items-center px-3 py-0.5 rounded-md border border-gray-400 font-medium text-gray-600 cursor-pointer">
              <SlCallOut />
              <span>Call</span>
            </div>
            <div className="flex gap-2 items-center px-3 py-0.5 rounded-lg border border-gray-400 font-medium text-gray-600 cursor-pointer">
              <FaUserCircle />
              <span>Profile</span>
            </div>
          </div>
        </div>

        <div className="w-full p-4">
          <div className="w-full bg-white rounded-md border p-3">
            <span className="font-medium">Customer details</span>
            <div className="grid grid-cols-2 text-gray-400 my-2">
              <span>First Name</span>
              <span className="text-black">{firstname}</span>
              <span>LastName</span>
              <span className="text-black">{lastname}</span>
              <span>Gender</span>
              <span className="text-black">{gender}</span>
              <span>Timezone</span>
              <span className="text-black">{timezone}</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Profile;
