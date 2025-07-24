import classes from "./mainpageImageTwo.module.scss";

import imageExampleOne from "@assets/imageOnWallPlaceholderRepresentation.png";
import imageExampleTwo from "@assets/imageOnWallPlaceholderRepresentationTwo.png";
import { useState } from "react";

const MainPageImageTwo = () => {
  return (
    <div className={classes.MainPageImageTwo}>
      <div className={classes.imagesContainer}>
        <img className={classes.imageExample} src={imageExampleOne} alt="" />
      </div>
    </div>
  );
};

export default MainPageImageTwo;
