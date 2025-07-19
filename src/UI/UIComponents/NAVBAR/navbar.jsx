import classes from "./navbar.module.scss";
import screen_classes from "../../../abstract/components/WIDTHCONTAINER/SCREENCONTAINER.module.scss";

const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div className={classes.navContent}>
        <h1 className={screen_classes.contentWrapper}>navbar</h1>
      </div>
    </div>
  );
};

export default Navbar;
