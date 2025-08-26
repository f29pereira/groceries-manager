import { useState, useEffect } from "react";
import SmallScreenNav from "./SmallScreenNav/SmallScreenNav";
import MedBigScreenNav from "./MedBigScreenNav/MedBigScreenNav";

function Nav() {
  //useState Hook
  const [windowWith, setWindowWith] = useState(window.innerWidth);

  //useEffect Hook
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

  return <>{isSmallScreen ? <SmallScreenNav /> : <MedBigScreenNav />}</>;
}

export default Nav;
