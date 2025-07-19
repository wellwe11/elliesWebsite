import classes from "./footer.module.scss";
import screen_classes from "../screenContainer/SCREENCONTAINER.module.scss";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.navContent}>
        <h1 className={screen_classes.contentWrapper}>footer</h1>
      </div>
    </div>
  );
};

export default Footer;
