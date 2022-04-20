import { Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SiGitea } from "react-icons/si";
import { connect, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { registerAction } from "../redux/actions";
import * as Yup from "yup";

export const Signup = ({ registerAction }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // const [input, setInput] = useState({
  //   username: "",
  //   password: "",
  //   confirmPassword: "",
  //   email: "",
  // });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password must match"
      ),
    }),
    onSubmit: (values) => {
      registerAction(values);
    },
  });

  const { isLogin } = useSelector((state) => state.user);
  // const handleInput = (e, prop) => {
  //   setInput({ ...input, [prop]: e.target.value });
  // };

  // const registerHandle = (e) => {
  //   e.preventDefault();
  //   if (input.password !== input.confirmPassword) {
  //     toast.error("Password is invalid", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       closeOnClick: true,
  //       draggable: true,
  //     });
  //   }
  //   registerAction(input);
  //   console.log("asdjnakjdsn");
  //   console.log(isLogin);
  // };

  const router = useRouter();
  useEffect(() => {
    if (isLogin) {
      router.replace("/");
    }
  }, []);

  return (
    <div className="flex flex-grow min-h-screen bg-cyan-900 items-center">
      <div className="mx-auto bg-slate-50 rounded-3xl w-[70vh] h-[80vh] shadow-lg">
        <div className="flex items-center justify-center my-5">
          <SiGitea className="mr-2 text-cyan-600 text-2xl" />
          <div className="font-bold text-2xl">Teatalk</div>
        </div>
        <div className="mt-8 mb-4 font-semibold text-2xl text-center">
          Join with us today!
        </div>
        <form
          className="px-10 max-h-[51vh] overflow-y-scroll"
          onSubmit={formik.handleSubmit}
        >
          <Input
            focusBorderColor="cyan.400"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            // value={input.username}
            placeholder="Username"
            variant="filled"
            className="mt-5"
            size={"lg"}
          />
          {formik.touched.username && formik.errors.username ? (
            <div>{formik.errors.username}</div>
          ) : null}
          <Input
            focusBorderColor="cyan.400"
            placeholder="E-mail"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            // value={input.email}
            variant="filled"
            className="mt-5"
            size={"lg"}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
          <InputGroup size="lg" className="mt-5">
            <Input
              pr="5rem"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              // value={input.password}
              type={show ? "text" : "password"}
              placeholder="Password"
              variant="filled"
              focusBorderColor="cyan.400"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
          <Input
            focusBorderColor="cyan.400"
            type="password"
            placeholder="Confirm password"
            variant="filled"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            // value={input.confirmPassword}
            className="mt-5"
            size={"lg"}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div>{formik.errors.confirmPassword}</div>
          ) : null}
          <button
            type="submit"
            className="bg-slate-300 p-3 mt-5 mb-5 text-center w-full rounded-lg font-semibold cursor-pointer hover:bg-slate-400"
          >
            Sign Up
          </button>
        </form>
        <Link href={"/login"}>
          <div
            className="absolute group w-[70vh] bottom-16 rounded-3xl bg-cyan-700 text-white text-center transition-all
        duration-700 hover:h-28 ease-in-out cursor-pointer"
          >
            <div className="font-semibold pt-5">Already have an account?</div>
            <div className="font-bold text-lg pb-5">Login here</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default connect(null, { registerAction })(Signup);
