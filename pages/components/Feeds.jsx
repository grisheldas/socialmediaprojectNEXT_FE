import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Post } from "./Post";
import Status from "./Status";
import { API_URL } from "../../helpers";
import InfiniteScroll from "react-infinite-scroll-component";
import Cookies from "js-cookie";

const Feeds = () => {
  const [page, setPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getPost = async () => {
    let res = await axios.get(`${API_URL}/post/fetchposts?page=0`);
    setPosts(res.data);
  };
  useEffect(() => {
    getPost();
  }, []);

  const fetchPosts = async () => {
    let res = await axios.get(`${API_URL}/post/fetchposts?page=${page}`);
    setTotalPosts(parseInt(res.headers["x-total-count"]));
    return res.data;
  };

  const fetchData = async () => {
    const postsFromServer = await fetchPosts();

    setPosts([...posts, ...postsFromServer]);
    if (
      posts.length === 0 ||
      posts.length < 10 ||
      posts.length === totalPosts
    ) {
      setHasMore(false);
    }

    setPage(page + 1);
  };

  const newPost = async (val) => {
    try {
      let token = Cookies.get("token");
      await axios.post(`${API_URL}/post/addnewpost`, val, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setPage(1);
      setHasMore(true);
      setTotalPosts(0);
      setPosts([]);
      getPost();
    }
  };

  // const fetchPosts = async () => {
  //   try {
  //     let res = await axios.get(`${API_URL}/post/fetchposts?page=${page}`);
  //     setPosts(res.data);
  //     setTotalPosts(parseInt(res.headers["x-total-count"]));
  //     console.log(posts, "ini post");
  //     console.log(totalPosts, "ini x-total-count");

  //     if (posts.length === 0 || posts.length < 10) {
  //       setHasMore(false);
  //     }

  //     setPage(page + 1);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchData}
      hasMore={hasMore}
      loader={
        <div className="text-center text-cyan-700 pb-8 font-bold" key={0}>
          Loading ...
        </div>
      }
      endMessage={
        <p className="text-center text-cyan-700 pb-8 font-bold">
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      <div className="w-full px-20 py-4">
        <div className="">
          <Post newPost={newPost} />
        </div>
        <div>
          {posts.map((item) => {
            return (
              <Status
                key={item.id}
                fullname={item.fullname}
                username={item.username}
                caption={item.caption}
              />
            );
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default Feeds;
