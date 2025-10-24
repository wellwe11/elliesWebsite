import classes from "./mainPageTopPresentation.module.scss";

const MainPageTopPresentation = ({ mainImage }) => {
  return (
    <div className={classes.MainPageTopPresentation}>
      <div className={classes.imageWrapper}>
        <div className={classes.mainImageWrapper}>
          <img className={classes.mainImage} src={mainImage} alt={""} />
        </div>
      </div>
    </div>
  );
};

export default MainPageTopPresentation;
