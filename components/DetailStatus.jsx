import React, { useState } from "react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { BiComment, BiLike, BiShare } from "react-icons/bi";
import {
  HiOutlineBookmark,
  HiOutlineDotsHorizontal,
  HiOutlineEmojiHappy,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { API_URL } from "../helpers";
import { IoMdPhotos } from "react-icons/io";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import PostIcon from "./PostIcon";
import { AiOutlineGif, AiFillLike, AiOutlineLike } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import calculateTime from "../helpers/calculateTime";
import { useSelector } from "react-redux";

function DetailStatus({
  fullname,
  username,
  caption,
  profilepicture,
  image_url,
  deletepostfunc,
  updatePost,
  totalcomments,
  totallikes,
  likepost,
  alreadyLike,
  user_id,
  id,
  created_at,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState({
    post: caption,
    image: "",
  });

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [fileUpload1, setUpload] = useState(null);

  const onFileChange = (e) => {
    if (e.target.files[0]) {
      setUpload(e.target.files[0]);
    } else {
      setUpload(null);
    }
  };

  const { isVerified } = useSelector((state) => state.user);

  const delFileUpload = () => {
    setUpload(null);
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
      updatePost(formData);
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
    }
  };

  const likePost = async (e) => {
    e.preventDefault();
    try {
      const res = await likepost();
      console.log(res, "res for like");
    } catch (error) {
      console.log(error);
    }
  };

  const DetailIcon = ({ Icon, title }) => {
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
    <div>
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
              {user_id == id ? (
                <MenuList minWidth="40px">
                  <MenuItem
                    icon={<EditIcon />}
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
                    Edit Tea
                  </MenuItem>
                  <MenuItem icon={<DeleteIcon />} onClick={deletepostfunc}>
                    Delete Tea
                  </MenuItem>
                </MenuList>
              ) : (
                <MenuList minWidth="40px">
                  <MenuItem isDisabled={true} icon={<EditIcon />}>
                    Edit Tea
                  </MenuItem>
                  <MenuItem
                    isDisabled={true}
                    icon={<DeleteIcon />}
                    onClick={deletepostfunc}
                  >
                    Delete Tea
                  </MenuItem>
                </MenuList>
              )}
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
          <DetailIcon Icon={BiComment} title={totalcomments} />
          {isVerified ? (
            <div className="text-center">
              {alreadyLike ? (
                <button onClick={likePost}>
                  <FilledIcon Icon={AiFillLike} title={totallikes} />
                </button>
              ) : (
                <button onClick={likePost}>
                  <DetailIcon Icon={AiOutlineLike} title={totallikes} />
                </button>
              )}
            </div>
          ) : (
            <button onClick={likePost} disabled>
              <DetailIcon Icon={AiOutlineLike} title={totallikes} />
            </button>
          )}
          <DetailIcon Icon={BiShare} />
          <DetailIcon Icon={HiOutlineBookmark} />
        </div>
      </div>
      {/* spill tea modal */}

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <div className="flex text-center mt-7">
                <Avatar
                  size="md"
                  name={fullname}
                  src={`${API_URL}${profilepicture}`}
                />
                <div className="w-[80vh] ml-3 ">
                  <textarea
                    name="post"
                    className="w-full bg-inherit outline-none resize-none px-2 pt-2 font-semibold"
                    placeholder="Spill the tea..."
                    // rows="5"
                    onChange={handleInput}
                    value={input.post}
                  ></textarea>
                  <div className="py-3">
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
                    ) : (
                      <div>
                        <div
                          className="cursor-pointer absolute ml-24 mt-2 bg-slate-200 w-6 h-6 rounded-full text-slate-600"
                          onClick={delFileUpload}
                        >
                          X
                        </div>
                        <img
                          src={`${API_URL}${image_url}`}
                          alt=""
                          className="object-cover w-32 h-32 rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <div className="w-full border-t-2 pt-2 ">
                <div className="flex justify-between">
                  <div className="flex">
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
  );
}

export default DetailStatus;
