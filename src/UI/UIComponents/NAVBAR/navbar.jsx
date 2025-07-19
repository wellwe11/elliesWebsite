import classes from "./navbar.module.scss";
import screen_classes from "../screenContainer/SCREENCONTAINER.module.scss";
import ButtonWithContent from "../../../abstract/components/buttonWithContent/BUTTONWITHCONTENT.jsx";

const NavbarButtons = () => {
  return (
    <div className={classes.buttonsWrapper}>
      <ButtonWithContent link={"/"}>Home</ButtonWithContent>
      <ButtonWithContent link={"/Hello"}>Hello</ButtonWithContent>
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
