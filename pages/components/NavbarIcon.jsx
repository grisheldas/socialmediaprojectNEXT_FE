const NavbarIcon = ({ Icon }) => {
  return (
    <div className="p-2 mx-2 rounded-xl group cursor-pointer hover:bg-slate-200 group active:border-t-2 active:border-slate-300">
      <Icon className="text-center group-hover:text-cyan-700 " />
    </div>
  );
};

export default NavbarIcon;
