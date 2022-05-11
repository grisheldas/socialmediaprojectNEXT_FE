import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SiGitea } from "react-icons/si";
import { connect, useSelector } from "react-redux";
import { loginAction } from "../redux/actions";

export const Login = ({ loginAction }) => {
  // password field chakra state
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [disable, setDisable] = useState(false);

  // login state setup and handle
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  // const { loading } = useLoading()
  const { isLogin } = useSelector((state) => state.user);
  const handleInput = (e, prop) => {
    setInput({ ...input, [prop]: e.target.value });
    console.log(input);
  };
  const loginHandle = (e) => {
    e.preventDefault();
    try {
      setDisable(true);
      loginAction(input);
      console.log("aksdaksdkasd");
    } finally {
      setDisable(false);
    }
  };

  // redirect when isLogin is true
  const router = useRouter();
  if (isLogin) {
    router.push("/"); // JANGAN DI RETURN
  }

  return (
    <div className="flex min-h-screen bg-cyan-900 items-center">
      <div className="mx-auto bg-slate-50 rounded-3xl w-[70vh] h-[80vh] shadow-lg">
        <div className="flex items-center justify-center my-5">
          <SiGitea className="mr-2 text-cyan-600 text-2xl" />
          <div className="font-bold text-2xl">Teatalk</div>
        </div>
        <div className="mt-8 mb-4 font-semibold text-2xl text-center">
          Good to see you again!
        </div>
        <form className="px-10" onSubmit={loginHandle}>
          <Input
            focusBorderColor="cyan.400"
            placeholder="E-mail address or username"
            variant="filled"
            className="mt-5"
            value={input.username}
            onChange={(e) => handleInput(e, "username")}
            size={"lg"}
          />
          <InputGroup size="lg" className="mt-5">
            <Input
              pr="5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
              variant="filled"
              onChange={(e) => handleInput(e, "password")}
              value={input.password}
              focusBorderColor="cyan.400"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {disable ? (
            <button
              type="submit"
              disabled
              className="w-full bg-slate-500 p-3 mt-5 text-center rounded-lg font-semibold cursor-pointer "
            >
              Login
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-slate-300 p-3 mt-5 text-center rounded-lg font-semibold cursor-pointer hover:bg-slate-400"
            >
              Login
            </button>
          )}
        </form>
        <Link href={"/signup"}>
          <div
            className="absolute group w-[70vh] bottom-16 rounded-3xl bg-cyan-700 text-white text-center transition-all
        duration-700 hover:h-28 ease-in-out cursor-pointer"
          >
            <div className="font-semibold pt-5">Dont have an account?</div>
            <div className="font-bold text-lg pb-5">Sign up here</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default connect(null, { loginAction })(Login);
