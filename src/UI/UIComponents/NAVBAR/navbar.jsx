import classes from "./navbar.module.scss";

import screen_classes from "../screenContainer/SCREENCONTAINER.module.scss";
import ButtonWithContent from "@components/buttonWithContent/BUTTONWITHCONTENT.jsx";

import logoImage from "@assets/logo.png";

import { useState } from "react";
import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";

const ShoppingCart = () => {
  return (
    <div className={classes.shoppingCart}>
      <div className={classes.shoppingBagText}>
        <p className={classes.cartText}>View cart</p>
      </div>
      <div className={classes.shoppingBagContainer}>
        <ShoppingBagSVG />
      </div>
    </div>
  );
};

const NavButton = ({ children, link }) => {
  return (
    <div className={classes.button}>
      <ButtonWithContent link={link}>{children}</ButtonWithContent>
    </div>
  );
};

const NavbarButtons = ({ buttons }) => {
  const [activeButton, setActiveButton] = useState(0);
  const [hoverButton, setHoverButton] = useState(0);

  return (
    <div className={classes.buttonsWrapper}>
      {buttons.map((button, index) => (
        <div
          key={index}
          onClick={() => setActiveButton(index)}
          onMouseEnter={() => setHoverButton(index)}
          onMouseLeave={() => setHoverButton(activeButton)}
          className={classes.buttonWrapper}
        >
          <NavButton link={Object.values(button)[0]}>
            {Object.keys(button)}
          </NavButton>
        </div>
      ))}
      <span
        className={classes.buttonUnderline}
        style={{ left: `${140 * hoverButton}px` }}
      ></span>
    </div>
  );
};

const NavLogo = () => {
  return (
    <div className={classes.logoContainer}>
      <img className={classes.navLogoImage} src={logoImage} alt="" />
      <h1 className={classes.logo}>elisabeth.chloé</h1>
    </div>
  );
};

const Navbar = () => {
  const buttons = [{ Home: "" }, { About: "About" }, { Contact: "./#Contact" }];

  return (
    <div className={classes.navbar}>
      <div className={classes.navContent}>
        <div
          className={`${screen_classes.contentWrapper} ${classes.navWrapper}`}
        >
          <NavLogo />
          <NavbarButtons buttons={buttons} />
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
