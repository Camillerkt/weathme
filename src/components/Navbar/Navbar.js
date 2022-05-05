// React import
import { useState } from "react";

// Components
import DefaultNavbar from "./DefaultNavbar";
import SearchNavbar from "./SearchNavbar";

const Navbar = () => {
  const [navbarStatus, setNavbarStatus] = useState("default");

  const displayNavbar =
    navbarStatus === "default" ? (
      <DefaultNavbar setNavbarStatus={setNavbarStatus} />
    ) : (
      <SearchNavbar setNavbarStatus={setNavbarStatus} />
    );

  return displayNavbar;
};

export default Navbar;
