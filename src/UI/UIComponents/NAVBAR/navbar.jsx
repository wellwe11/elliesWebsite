import classes from "./navbar.module.scss";

// importing screen-sizings to help navbar scale with body
import screen_classes from "../screenContainer/SCREENCONTAINER.module.scss";

import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import NavLogo from "./navLogo/navLogo.jsx";

import ButtonWithContent from "@components/buttonWithContent/BUTTONWITHCONTENT.jsx";
import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";
import useSetActiveNavButton from "./hooks/useSetActiveNavButton.jsx";
import NavbarButtons from "./components/navBarButtons/navBarButtons.jsx";

const ShoppingCart = ({ cartItems }) => {
  const navigate = useNavigate();

  const totalItemsInCart = useMemo(() => cartItems(), [cartItems]);

  const navigateCart = () => {
    if (location.pathname !== "/cart") {
      navigate("./cart", {
        state: { backgroundLocation: location.pathname + location.search },
      });
    }
  };

  // Simple text related to shoppingcart. Text is static and will remain the same.
  const shoppingBagText = (
    <div className={classes.shoppingBagText}>
      <p className={`${classes.cartText} ${classes.whiteText}`}>View cart</p>
      <p className={classes.cartText}>View cart</p>
      <p className={`${classes.cartText} ${classes.whiteText}`}>View cart</p>
    </div>
  );

  const totalItemsInCartWrapper = totalItemsInCart > 0 && (
    <div className={classes.totalItemsInCartWrapper}>
      <p className={classes.text}>{totalItemsInCart}</p>
    </div>
  );

  // svg-wrapper
  const shoppingBagSvgWrapper = (
    <div className={classes.shoppingBagWrapper}>
      <ShoppingBagSVG />
    </div>
  );

  return (
    <div className={classes.shoppingCart} onClick={navigateCart}>
      {shoppingBagText}
      {shoppingBagSvgWrapper}
      {totalItemsInCartWrapper}
    </div>
  );
};

// a wrapper for each nav-button
const NavButton = ({ children, link }) => {
  const navigate = useNavigate();

  return (
    // on-click is applied to wrapper to isolate logic from buttonWithContent
    <div className={classes.button}>
      <ButtonWithContent onClick={() => navigate(link)} fontType={"h6"}>
        {children}
      </ButtonWithContent>
    </div>
  );
};

const Navbar = ({ cartItems }) => {
  const buttons = {
    home: "",
    gallery: "/gallery?page=1",
    contact: "./contact",
  };

  const {
    activeButton,
    setActiveButton,
    hoverButton,
    setHoverButton,
    loadTab,
  } = useSetActiveNavButton(buttons);

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
      <ShoppingCart cartItems={cartItems} />
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
