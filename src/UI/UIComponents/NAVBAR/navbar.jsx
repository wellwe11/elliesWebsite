import classes from "./navbar.module.scss";

// importing screen-sizings to help navbar scale with body
import screen_classes from "../screenContainer/SCREENCONTAINER.module.scss";

import ButtonWithContent from "@components/buttonWithContent/BUTTONWITHCONTENT.jsx";

import logoImage from "@assets/logo.png";

import { useState } from "react";
import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";

const ShoppingCart = () => {
  // Simple text related to shoppingcart. Text is static and will remain the same.
  const shoppingBagText = (
    <div className={classes.shoppingBagText}>
      <p className={classes.cartText}>View cart</p>
    </div>
  );

  // svg-wrapper
  const shoppingBagSvgWrapper = (
    <div className={classes.shoppingBagWrapper}>
      <ShoppingBagSVG />
    </div>
  );

  return (
    <div className={classes.shoppingCart}>
      {shoppingBagText}
      {shoppingBagSvgWrapper}
    </div>
  );
};

// a wrapper for each nav-button
const NavButton = ({ children, link }) => {
  const handleNavigate = handleNavigateSmooth();
  return (
    // on-click is applied to wrapper to isolate logic from buttonWithContent
    <div className={classes.button} onClick={() => handleNavigate(link)}>
      <ButtonWithContent>{children}</ButtonWithContent>
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
  // navbar buttons
  const mappedNavButtons = buttons.map((button, index) => (
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

  // thin line below buttons that displays currently hovered button
  const buttonUnderlinePosition = 100 * hoverButton; // calculate buttons position relevant to currently active button
  const underlineWidth = 100 / Object.values(buttons).length; // calculate the buttons width depending on amount of buttons
  const buttonUnderline = (
    <span
      className={classes.buttonUnderline}
      style={{
        transform: `translateX(${buttonUnderlinePosition}%)`,
        width: `${underlineWidth}%`,
      }}
    />
  );

  return (
    <div className={classes.buttonsWrapper}>
      {mappedNavButtons}
      {buttonUnderline}
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
  const [hoverButton, setHoverButton] = useState(0);
  const buttons = [
    { Home: "" },
    { Gallery: "gallery" },
    { Contact: "./#contact" },
  ];

  // displays line below entire navbar (classes.navbar)
  const navbarShadowStyle = {
    boxShadow:
      hoverButton === 1
        ? "0 0 6px 1px rgba(0, 0, 0, 0.01), 0 0 0 1px rgba(27, 31, 35, 0.02)"
        : "",
  };

  // logo
  const navLogoWrapper = (
    <div className={classes.navLogoWrapper}>
      <NavLogo
        setActiveButton={setActiveButton}
        setHoverButton={setHoverButton}
      />
    </div>
  );

  // main-buttons (home, gallery etc)
  const navbarButtonsWrapper = (
    <div className={classes.navButtonsWrapper}>
      <NavbarButtons
        buttons={buttons}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        hoverButton={hoverButton}
        setHoverButton={setHoverButton}
      />
    </div>
  );

  // shoppingcart
  const shoppingCartWrapper = (
    <div className={classes.shoppingCartWrapper}>
      <ShoppingCart />
    </div>
  );

  return (
    <div className={classes.navbar} style={navbarShadowStyle}>
      <div className={classes.navContent}>
        <div
          className={`${screen_classes.contentWrapper} ${classes.navWrapper}`}
        >
          {navLogoWrapper}
          {navbarButtonsWrapper}
          {shoppingCartWrapper}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
