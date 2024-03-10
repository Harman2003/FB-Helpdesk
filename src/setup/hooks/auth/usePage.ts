import { useContext } from "react";
import { PageContext, PageContextProps } from "../../context/PageProvider";

const usePage = () => {
  return useContext<PageContextProps>(PageContext);
};

export default usePage;
