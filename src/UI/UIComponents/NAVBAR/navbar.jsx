import classes from "./navbar.module.scss";
import screen_classes from "../screenContainer/SCREENCONTAINER.module.scss";
import ButtonWithContent from "../../../abstract/components/buttonWithContent/BUTTONWITHCONTENT.jsx";
import { useState } from "react";

const NavButton = ({ children, link }) => {
  return (
    <div className={classes.button}>
      <ButtonWithContent link={link}>{children}</ButtonWithContent>
    </div>
  );
};

const NavbarButtons = () => {
  const [activeButton, setActiveButton] = useState(0);
  const [hoverButton, setHoverButton] = useState(0);

  const buttons = ["Home", "About", "Contact"];

  return (
    <div className={classes.buttonsWrapper}>
      {buttons.map((button, index) => (
        <div
          key={index}
          onClick={() => setActiveButton(index)}
          onMouseEnter={() => setHoverButton(index)}
          onMouseLeave={() => setHoverButton(activeButton)}
        >
          <NavButton>{button}</NavButton>
        </div>
      ))}
      <span
        className={classes.buttonUnderline}
        style={{ left: `${140 * hoverButton}px` }}
      ></span>
    </div>
  );
};

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.navContent}>
        <div className={screen_classes.contentWrapper}>
          <NavbarButtons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
