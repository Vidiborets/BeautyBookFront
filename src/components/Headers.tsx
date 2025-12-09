import { LogoutButton } from "./LogoutButton";
import { UserLogo } from "./UserLogo";
import IconBell from "../assets/icons/bell.svg";
import IconBurgerMenu from "../assets/icons/menu.svg";

const Headers = () => {
  return (
    <div className="flex justify-between pl-5 pr-5 pt-2.5 pb-2.5">
      <UserLogo />
      <div className="flex items-center gap-1">
        <button className="cursor-pointer w-10 h-10 flex justify-center items-center">
          <i className="w-6 h-6 text-black">
            <IconBell />
          </i>
        </button>
        <button className="cursor-pointer w-10 h-10 flex justify-center items-center">
          <i className="w-6 h-6 text-black">
            <IconBurgerMenu />
          </i>
        </button>
        {/* <LogoutButton /> */}
      </div>
    </div>
  );
};

export default Headers;
