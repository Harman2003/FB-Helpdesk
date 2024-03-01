import { MdOutlineSort } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import InboxMenu from "./InboxMenu";

const Menu = () => {
  return (
    <div className="w-full h-screen bg-white border-r border-b">
      <div className="flex items-center gap-2 p-4 border-b">
        <MdOutlineSort color="gray" />
        <span className="text-xl font-semibold">Conversations</span>
        <RxReload className="ml-auto" />
      </div>
      <InboxMenu/>
    </div>
  );
};

export default Menu;
