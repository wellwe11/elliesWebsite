import classes from "./footer.module.scss";
import screen_classes from "../../../abstract/components/WIDTHCONTAINER/SCREENCONTAINER.module.scss";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.navContent}>
        <h1 className={screen_classes.contentWrapper}>navbar</h1>
      </div>
    </div>
  );
};

export default Footer;
