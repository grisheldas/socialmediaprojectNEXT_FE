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
import React, { useState } from "react";
import { useSelector } from "react-redux";

const Menu = ({ username, fullname, image_url, newPost }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [input, setInput] = useState({
    post: "",
    image: "",
  });

  const { isVerified } = useSelector((state) => state.user);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [fileUpload1, setUpload1] = useState(null);

  const onFileChange1 = (e) => {
    if (e.target.files[0]) {
      setUpload1(e.target.files[0]);
    } else {
      setUpload1(null);
    }
  };

  const delFileUpload = () => {
    setUpload1(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let insertData = {
      caption: input.post,
    };
    formData.append("image_url", fileUpload1);
    formData.append("data", JSON.stringify(insertData));

    try {
      newPost(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setInput({ post: "" });
      setUpload1(null);
      onClose();
    }
  };

  const Profile = () => {
    return (
      <Link href={"/profile"}>
        <div className="bg-slate-200 w-[278px] mx-5 mt-4 mb-2 h-24 rounded-lg border-2 border-slate-300 cursor-pointer hover:bg-slate-300">
          <div className="flex items-center ml-3 my-3">
            <Avatar
              className="border-2 border-slate-300"
              size="lg"
              name={fullname}
              src={image_url}
            />
            <div className="ml-4">
              <div className="font-bold text ">{fullname}</div>
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
        className="py-[0.5px] rounded-lg transition ease-in-out delay-150 hover:scale-100 hover:translate-x-1
       hover:bg-slate-100 duration-300 hover:rounded-lg hover:shadow-lg cursor-pointer group"
      >
        <div className="font-semibold my-3 px-4 border-l-4 flex items-center hover:border-l-4 hover:border-y-1 group-hover:border-cyan-700 ">
          <Icon className="text-3xl text-slate-500 group-hover:text-cyan-700" />
          <div className="ml-4 text-lg font-bold text-slate-800 group-hover:text-cyan-700">
            {title}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="fixed left-0 top-16 bottom-0">
        <Profile />
        <div>
          <Link href={"/"}>
            <div>
              <MenuIcon Icon={CgFeed} title="Feed" />
            </div>
          </Link>
          <MenuIcon Icon={FaUserFriends} title="Friends" />
          <MenuIcon Icon={HiBookmark} title="Bookmark" />
          <MenuIcon Icon={IoMdPhotos} title="Photos" />
          {!isVerified ? (
            <div
              disa
              className="bg-slate-500 text-md mx-4 text-center rounded-lg mt-2 py-1 text-slate-100 tracking-wider font-semibold cursor-not-allowed"
            >
              Spill
            </div>
          ) : (
            <div
              className="bg-cyan-700 text-md mx-4 text-center rounded-lg mt-2 py-1 text-slate-100 tracking-wider font-semibold cursor-pointer
      hover:bg-cyan-800 active:bg-cyan-900"
              onClick={onOpen}
            >
              Spill
            </div>
          )}

          {/* spill tea modal */}

          <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <div className="flex text-center mt-7">
                    <Avatar size="md" name={fullname} src={image_url} />
                    <div className="w-[80vh] ml-3 ">
                      <textarea
                        name="post"
                        className="w-full bg-inherit outline-none resize-none px-2 pt-2 font-semibold"
                        placeholder="Spill the tea..."
                        rows="3"
                        onChange={handleInput}
                        value={input.post}
                      ></textarea>
                    </div>
                  </div>
                  <div className="py-3 px-16">
                    {fileUpload1 ? (
                      <div>
                        <div
                          className="cursor-pointer absolute ml-24 mt-2 bg-slate-200 w-6 h-6 rounded-full text-slate-600"
                          onClick={delFileUpload}
                        >
                          X
                        </div>
                        <img
                          src={URL.createObjectURL(fileUpload1)}
                          className="object-cover w-32 h-32 rounded-lg"
                        />
                      </div>
                    ) : null}
                  </div>
                </ModalBody>

                <ModalFooter>
                  <div className="w-full border-t-2 pt-2 ">
                    <div className="flex justify-between">
                      <div className="flex">
                        <input
                          type="file"
                          className="hidden"
                          onChange={onFileChange1}
                          id="image1"
                          name="image1"
                          accept=".jpg,.jpeg,.png,.gif"
                        />
                        <label htmlFor="image1" type="button">
                          <PostIcon Icon={HiOutlinePhotograph} />
                        </label>
                        <PostIcon Icon={HiOutlineEmojiHappy} />
                        <PostIcon Icon={AiOutlineGif} />
                        <PostIcon Icon={MdLocationOn} />
                      </div>
                      <button
                        className="text-4xl text-cyan-700 hover:text-slate-400 "
                        type="submit"
                      >
                        <BsFillArrowUpCircleFill className="cursor-pointer active:border-2 rounded-full mr-2" />
                      </button>
                    </div>
                  </div>
                </ModalFooter>
              </form>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Menu);
