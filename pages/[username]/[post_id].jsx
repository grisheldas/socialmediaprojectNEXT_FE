import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";
import Widgets from "../../components/Widgets";
import DetailStatus from "../../components/DetailStatus";
import { useSelector } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../../helpers";
import Cookies from "js-cookie";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const PostDetail = () => {
  const router = useRouter();
  let { post_id } = router.query;
  post_id = parseInt(post_id);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const { username, fullname, profilepicture, id, isVerified } = useSelector(
    (state) => state.user
  );

  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const [totalComments, setTotalComments] = useState(0);

  const fetchComments = async () => {
    try {
      let token = Cookies.get("token");
      let res = await axios.get(`${API_URL}/post/fetchcomments/${post_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      let totalCom = parseInt(res.headers["x-comments-count"]);
      setTotalComments(totalCom);
      setComments(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log(totalComments);
    }
  };

  const fetchUserPostDetail = async () => {
    try {
      let token = Cookies.get("token");
      let res = await axios.get(
        `${API_URL}/post/fetchuserpostdetail/${post_id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = () => {
    try {
      let token = Cookies.get("token");
      axios.delete(`${API_URL}/post/deletepost/${post_id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success("Tea deleted!", {
        position: "top-right",
      });
    } catch (error) {
      console.log(error);
    } finally {
      router.push("/");
    }
  };

  const updatePost = async (val) => {
    try {
      let token = Cookies.get("token");
      await axios.patch(`${API_URL}/post/updatepost/${post_id}`, val, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      fetchUserPostDetail();
    }
  };

  const [input, setInput] = useState({
    comment: "",
  });
  const [chars, setChars] = useState(input.comment.length);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let inputComment = {
      comment: input.comment,
    };
    try {
      let token = Cookies.get("token");
      await axios.post(`${API_URL}/post/addcomment/${post_id}`, inputComment, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setInput({ comment: "" });
      fetchComments();
    }
  };

  const likePost = async () => {
    let token = Cookies.get("token");
    try {
      return await axios.post(`${API_URL}/post/addlike/${post_id}`, null, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      fetchUserPostDetail();
    }
  };

  useEffect(() => {
    fetchUserPostDetail();
    fetchComments();
    setChars(input.comment.length);
  }, [input]);

  return (
    <div>
      <main className="bg-slate-200 min-h-screen max-w-screen mx-auto">
        <Navbar />
        <div className="grid grid-cols-12 min-h-screen">
          <div className="col-span-3 bg-slate-100 mr-2 2xl:mr-16 xl:mr-2">
            <Menu
              username={username}
              fullname={fullname}
              image_url={`${API_URL}${profilepicture}`}
            />
          </div>
          <div className="col-span-6 px-20">
            <DetailStatus
              fullname={data.fullname}
              username={data.username}
              caption={data.caption}
              profilepicture={data.profilepicture}
              image_url={data.image_url}
              deletepostfunc={onOpen}
              updatePost={updatePost}
              totalcomments={totalComments}
              totallikes={data.number_of_likes}
              likepost={likePost}
              alreadyLike={data.already_like}
              id={id}
              user_id={data.user_id}
              created_at={data.created_at}
            />

            {/* POST A COMMENT */}
            <form
              className="flex text-center items-center bg-slate-100 rounded-lg shadow-md px-5 py-3"
              onSubmit={handleSubmit}
            >
              <Avatar
                size="md"
                name={fullname}
                src={`${API_URL}${profilepicture}`}
              />
              <div className="w-full ml-3 ">
                <textarea
                  name="comment"
                  value={input.comment}
                  className="w-full bg-inherit outline-none resize-none px-2 mt-2 font-semibold"
                  placeholder="Insert your comment..."
                  rows="2"
                  onChange={handleInput}
                ></textarea>
                {chars <= 300 ? (
                  <div className="text-left pl-2 text-xs font-semibold text-slate-400">
                    {chars}/300
                  </div>
                ) : (
                  <div className="text-left pl-2 text-xs font-semibold text-cyan-700">
                    {chars}/300
                  </div>
                )}
              </div>
              {isVerified && chars <= 300 ? (
                <button
                  className="text-4xl ml-3 text-cyan-700 hover:text-slate-400"
                  type="submit"
                >
                  <BsFillArrowUpCircleFill className="cursor-pointer active:border-2 rounded-full" />
                </button>
              ) : (
                <button
                  className="text-4xl ml-3 text-slate-400"
                  type="submit"
                  disabled
                >
                  <BsFillArrowUpCircleFill className="cursor-not-allowed rounded-full" />
                </button>
              )}
            </form>

            {/* COMMENTS SECTION */}
            <div className="bg-slate-100 rounded-lg shadow-md my-5">
              <div className="text-lg font-bold px-5 py-2 border-b-2 ">
                Comments
              </div>
              {totalComments > 0 ? (
                <div>
                  {comments.map((item) => {
                    return (
                      <div key={item.id} className="border-b-2">
                        <div className="flex justify-between px-5 pt-3">
                          <div className="flex">
                            <Avatar
                              size="md"
                              name={item.fullname}
                              src={`${API_URL}${item.profilepicture}`}
                            />
                            <div className="ml-3">
                              <div className="font-bold">{item.fullname}</div>
                              <div className="text-slate-500 text-sm">
                                @{item.username}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-20 pb-3">{item.comment}</div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-5"> No comments found</div>
              )}
            </div>
          </div>

          {/* DELETE ALERT */}
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Delete Tea
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure? You can't undo this action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={deletePost} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
          <div className="col-span-3 bg-slate-100 ml-16 2xl:ml-16 xl:ml-6 ">
            <Widgets />
          </div>
        </div>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default PostDetail;
