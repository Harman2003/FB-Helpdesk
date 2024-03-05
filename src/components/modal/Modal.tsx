import useApiReceiver from "@/setup/hooks/api/useApiReceiver";
import useApiSender from "@/setup/hooks/api/useApiSender";
import useAuth from "@/setup/hooks/auth/useAuth";
import { connectFBPage } from "@/webApi/connectFBPage";
import { Checkbox } from "@radix-ui/themes";
import connectSpinner from "@/assets/connectSpinner.svg";
import { useEffect, useState } from "react";
import spinner from "@/assets/spinner.svg";
import { tw } from "@/utils/tw";

const Modal: React.FC<{ isOpen: boolean; close: () => void }> = ({
  isOpen,
  close,
}) => {
  const { auth } = useAuth();
  const [pageList, setPageList] = useState<{ name: string; id: string }[]>([]);
  const [selectedPage, setSelectedPage] = useState<{
    name: string;
    id: string;
  }>();
  const { data, isLoading } = useApiReceiver(
    "/page/linked",
    { email: auth.email },
    true
  );
    const { send: connect, isLoading: connectingPage } = useApiSender(
      connectFBPage,
      true
  );

  const connectPage = async () => {
    try {
      await connect({ email: auth.email, mode: "connect", page_id: selectedPage?.id, page_name: selectedPage?.name });
      close();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (data?.pageList) {
      setPageList([...data.pageList]);
    }
  }, [data]);

  const Item = ({
    name,
    id,
    check,
  }: {
    name: string;
    id: string;
    check: boolean;
  }) => {
    return (
      <>
        <hr />
        <div className="px-6 hover:bg-gray-50 cursor-pointer" onClick={() => {
          if (selectedPage?.id==id) setSelectedPage(undefined);
          else setSelectedPage({ name, id });
        }}>
          <div className="flex items-center py-3 gap-5">
            <Checkbox
              size="3"
              variant="soft"
              color="indigo"
              checked={check}
            />
            <div>
              <div className="font-medium">{name}</div>
              <span className="text-sm text-gray-600 tracking-wider">{id}</span>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      className={tw(
        !isOpen && "-z-[999] opacity-0",
        "fixed w-full h-full bg-black/50"
      )}
    >
      <div
        className={tw(
          isOpen ? "scale-100" : "scale-50",
          "transition-all duration-500 ease-out",
          "absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-[400px] rounded-3xl"
        )}
      >
        <div className="text-xl font-semibold overflow-y-auto m-6">
          Choose Your FB Page
        </div>
        <div className="mb-3 h-[400px]  overflow-y-auto">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <img src={connectSpinner} alt="loading..." className="w-6" />
            </div>
          ) : pageList.length > 0 ? (
            <>
              {data.pageList.map(
                ({ name, id }: { name: string; id: string }) => (
                  <Item
                    name={name}
                    id={id}
                    key={id}
                    check={id === selectedPage?.id}
                  />
                )
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-medium text-gray-400">
              Pages Not Found
            </div>
          )}
        </div>
        <div className="flex justify-between gap-2 px-6 pb-6">
          <button
            className="bg-[#c91d2be5] text-white rounded-md p-2"
            onClick={close}
          >
            Cancel
          </button>
          <button
            className={tw(
              "bg-[#435cc1e5] text-white rounded-md p-2 w-20 flex justify-center",
              !selectedPage && "cursor-not-allowed"
            )}
            disabled={!selectedPage || connectingPage}
            onClick={connectPage}
          >
            {connectingPage ? (
              <img src={spinner} alt="loading" className="w-6" />
            ) : (
              "Select"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
