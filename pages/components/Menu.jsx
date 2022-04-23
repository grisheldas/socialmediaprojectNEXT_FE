import {
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { CgFeed } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import {
  HiBookmark,
  HiOutlinePhotograph,
  HiOutlineEmojiHappy,
} from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import PostIcon from "./PostIcon";

import { AiOutlineGif } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import Link from "next/link";
import { API_URL } from "../../helpers";

const Menu = ({ username, fullname, image_url }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Profile = () => {
    return (
      <Link href={"/profile"}>
        <div className="bg-slate-200 mx-4 mt-4 mb-2 h-20 rounded-lg border-2 border-slate-300 cursor-pointer">
          <div className="flex py-3 px-4">
            <Avatar size="md" name={fullname} src={image_url} />
            <div className="ml-4">
              <div className="font-bold ">{fullname}</div>
              <div className="text-sm text-slate-500">@{username}</div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const MenuIcon = ({ Icon, title }) => {
    return (
      <div
        className="py-[0.1px] transition ease-in-out delay-150 hover:scale-100 hover:translate-x-1
       hover:bg-slate-100 duration-300 hover:rounded-lg hover:shadow-lg cursor-pointer group"
      >
        <div className="font-semibold my-3 px-4 border-l-4 flex items-center hover:border-l-4 hover:border-y-1 group-hover:border-cyan-700 ">
          <Icon className="text-2xl text-slate-500 group-hover:text-cyan-700" />
          <div className="ml-4 text-md font-bold text-slate-800 group-hover:text-cyan-700">
            {title}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-100 w-[47vh]">
      <div className="fixed left-0 top-16 bottom-0">
        <Profile />
        <div>
          <Link href={"/"}>
            <MenuIcon Icon={CgFeed} title="Feed" />
          </Link>
          <MenuIcon Icon={FaUserFriends} title="Friends" />
          <MenuIcon Icon={HiBookmark} title="Bookmark" />
          <MenuIcon Icon={IoMdPhotos} title="Photos" />
          <div
            className="bg-cyan-700 text-md mx-2 text-center rounded-lg mt-2 py-1 text-slate-100 tracking-wider font-semibold cursor-pointer
        hover:bg-cyan-800 active:bg-cyan-900"
            onClick={onOpen}
          >
            Spill
          </div>

          {/* spill tea modal */}

          <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <div className="flex text-center mt-7">
                  <Avatar
                    size="md"
                    name="Dan Abrahmov"
                    src="https://bit.ly/dan-abramov"
                  />
                  <div className="w-[80vh] ml-3 ">
                    <textarea
                      name=""
                      className="w-full bg-inherit outline-none resize-none px-2 pt-2 font-semibold"
                      placeholder="Spill the tea..."
                      rows="5"
                    ></textarea>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <div className="w-full border-t-2 pt-2 ">
                  <div className="flex justify-between">
                    <div className="flex">
                      <PostIcon Icon={HiOutlinePhotograph} />
                      <PostIcon Icon={HiOutlineEmojiHappy} />
                      <PostIcon Icon={AiOutlineGif} />
                      <PostIcon Icon={MdLocationOn} />
                    </div>
                    <div
                      className="text-4xl text-cyan-700 hover:text-slate-400 "
                      onClick={onClose}
                    >
                      <BsFillArrowUpCircleFill className="cursor-pointer active:border-2 rounded-full mr-2" />
                    </div>
                  </div>
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Menu;
