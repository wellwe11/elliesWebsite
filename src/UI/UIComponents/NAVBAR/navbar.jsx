import classes from "./navbar.module.scss";

import screen_classes from "../screenContainer/SCREENCONTAINER.module.scss";
import ButtonWithContent from "@components/buttonWithContent/BUTTONWITHCONTENT.jsx";

import logoImage from "@assets/logo.png";

import { useState } from "react";
import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";
import { useNavigate } from "react-router-dom";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";

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

// main-buttons
const NavbarButtons = ({
  buttons,
  setActiveButton,
  setHoverButton,
  hoverButton,
  activeButton,
}) => {
  const mappedButtons = buttons.map((button, index) => (
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
  ));

  return (
    <div className={classes.buttonsWrapper}>
      {mappedButtons}
      <span
        className={classes.buttonUnderline}
        style={{ transform: `translateX(${140 * hoverButton}px)` }}
      />
    </div>
  );
};

// drop-down menu for when you hover "gallery"
const ExtendGallery = ({ hoverButton, setHoverButton, activeButton }) => {
  const buttons = ["Prints", "Paintings", "Custom"];

  return (
    <div
      className={`${classes.pageOptionTextsContainer} ${
        hoverButton === 1 ? classes.hoverStyle : classes.inactiveStyle
      }`}
      onMouseEnter={() => setHoverButton(1)}
      onMouseLeave={() => setHoverButton(activeButton)}
    >
      <div className={classes.pageOptionsWrapper}>
        {buttons.map((button, index) => (
          <button key={index} className={classes.pageOptionButton}>
            <h5 className={classes.pageOptionText}>{button}</h5>
          </button>
        ))}
      </div>
    </div>
  );
};

const NavLogo = ({ setActiveButton, setHoverButton }) => {
  const navigate = handleNavigateSmooth();
  return (
    <div
      className={classes.logoContainer}
      onClick={() => {
        setActiveButton(0);
        setHoverButton(0);
        navigate("./");
      }}
    >
      <img className={classes.navLogoImage} src={logoImage} alt="" />
      <h1 className={classes.logo}>art & cards co.</h1>
    </div>
  );
};

const Navbar = () => {
  const [activeButton, setActiveButton] = useState(0);
  console.log(activeButton);
  const [hoverButton, setHoverButton] = useState(0);
  const buttons = [
    { Home: "" },
    { Gallery: "Gallery" },
    { Contact: "./#Contact" },
  ];

  // displays line below entire navbar
  const navbarShadowStyle = {
    boxShadow:
      hoverButton === 1
        ? "0 0 6px 1px rgba(0, 0, 0, 0.01), 0 0 0 1px rgba(27, 31, 35, 0.02)"
        : "",
  };

  return (
    <div className={classes.navbar} style={navbarShadowStyle}>
      <div className={classes.navContent}>
        <div
          className={`${screen_classes.contentWrapper} ${classes.navWrapper}`}
        >
          <NavLogo
            setActiveButton={setActiveButton}
            setHoverButton={setHoverButton}
          />
          <NavbarButtons
            buttons={buttons}
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            hoverButton={hoverButton}
            setHoverButton={setHoverButton}
          />
          <ShoppingCart />
        </div>
        <ExtendGallery
          hoverButton={hoverButton}
          setHoverButton={setHoverButton}
          activeButton={activeButton}
        />
      </div>
    </div>
  );
};

export default Navbar;
