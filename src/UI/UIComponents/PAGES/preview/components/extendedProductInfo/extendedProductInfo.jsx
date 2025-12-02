import classes from "./extendedProductInfo.module.scss";
import previewClasses from "../../preview.module.scss";

import frameSizesImage from "@assets/sizeGuide.png";

const DescriptionElement = ({ obj }) => {
  const key = obj[0];
  const value = obj[1];

  const Text = ({ children }) => (
    <li className={classes.elLi}>
      <span className={`${previewClasses.bioTypeText} ${classes.text}`}>
        {children}
      </span>
    </li>
  );

  return (
    <div className={classes.elWrapper}>
      <Text>{key}</Text>
      <Text>{value}</Text>
    </div>
  );
};

const List = ({ children, entries }) => {
  return (
    <li className={classes.list}>
      <span className={`${previewClasses.titleTypeText} ${classes.title}`}>
        {children}
      </span>
      {entries.map(([key, obj], index) => (
        <ul className={classes.entryBio}>
          <DescriptionElement obj={[key, obj]} key={index} />
        </ul>
      ))}
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
      <span className={`${previewClasses.titleTypeText} ${classes.guideTitle}`}>
        GUIDE
      </span>
      <div className={classes.imageContainer}>
        <img className={classes.frameSizeImage} src={frameSizesImage} alt="" />
        <div className={classes.frameMeasurements} />
        <div className={classes.height}>
          <li className={classes.text}>
            <span className={classes.span}>{type} h: </span>
            {height} cm
          </li>
        </div>
        <div className={classes.width}>
          <li className={classes.text}>
            <span className={classes.span}>{type} w: </span>
            {width} cm
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
      <div className={classes.extendedSectionOne}>
        <div className={classes.sticky}>
          <Info data={props} />
          <Frame />
        </div>
      </div>
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
