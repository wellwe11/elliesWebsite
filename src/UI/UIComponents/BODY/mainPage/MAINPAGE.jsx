import classes from "./MAINPAGE.module.scss";
import ImageWithContent from "../../../../abstract/components/imageWithContent/IMAGE";

const MainPage = () => {
  return (
    <div className={classes.mainPage}>
      <ImageWithContent />
    </div>
  );
};

export default MainPage;
