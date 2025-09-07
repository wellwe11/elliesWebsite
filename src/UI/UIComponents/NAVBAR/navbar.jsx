import classes from "./navbar.module.scss";

// importing screen-sizings to help navbar scale with body
import screen_classes from "../screenContainer/SCREENCONTAINER.module.scss";

import ButtonWithContent from "@components/buttonWithContent/BUTTONWITHCONTENT.jsx";

import logoImage from "@assets/logo.png";

import { useEffect, useState } from "react";
import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";
import { useLocation } from "react-router-dom";

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
  const buttonKeys = Object.keys(buttons);

  // make all navbar buttons texts start with a capital letter
  const buttonNamesWithFirstLetterCapital = Object.keys(buttons).map(
    (key) => key.slice(0, 1).toUpperCase() + key.slice(1)
  );

  // navbar buttons
  const mappedNavButtons = buttonKeys.map((_, index) => (
    <div
      key={index}
      onClick={() => setActiveButton(index)}
      onMouseEnter={() => setHoverButton(index)}
      onMouseLeave={() => setHoverButton(activeButton)}
      className={classes.buttonWrapper}
    >
      <NavButton link={Object.values(buttons)[index]}>
        {buttonNamesWithFirstLetterCapital[index]}
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
  const { pathname } = useLocation();
  const buttons = {
    home: "",
    gallery: "gallery#1",
    contact: "./#contact",
  };

  const [loadTab, setLoadTab] = useState(false);

  // useEffect which searches for the currently active tab
  useEffect(() => {
    // find active tab
    // split names of tabs
    const buttonsKeys = Object.keys(buttons);

    // split current link
    const splittedPathName = pathname.split("/");

    // find if any buttonKeys exist inside of url
    buttonsKeys.forEach((btn, index) => {
      if (splittedPathName.includes(btn)) {
        // if yes, change index to that
        setActiveButton(index);
        setHoverButton(index);
      }
    });

    setLoadTab(true);
  }, []);

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

  if (!loadTab) return <div />;
  return (
    <div className={classes.navbar}>
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
