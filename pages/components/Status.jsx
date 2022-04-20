import React from "react";
import { Avatar } from "@chakra-ui/react";
import { BiComment, BiLike, BiShare } from "react-icons/bi";
import { HiOutlineBookmark, HiOutlineDotsHorizontal } from "react-icons/hi";

function Status() {
  const PostIcon = ({ Icon, title }) => {
    return (
      <div className="flex items-center text-slate-500 mx-14">
        <Icon className=" mr-3" />
        <div className="text-sm font-semibold">{title}</div>
      </div>
    );
  };

  return (
    <div className="bg-slate-100 rounded-lg shadow-md my-5">
      <div className="flex justify-between px-5 py-4">
        <div className="flex">
          <Avatar />
          <div className="ml-3">
            <div className="font-bold">Your name</div>
            <div className="text-slate-500 text-sm">@yourusername</div>
          </div>
        </div>
        <div>
          <HiOutlineDotsHorizontal className="text-lg text-slate-500" />
        </div>
      </div>
      <div className="px-5 pb-5">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate
        officiis nihil alias facilis. Assumenda voluptatem eos nesciunt placeat
        tempore amet fuga cupiditate eveniet. Esse cumque quae natus deserunt!
        Quo, deleniti.
      </div>
      <div className="flex justify-between mx-5 py-2 border-t-2">
        <PostIcon Icon={BiComment} title={"Comment"} />
        <PostIcon Icon={BiLike} title={"Like"} />
        <PostIcon Icon={BiShare} title={"Share"} />
        <PostIcon Icon={HiOutlineBookmark} title={"Bookmark"} />
      </div>
    </div>
  );
}

export default Status;
