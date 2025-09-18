import classes from "./loadingAnimation.module.scss";
import LoadingAnimation from "./loadingAnimation";
import { useEffect } from "react";
import bodyNoScroll from "@functions/bodyNoScroll";

const LoadingWrapper = ({ onClick, condition }) => {
  useEffect(() => {
    const { disableScroll, enableScroll } = bodyNoScroll();

    if (condition) disableScroll();
    if (!condition) enableScroll();
  }, [condition]);

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
