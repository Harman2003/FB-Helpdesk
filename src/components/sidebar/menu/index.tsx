
import InboxMenu from "./InboxMenu";
import { Navigate, Route, Routes } from "react-router-dom";
import ReportMenu from "./ReportMenu";
import UserMenu from "./UserMenu";
import NotFound from "@/pages/NotFound";

const Menu = () => {
  return (
    <div className="w-full h-screen bg-white">
      <Routes>
        <Route path="/" element={<InboxMenu/>} />
        <Route path="/users" element={<UserMenu/>} />
        <Route path="/report" element={<ReportMenu/>} />
        <Route path="*" element={<Navigate to={"/not-found"}/>} />
      </Routes>
    </div>
  );
};

export default Menu;
