import { Avatar } from "@chakra-ui/react";

const Widgets = () => {
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
    <div className="w-3/12 bg-slate-100">
      <div className="m-5 rounded-md shadow-sm bg-slate-200">
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
    </div>
  );
};

export default Widgets;
