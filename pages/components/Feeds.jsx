import { Post } from "./Post";
import Status from "./Status";

const Feeds = () => {
  return (
    <div className="w-8/12 px-20 py-4">
      <div className="">
        <Post />
      </div>
      <div>
        <Status />
        <Status />
      </div>
    </div>
  );
};

export default Feeds;
