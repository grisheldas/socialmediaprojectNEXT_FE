import { Avatar } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

const Widgets = ({ sendEmailVerification }) => {
  const { isVerified } = useSelector((state) => state.user);

  const Profile = () => {
    return (
      <div className="cursor-pointer hover:bg-slate-300">
        <div className="flex py-3 px-4">
          <Avatar
            size="md"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
          <div className="ml-4">
            <div className="font-bold ">Your name</div>
            <div className="text-sm text-slate-500">@yourusername</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className=" bg-slate-100">
      <div className="fixed right-0 w-64 mt-5 mr-6 rounded-md shadow-sm bg-slate-200">
        <div className="text-lg font-bold py-2 pl-4">People you might know</div>
        <div>
          <Profile />
          <Profile />
          <Profile />
        </div>
        <div className="font-semibold py-2 pl-4 text-cyan-700 hover:bg-slate-300 hover:rounded-b-md cursor-pointer">
          See more
        </div>
      </div>
      {!isVerified ? (
        <div className="fixed right-0 bottom-56 w-64 mt-5 mr-6 rounded-md shadow-sm bg-orange-200">
          <div className="mt-3 mx-3 font-semibold text-orange-600">
            Your account has not been verified yet.
          </div>
          <div
            className="my-3 mx-3 py-1 text-center rounded-lg  bg-orange-400 text-slate-50 hover:bg-orange-500 cursor-pointer"
            onClick={sendEmailVerification}
          >
            Resend e-mail verification
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(Widgets);
