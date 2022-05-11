import React from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Avatar, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { BiComment, BiLike, BiShare } from "react-icons/bi";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { HiOutlineBookmark, HiOutlineDotsHorizontal } from "react-icons/hi";
import { API_URL } from "../helpers";
import calculateTime from "../helpers/calculateTime";

function Status({
  fullname,
  username,
  caption,
  profilepicture,
  image_url,
  deletepostfunc,
  totalcomments,
  totallikes,
  alreadyLike,
  created_at,
}) {
  const PostIcon = ({ Icon, title }) => {
    return (
      <div className="w-fit flex items-center text-center mx-auto text-slate-500 ">
        <Icon className="text-lg  mr-2" />
        <div className="text-sm font-semibold">{title}</div>
      </div>
    );
  };

  const FilledIcon = ({ Icon, title }) => {
    return (
      <div className="w-fit flex items-center text-center mx-auto text-red-500 ">
        <Icon className="text-lg  mr-2" />
        <div className="text-sm font-semibold">{title}</div>
      </div>
    );
  };

  return (
    <div className="bg-slate-100 rounded-lg shadow-md my-5 ">
      <div className="flex justify-between px-5 pt-4">
        <div className="flex">
          <Avatar
            size="md"
            name={fullname}
            src={`${API_URL}${profilepicture}`}
          />
          <div className="ml-3">
            <div className="flex items-baseline">
              <div className="font-bold">{fullname}</div>
              <div className="text-slate-500 pl-2 text-sm">
                {calculateTime(created_at)}
              </div>
            </div>
            <div className="text-slate-500 text-sm">@{username}</div>
          </div>
        </div>
        <div>
          <Menu>
            <MenuButton>
              <HiOutlineDotsHorizontal className="text-lg text-slate-500" />
            </MenuButton>
            <MenuList minWidth="40px">
              <MenuItem icon={<EditIcon />}>Edit Tea</MenuItem>
              <MenuItem icon={<DeleteIcon />} onClick={deletepostfunc}>
                Delete Tea
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
      <div className="px-20 pb-5">{caption}</div>
      {image_url ? (
        <div className="flex px-20 pb-5">
          <img
            src={`${API_URL}${image_url}`}
            alt=""
            className="object-cover rounded-lg w-96 h-96"
          />
        </div>
      ) : null}
      <div className="grid grid-cols-4 py-3 border-t-2 mx-5">
        <PostIcon Icon={BiComment} title={totalcomments} />
        {alreadyLike ? (
          <button>
            <FilledIcon Icon={AiFillLike} title={totallikes} />
          </button>
        ) : (
          <button>
            <PostIcon Icon={AiOutlineLike} title={totallikes} />
          </button>
        )}
        <PostIcon Icon={BiShare} />
        <PostIcon Icon={HiOutlineBookmark} />
      </div>
    </div>
  );
}

export default Status;
