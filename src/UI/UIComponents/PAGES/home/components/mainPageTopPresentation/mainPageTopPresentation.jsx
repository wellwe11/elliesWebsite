import classes from "./mainPageTopPresentation.module.scss";

const MainPageTopPresentation = ({ mainImage }) => {
  // a small animation which is displayed once you load the front-page

  // a background-image which is displayed on top of the front-page
  const mainPageImage = (
    <div className={classes.mainImageWrapper}>
      <img className={classes.mainImage} src={mainImage} alt={""} />
    </div>
  );

  return (
    <div className={classes.MainPageTopPresentation}>
      <div className={classes.imageWrapper}>{mainPageImage}</div>
    </div>
  );
};

export default MainPageTopPresentation;
