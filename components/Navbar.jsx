import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaSearch, FaUserPlus, FaBell, FaSignOutAlt } from "react-icons/fa";
import { SiGitea } from "react-icons/si";
import NavbarIcon from "./NavbarIcon";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    Cookies.remove("token");
    dispatch({ type: "LOGOUT" });
    await router.push("/login");
  };

  const { isVerified } = useSelector((state) => state.user);

  return (
    <div className="sticky top-0 z-50 flex justify-between text-2xl text-slate-700 bg-slate-100 h-16 px-10 border-b-2 border-slate-300">
      <div className="flex font-bold items-center cursor-default">
        <SiGitea className="text-cyan-600 text-3xl" />
        <div className="mx-3">Teatalk</div>
      </div>
      <div className="flex items-center ml-40">
        <InputGroup>
          <InputRightElement
            pointerEvents="none"
            children={<FaSearch className="text-slate-400" />}
          />
          <Input
            className="font-semibold"
            borderRadius={10}
            bgColor={"gray.200"}
            // htmlSize={40}
            size="md"
            width="auto"
          />
        </InputGroup>
      </div>
      <div className="flex text-2xl items-center">
        {isVerified == 0 ? (
          <div className="bg-orange-200 rounded-lg text-lg font-semibold text-orange-600 py-1 px-2 mr-2">
            Not verified
          </div>
        ) : null}
        <NavbarIcon Icon={FaUserPlus} />
        <NavbarIcon Icon={FaBell} />
        <div onClick={logoutHandler}>
          <NavbarIcon Icon={FaSignOutAlt} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
