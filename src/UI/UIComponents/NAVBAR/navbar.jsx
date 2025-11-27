import classes from "./navbar.module.scss";

// importing screen-sizings to help navbar scale with body
import screen_classes from "../routeContainer/routeContainer.module.scss";

import useSetActiveNavButton from "./hooks/useSetActiveNavButton.jsx";

import NavLogo from "./components/navLogo/navLogo.jsx";
import NavbarButtons from "./components/navBarButtons/navBarButtons.jsx";
import ShoppingCart from "./components/shoppingCart/shoppingCart.jsx";

const Navbar = ({ setDisplayShoppingCart }) => {
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

  if (!loadTab) return <div />;

  return (
    <div className={classes.navbar}>
      <div className={classes.navContent}>
        <div
          className={`${screen_classes.contentWrapper} ${classes.navWrapper}`}
        >
          <div className={classes.navLogoWrapper}>
            <NavLogo
              setActiveButton={setActiveButton}
              setHoverButton={setHoverButton}
            />
          </div>
          <div className={classes.navButtonsWrapper}>
            <NavbarButtons
              buttons={buttons}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              hoverButton={hoverButton}
              setHoverButton={setHoverButton}
            />
          </div>
          <div className={classes.shoppingCartWrapper}>
            <ShoppingCart setDisplayShoppingCart={setDisplayShoppingCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
