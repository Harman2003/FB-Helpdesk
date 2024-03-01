import { Link } from "react-router-dom";
import { navContent } from "../../constants/navContent";
import { tw } from "../../utils/tw";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="h-full w-full bg-[#044080f5] border-r relative">
      <ul>
        {navContent.map(({ id, link, title, Icon }, index) => (
          <Link to={link}>
            <li
              title={title}
              key={id}
              className={tw(
                "p-5 flex justify-center group",
                index != 0 && " transition-colors duration-300",
                pathname === link ? "bg-white" : "hover:bg-[#043971]"
              )}
            >
              <Icon
                size={30}
                className={tw(
                  "rounded-sm p-1 transition-colors duration-300",
                  index == 0
                    ? "bg-white text-[#044080f5]"
                    : pathname === link
                    ? "text-[#044080f5]"
                    : "text-white"
                )}
              />
            </li>
          </Link>
        ))}
      </ul>
      <div className="flex justify-center absolute bottom-0 p-4">
        <img
          src="https://certify-events.s3.ap-south-1.amazonaws.com/d6dbf75709ba87e70354c1e7"
          alt="profile-icon"
          className="rounded-full aspect-square w-12 object-cover"
        />
      </div>
    </nav>
  );
};

export default Sidebar;
