import classes from "./services.module.scss";
import wallImage from "@assets/wall.jpg";
import exampleImageOne from "@assets/frontPageMainImages/mainImageOne.jpg";
import exampleImageTwo from "@assets/frontPageMainImages/mainImageTwo.jpg";
import exampleImageThree from "@assets/frontPageMainImages/mainImageThree.jpg";
import { MainImageWrapperText } from "../mainpageImage/mainImage";
import TextThatCorrespondsToActiveImage from "@components/scrollText/scrollText";
import { useState } from "react";

const Services = () => {
  const [activeImage, setActiveImage] = useState(0);
  const texts = [
    "this is text one",
    "this is text two",
    "this is text three",
    "this is text three",
  ];

  const textsTitles = [
    "this is title one",
    "this is title two",
    "this is title three",
    "this is title four",
  ];

  return (
    <div className={classes.servicesContainer}>
      <section className={classes.leftSection}>
        <div className={classes.buttonsWrapper}>
          <MainImageWrapperText fontSize={35} setActiveImage={setActiveImage}>
            {[
              "Water collection",
              "Pastel collection",
              "Flower collection",
              "Summer collection",
            ]}
          </MainImageWrapperText>
        </div>
      </section>
      <section className={classes.rightSection}>
        <div className={classes.imageWrapper}>
          <img className={classes.image} src={wallImage} alt="" />
          <div className={`${classes.paintingWrapper} ${classes.one}`}>
            <img className={classes.paintImage} src={exampleImageOne} alt="" />
          </div>
          <div className={`${classes.paintingWrapper} ${classes.two}`}>
            <img className={classes.paintImage} src={exampleImageTwo} alt="" />
          </div>
          <div className={`${classes.paintingWrapper} ${classes.three}`}>
            <img
              className={classes.paintImage}
              src={exampleImageThree}
              alt=""
            />
          </div>
        </div>
        <div className={classes.rightScrollingText}>
          <div className={classes.scrollingTextTitle}>
            <TextThatCorrespondsToActiveImage
              texts={textsTitles}
              activeImage={activeImage}
            />
          </div>
          <div className={classes.scrollingTextBio}>
            <TextThatCorrespondsToActiveImage
              texts={texts}
              activeImage={activeImage}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
