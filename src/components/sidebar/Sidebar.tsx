import { Link, useNavigate } from "react-router-dom";
import { navContent } from "../../constants/navContent";
import { tw } from "../../utils/tw";
import { useLocation } from "react-router-dom";
import usePage from "@/setup/hooks/auth/usePage";
import { IoIosLogOut } from "react-icons/io";
import { useEffect, useState } from "react";
import useApiSender from "@/setup/hooks/api/useApiSender";
import { logout } from "@/webApi/logout";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { page } = usePage();
  const [isPopup, setIsPopup] = useState<boolean>(false);
  const comparePaths = (path: string, link: string) => {
    return path === link;
  };

  const { send } = useApiSender(logout, true);
  async function handleLogout() {
    try {
      await send({});
      navigate("/");
      localStorage.clear();
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <nav className="h-full w-full bg-[#044080f5] border-r relative">
      <ul>
        {navContent.map(({ id, link, title, Icon }, index) => (
          <Link to={link} key={id}>
            <li
              title={title}
              className={tw(
                "p-5 flex justify-center group",
                index != 0 && " transition-colors duration-300",
                comparePaths(pathname, link) ? "bg-white" : "hover:bg-[#043971]"
              )}
            >
              <Icon
                size={30}
                className={tw(
                  "rounded-sm p-1 transition-colors duration-300",
                  index == 0
                    ? "bg-white text-[#044080f5]"
                    : comparePaths(pathname, link)
                    ? "text-[#044080f5]"
                    : "text-white"
                )}
              />
            </li>
          </Link>
        ))}
      </ul>
      <div
        className="flex justify-center absolute bottom-0 p-4"
        onClick={() => setIsPopup(true)}
      >
        <img
          src={page.picture}
          alt="profile-icon"
          className="rounded-full aspect-square w-12 object-cover"
        />
        {/* popup */}
        <div
          className={tw(
            isPopup ? "scale-100 opacity-100" : "scale-75 opacity-0",
            "transition-all duration-300 origin-bottom-left absolute top-0 right-0 z-[1000] translate-x-[95%] -translate-y-[70%] w-[190px] rounded-lg bg-white border flex flex-col whitespace-nowrap font-Montserrat text-lg cursor-pointer"
          )}
        >
          <span className="font-medium px-3 py-1 overflow-hidden overflow-ellipsis">
            {page.page_name}
          </span>
          <hr className="w-full" />
          <Link to={"/"} className="px-3 py-1">
            <span className="text-gray-400">Visit Home Page</span>
          </Link>
          <hr className="w-full" />
          <Link to={"/connect"} className="px-3 py-1">
            <span className="text-gray-400">Visit Connect Page</span>
          </Link>
          <hr className="w-full" />
          <span
            className="text-red-500/80 flex items-center gap-1 px-3 py-1"
            onClick={handleLogout}
          >
            <span>Logout</span>
            <IoIosLogOut size={22} />
          </span>
        </div>
      </div>
      {isPopup && (
        <div
          className="w-full h-full fixed top-0 left-0 z-[999]"
          onClick={() => {
            console.log("aya");
            setIsPopup(false);
          }}
        />
      )}
    </nav>
  );
};

export default Sidebar;
