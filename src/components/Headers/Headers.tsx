"use client";

import { useState } from "react";
import { UserLogo } from "../Headers/UserLogo";
import IconBell from "../../assets/icons/bell.svg";
import IconBurgerMenu from "../../assets/icons/menu.svg";
import SideBar from "../SideBar";

const Headers = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between pl-5 pr-5 pt-2.5 pb-2.5">
        <UserLogo />
        <div className="flex items-center gap-1">
          <button className="cursor-pointer w-10 h-10 flex justify-center items-center">
            <i className="w-6 h-6 text-black">
              <IconBell />
            </i>
          </button>

          <button
            className="cursor-pointer w-10 h-10 flex justify-center items-center"
            onClick={() => setMenuOpen(true)}
          >
            <i className="w-6 h-6 text-black">
              <IconBurgerMenu />
            </i>
          </button>
        </div>
      </div>

      <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </>
  );
};

export default Headers;
