import React from "react";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Widgets from "./components/Widgets";
import Profile from "./components/Profile";
import Head from "next/head";
import { useSelector } from "react-redux";
import { API_URL } from "../helpers";

const ProfilePage = () => {
  const { username, fullname, profilepicture } = useSelector(
    (state) => state.user
  );

  return (
    <div>
      <Head>
        <title>Profile | Teatalk</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href={"/favicon.ico"} />
      </Head>

      <main className="bg-slate-200 min-h-screen max-w-screen mx-auto">
        <Navbar />
        <div className="flex flex-row min-h-screen">
          <Menu
            username={username}
            fullname={fullname}
            image_url={`${API_URL}${profilepicture}`}
          />
          <Profile username={username} />
          <Widgets />
          {/* Modal */}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
