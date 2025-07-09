import { useState } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router";
import SmallScreenNav from "./SmallScreenNav/SmallScreenNav";
import MedBigScreenNav from "./MedBigScreenNav/MedBigScreenNav";

function Nav() {
  const [windowWith, setWindowWith] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWith(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isSmallScreen = windowWith <= 400;

  return (
    <>
      {isSmallScreen ? <SmallScreenNav /> : <MedBigScreenNav />}

      <Outlet />
    </>
  );
}

export default Nav;
