import React from "react";
import { Post } from "./Post";
import Status from "./Status";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "next/link";

const Feeds = ({ newPost, posts, hasMore, fetchData }) => {
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
              <Link href={`http://localhost:3000/${item.username}/${item.id}`}>
                <div className="transition ease-in-out delay-150 hover:scale-105">
                  <Status
                    key={item.id}
                    fullname={item.fullname}
                    username={item.username}
                    caption={item.caption}
                    profilepicture={item.profilepicture}
                    image_url={item.image_url}
                    totalcomments={item.comments}
                    totallikes={item.number_of_likes}
                    alreadyLike={item.already_like}
                    created_at={item.created_at}
                    // deletepostfunc={deletePost(item.id)}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </InfiniteScroll>
  );
};

export default Feeds;
