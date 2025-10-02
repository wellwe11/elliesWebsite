import classes from "./navigationButtons.module.scss";
import { useEffect, useState } from "react";

// Two buttons which controls
const NavigationButtons = ({
  setMarginLeft,
  setPrevMarginLeft,
  buttonLimit = 10,
}) => {
  const [canNavigate, setCanNavigate] = useState(true);

  // Moves images right
  const handleRightClick = () => {
    // canNavigate is a 'cooldown' which forces delay between navigation
    if (canNavigate) {
      setCanNavigate(false);

      setMarginLeft((prev) => {
        setPrevMarginLeft(prev);
        // -10 because images move based on %. So, 1 = 10%, and 100 = 100%. Like so, no need to know how many images are in array
        if (prev - 1 > -buttonLimit) {
          // if prev is within boundaries
          return prev - 1;
        } else {
          // returns array to start after a transition delay - adds illusion that carousel is infinite
          setTimeout(() => {
            setMarginLeft(0);
          }, 500);
          return prev - 1;
        }
      });
    }
  };

  // Moves images left
  const handleLeftClick = () => {
    // forces delay between navigation
    if (canNavigate) {
      setCanNavigate(false);

      setMarginLeft((prev) => {
        setPrevMarginLeft(prev);
        // 10 because images move based on %. So, 1 = 10%, and 100 = 100%. Like so, no need to know how many images are in array
        if (prev + 1 < buttonLimit) {
          // if prev is within boundaries
          return prev + 1;
        } else {
          // returns array to start after a transition delay - adds illusion that carousel is infinite
          setTimeout(() => {
            setMarginLeft(0);
          }, 500);
          return prev + 1;
        }
      });
    }
  };

  // acts as a delay to allow for a transition to be fully applied
  // this works as a 'safeguard' preventing spam-scrolling, so that
  // the images appears as infinite
  useEffect(() => {
    const timer = setTimeout(() => {
      setCanNavigate(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [canNavigate]);

  // navigate left
  const leftClickButton = (
    <div className={`${classes.navigationButtonWrapper} ${classes.left}`}>
      <button className={classes.navigationButton} onClick={handleLeftClick}>
        <h3 className={classes.buttonArrow}>←</h3>
      </button>
    </div>
  );

  // navigate right
  const rightClickButton = (
    <div className={`${classes.navigationButtonWrapper} ${classes.right}`}>
      <button className={classes.navigationButton} onClick={handleRightClick}>
        <h3 className={classes.buttonArrow}>→</h3>
      </button>
    </div>
  );

  return (
    <div className={classes.navigationButtonsContainer}>
      {leftClickButton}
      {rightClickButton}
    </div>
  );
};

export default NavigationButtons;
