import classes from "./loadingAnimation.module.scss";
import LoadingAnimation from "./loadingAnimation";

const LoadingWrapper = ({ onClick, condition }) => {
  return (
    <div
      className={classes.loading}
      style={{ visibility: condition ? "visible" : "hidden" }}
    >
      <div className={classes.loadingBackground} onClick={onClick}>
        <div className={classes.loadingWrapper}>
          <LoadingAnimation />
        </div>
      </div>
    </div>
  );
};

export default LoadingWrapper;
