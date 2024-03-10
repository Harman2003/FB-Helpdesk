import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../components/input/Input"
import { FormEvent, useEffect, useRef, useState } from "react";
import { AuthInterface } from "@/setup/context/AuthProvider";
import useAuth from "@/setup/hooks/auth/useAuth";
import useApiSender from "@/setup/hooks/api/useApiSender";
import { validateAuth } from "@/utils/validate";
import spinner from "@/assets/spinner.svg";
import { toast } from "sonner";
import { login } from "@/webApi/login";
const Signin = () => {

  const emailRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { send, data, isLoading, status } = useApiSender(login, false);
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const signin = async (event: FormEvent) => {
    event.preventDefault();
    const { email, pass } = {
      email: emailRef.current,
      pass: passRef.current,
    };
    if (email && pass) {
      const info = validateAuth("user", email.value, pass.value);
      if (info) toast.info(info);
      else {
        try {
          await send({
            email: email.value,
            password: pass.value,
            remember: isChecked,
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  useEffect(() => {
    if (status === "success" && data) {
      const { name, email, picture, accessToken } = data;
      const authData: AuthInterface = {
        name: name,
        email: email,
        picture: picture,
        accessToken: accessToken,
      };
      setAuth({ ...authData });
      const from = location.state?.from?.pathname || "/connect";
      navigate(from, { replace: true });
    }
  }, [data]);

  return (
    <div className="bg-[#044080] w-full h-full flex px-4 font-Montserrat">
      <form
        className="m-auto bg-white w-full max-w-[400px] p-8 rounded-2xl flex flex-col gap-5"
        onSubmit={signin}
        noValidate
      >
        <span className="text-lg self-center font-semibold">
          Login to your Account
        </span>
        <div className="flex flex-col gap-2">
          <Input field="Email" type="email" ref={emailRef} />
          <Input field="Password" type="password" ref={passRef} className="text-2xl"/>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4"
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
            />
            <span>Remember Me</span>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#044080] rounded-md h-12 p-3 mt-2 text-white flex justify-center"
        >
          {isLoading ? (
            <img src={spinner} alt="loading" className="w-6" />
          ) : (
            "Login"
          )}
        </button>
        <div className="self-center">
          New to MyApp?{" "}
          <Link to={"/register"} className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signin
