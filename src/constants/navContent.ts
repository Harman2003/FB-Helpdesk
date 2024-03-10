import { FaInbox } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import { IoIosGitNetwork } from "react-icons/io";
import { IconType } from "react-icons";

export interface navContentProps {
  id: string;
  title: string;
  link: string;
  Icon: IconType;
}
export const navContent: navContentProps[] = [
  { id: "app-icon", Icon: IoIosGitNetwork, title: "App", link: "/" },
  { id: "inbox-icon", Icon: FaInbox, title: "Inbox", link: "/app" },
  { id: "users-icon", Icon: FaUsers, title: "Users", link: "/app/users" },
  { id: "growth-icon", Icon: BsBarChartFill, title: "Report", link: "/app/report" },
]
