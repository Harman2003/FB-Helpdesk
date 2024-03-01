import { Link } from "react-router-dom";
import Input from "../components/input/Input";

const Signup = () => {
  return (
    <div className="bg-[#044080] w-full h-full flex px-4 font-Montserrat">
      <form className="m-auto bg-white w-full max-w-[400px] p-8 rounded-2xl flex flex-col gap-5">
        <span className="text-lg self-center font-semibold">
          Create Account
        </span>
        <div className="flex flex-col gap-2">
          <Input field="Name" type="text" />
          <Input field="Email" type="email" />
          <Input field="Password" type="password" />
          <div className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox h-4 w-4" />
            <span>Remember Me</span>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#044080] rounded-md p-3 my-2 text-white"
        >
          Sign Up
        </button>
        <div className="self-center">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
