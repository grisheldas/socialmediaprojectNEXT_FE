import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { HiOutlinePhotograph, HiOutlineEmojiHappy } from "react-icons/hi";
import { AiOutlineGif } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { Avatar, Collapse, useDisclosure } from "@chakra-ui/react";
import PostIcon from "./PostIcon";
import React, { useState } from "react";
import OutsideClickHandler from "./OutsideClickHandler";
import { API_URL } from "../../helpers";
import Cookies from "js-cookie";
import axios from "axios";

export const Post = () => {
  // const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: false });
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    post: "",
    image: "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [fileUpload, setUpload] = useState(null);

  const onFileChange = (e) => {
    if (e.target.files[0]) {
      setUpload(e.target.files[0]);
    } else {
      setUpload(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    let insertData = {
      caption: input.post,
    };
    formData.append("image_url", fileUpload);
    formData.append("data", JSON.stringify(insertData));

    try {
      let token = Cookies.get("token");
      await axios.post(`${API_URL}/post/addnewpost`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setInput({ post: "" });
    }
  };

  return (
    <div>
      <OutsideClickHandler
        onOutsideClick={() => {
          setIsOpen(false);
        }}
        toggle={() => {
          setIsOpen(true);
        }}
      >
        <form
          className="bg-slate-100 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="text-lg font-bold px-5 py-2 border-b-2">
            What's the tea?
          </div>
          <div className="flex px-5 py-3 items-center text-center">
            <Avatar
              size="md"
              name="Dan Abrahmov"
              src="https://bit.ly/dan-abramov"
            />
            <div className="w-full ml-3 ">
              <textarea
                name="post"
                value={input.post}
                className="w-full bg-inherit outline-none resize-none px-2 pt-2 font-semibold"
                placeholder="Spill it..."
                rows="2"
                onChange={handleInput}
              ></textarea>
            </div>
            <button
              className="text-4xl ml-3 text-cyan-700 hover:text-slate-400"
              type="submit"
            >
              <BsFillArrowUpCircleFill className="cursor-pointer active:border-2 rounded-full" />
            </button>
          </div>
          <Collapse in={isOpen}>
            <div className="pl-20 border-t-2 py-1 flex">
              <input
                type="file"
                className="hidden"
                onChange={onFileChange}
                id="image"
                name="image"
                accept=".jpg,.jpeg,.png,.gif"
              />
              <label for="image" type="button">
                <PostIcon Icon={HiOutlinePhotograph} />
              </label>
              <PostIcon Icon={HiOutlineEmojiHappy} />
              <PostIcon Icon={AiOutlineGif} />
              <PostIcon Icon={MdLocationOn} />
            </div>
          </Collapse>
        </form>
      </OutsideClickHandler>
    </div>
  );
};
