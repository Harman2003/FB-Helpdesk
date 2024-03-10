import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[#044080] w-full h-full flex px-4 font-Montserrat">
      <div className="m-auto bg-white w-full max-w-[400px] p-8 rounded-2xl flex flex-col gap-5">
        <h1 className="text-center font-semibold text-3xl whitespace-nowrap">Facebook Helpdesk</h1>
        <Link to={"/register"}
          className="bg-[#044080] rounded-md h-12 p-3 mt-2 text-white flex justify-center"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
