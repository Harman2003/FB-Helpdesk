import React, {
  createContext,
  useState,
  ReactNode,
  useLayoutEffect,
  useEffect,
} from "react";
import useAuth from "../hooks/auth/useAuth";
import useAxiosPrivate from "../hooks/auth/useAxiosPrivate";

export interface PageInterface {
  page_name: string;
  page_id: string;
  picture: string;
  status: "connected" | "disconnected" | "idle";
}
export interface PageContextProps {
  page: PageInterface;
  setPage: (page: PageInterface) => void;
  pageFetching: boolean;
  refetch:()=>void
}

export const PageContext = createContext<PageContextProps>({
  page: {
    page_name: "",
    page_id: "",
    picture: "",
    status: "idle",
  },
  setPage: () => {},
  pageFetching: false,
  refetch:()=>{}
});

export const PageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [page, setPage] = useState<PageInterface>({
    page_id: "",
    page_name: "",
    picture: "",
    status: "idle",
  });
  const [pageFetching, setPageFetching] = useState<boolean>(true);
  const [toggle, setToggle] = useState<boolean>(true);
  const refetch = () => setToggle(prev => !prev);
  const { auth } = useAuth();
  const axios = useAxiosPrivate();

  useEffect(() => {
      (async() => {
          try {
              setPageFetching(true);
              const {data} = await axios.get("/page/status", { params: { email: auth.email } });
              if (data) {
                  const { page_id, page_name, picture, status } = data;
                  if (status === "connected") {
                      setPage({page_id, page_name, picture, status})
                  } else {
                    setPage(prev => ({ ...prev, status: "disconnected" }));
                  }
              }
          } catch (err) {
              console.log(err)
          } finally {
              setPageFetching(false);
        }
      })();
  }, [auth, toggle]);
 
  return (
    <PageContext.Provider value={{ page, setPage, pageFetching, refetch }}>
      {children}
    </PageContext.Provider>
  );
};
