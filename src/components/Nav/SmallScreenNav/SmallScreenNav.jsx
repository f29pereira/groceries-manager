import { useState } from "react";
import Hamburguer from "./Hamburguer";
import Menu from "./Menu";

function MobileNav() {
  const [isHamburguerOpen, setIsHamburguerOpen] = useState(false);

  const hamburguerHidden = isHamburguerOpen ? "hidden" : "";
  const menuHidden = !isHamburguerOpen ? "hidden" : "";

  function toggle() {
    setIsHamburguerOpen((prevState) => !prevState);
  }

  return (
    <>
      <Hamburguer visible={hamburguerHidden} handleClick={toggle} />
      <Menu visible={menuHidden} handleClick={toggle} />
    </>
  );
}

export default MobileNav;
