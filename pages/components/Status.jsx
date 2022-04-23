import React from "react";
import { Avatar } from "@chakra-ui/react";
import { BiComment, BiLike, BiShare } from "react-icons/bi";
import { HiOutlineBookmark, HiOutlineDotsHorizontal } from "react-icons/hi";

function Status({ fullname, username, caption }) {
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
            <div className="font-bold">{fullname}</div>
            <div className="text-slate-500 text-sm">@{username}</div>
          </div>
        </div>
        <div>
          <HiOutlineDotsHorizontal className="text-lg text-slate-500" />
        </div>
      </div>
      <div className="px-5 pb-5">{caption}</div>
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
