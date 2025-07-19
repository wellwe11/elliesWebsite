import Footer from "../../../UI/UIComponents/FOOTER/footer";
import Navbar from "../../../UI/UIComponents/NAVBAR/navbar";
import classes from "./SCREENCONTAINER.module.scss";

const ScreenContainer = ({ children }) => {
  return (
    <div className={classes.widthContainer}>
      <Navbar />
      <div className={classes.contentWrapper}>{children}</div>
      <Footer />
    </div>
  );
};

export default ScreenContainer;
