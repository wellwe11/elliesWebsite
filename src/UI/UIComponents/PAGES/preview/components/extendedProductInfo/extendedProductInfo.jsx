import classes from "./extendedProductInfo.module.scss";
import previewClasses from "../../preview.module.scss";

import frameSizesImage from "@assets/sizeGuide.png";

const List = ({ children, entries }) => {
  return (
    <li className={classes.elWrapper}>
      <span className={`${previewClasses.titleTypeText} ${classes.title}`}>
        {children}
      </span>
      <ul>
        {entries.map(([key, obj], index) => (
          <li className={classes.entry} key={index}>
            {key}
            <span className={classes.value}>{obj}</span>
          </li>
        ))}
      </ul>
    </li>
  );
};

const Frame = ({ data }) => {
  const frameInfo = data?.frame || {
    color: "black",
    type: "wooden",
    width: 10,
  };

  const entries = Object.entries(frameInfo);

  return <List entries={entries}>FRAME</List>;
};

const Info = ({ data }) => {
  const entries = Object.entries(data);

  return <List entries={entries}>DETAILS</List>;
};

const Guide = ({ description }) => {
  const { height, width, type } = description;

  return (
    <div className={classes.guide}>
      <span className={`${previewClasses.titleTypeText} ${classes.title}`}>
        GUIDE
      </span>
      <div className={classes.imageContainer}>
        <img className={classes.frameSizeImage} src={frameSizesImage} alt="" />
        <div className={classes.frameMeasurements} />
        <div className={classes.height}>
          <li className={classes.elLi}>
            <span className={classes.text}>{type} h: </span>
            <span className={classes.text}>{height}</span>
          </li>
        </div>
        <div className={classes.width}>
          <li className={classes.elLi}>
            <span className={classes.text}>{type} w: </span>
            <span className={classes.text}>{width}</span>
          </li>
        </div>
      </div>
    </div>
  );
};

const Images = ({ images }) => {
  return (
    <div className={classes.imagesContainer}>
      {images.map((img, index) => (
        <div key={index} className={classes.imageWrapper}>
          <img src={img} alt="" />
        </div>
      ))}
    </div>
  );
};

const InitialImage = ({ image }) => {
  return (
    <div className={classes.imageWrapper}>
      <img src={image} alt="" />
    </div>
  );
};

const SecondImage = ({ image }) => {
  return (
    <div className={classes.imageWrapper}>
      <img src={image} alt="" />
    </div>
  );
};

const ExtendedProductInfo = ({ props, images }) => {
  const initialImage = images[0];
  const secondImage = images[1];
  const restImages = images.slice(2);
  return (
    <div className={classes.extendedProductInfo}>
      <ul className={classes.extendedSectionOne}>
        <div className={classes.sticky}>
          <Info data={props} />
          <Frame />
        </div>
      </ul>
      <div
        className={`${classes.extendedImages} ${classes.initialImageWrapper}`}
      >
        <InitialImage image={initialImage} />
      </div>
      <div className={classes.extendedSectionTwo}>
        <div className={classes.sticky}>
          <Guide description={props} />
        </div>
      </div>

      <div
        className={`${classes.extendedImages} ${classes.secondImageWrapper}`}
      >
        <SecondImage image={secondImage} />
      </div>

      <div className={`${classes.extendedImages} ${classes.restImagesWrapper}`}>
        <Images images={restImages} />
      </div>
    </div>
  );
};

export default ExtendedProductInfo;
