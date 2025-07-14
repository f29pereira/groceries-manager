import { useState } from "react";
import Hamburguer from "./Hamburguer";
import Menu from "./Menu";

function SmallScreenNav() {
  const [isHamburguerOpen, setIsHamburguerOpen] = useState(false);

  function toggle() {
    setIsHamburguerOpen((prevState) => !prevState);
  }

  return (
    <>
      <Hamburguer isHamburguerOpen={isHamburguerOpen} handleClick={toggle} />
      <Menu isHamburguerOpen={isHamburguerOpen} handleClick={toggle} />
    </>
  );
}

export default SmallScreenNav;
