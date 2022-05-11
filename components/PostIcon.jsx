const PostIcon = ({ Icon }) => {
  return (
    <div className="p-2 mx-1 rounded-full cursor-pointer hover:bg-slate-200 group active:bg-slate-300">
      <Icon className="text-xl text-cyan-700 items-center" />
    </div>
  );
};

export default PostIcon;
