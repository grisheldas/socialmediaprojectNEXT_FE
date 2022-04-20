import React from "react";
import Status from "./Status";

const DUMMY_DATA = [
  {
    id: "1",
    username: "grisheldas",
    userImg: "",
    caption: "Hello this is my first post",
  },
  {
    id: "2",
    username: "grisheldas",
    userImg: "",
    caption: "Hello this is my second post",
  },
];

function UserStatus() {
  return (
    <div>
      <Status />
    </div>
  );
}

export default UserStatus;
