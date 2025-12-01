import classes from "./extendedProductInfo.module.scss";
import previewClasses from "../../preview.module.scss";

import frameSizesImage from "@assets/sizeGuide.png";

const DescriptionElement = ({ obj }) => {
  const key = obj[0];
  const value = obj[1];

  const Text = ({ children }) => (
    <p className={`${classes.bioText} ${previewClasses.bioTypeText}`}>
      {children}
    </p>
  );

  return (
    <div className={classes.elWrapper}>
      <Text>{key}</Text>
      <Text>{value}</Text>
    </div>
  );
};

const Frame = ({ data }) => {
  const frameInfo = data?.frame || {
    color: "black",
    type: "wooden",
    width: 10,
  };

  const entries = Object.entries(frameInfo);

  return (
    <div className={classes.frame}>
      <p className={`${previewClasses.titleTypeText} ${classes.title}`}>
        FRAME
      </p>
      {entries.map(([key, obj], index) => (
        <DescriptionElement obj={[key, obj]} key={index} />
      ))}
    </div>
  );
};

const Info = ({ data }) => {
  const entries = Object.entries(data);

  return (
    <div className={classes.info}>
      <p className={`${previewClasses.titleTypeText} ${classes.infoTitle}`}>
        DETAILS
      </p>
      {entries.map(([key, obj], index) => (
        <DescriptionElement obj={[key, obj]} key={index} />
      ))}
    </div>
  );
};

const Guide = ({ description }) => {
  const { height, width, type } = description;

  return (
    <div className={classes.guide}>
      <p className={`${previewClasses.titleTypeText} ${classes.guideTitle}`}>
        GUIDE
      </p>
      <div className={classes.imageContainer}>
        <img className={classes.frameSizeImage} src={frameSizesImage} alt="" />
        <div className={classes.frameMeasurements} />
        <div className={classes.height}>
          <p className={classes.text}>
            <span className={classes.span}>{type} h: </span>
            {height} cm
          </p>
        </div>
        <div className={classes.width}>
          <p className={classes.text}>
            <span className={classes.span}>{type} w: </span>
            {width} cm
          </p>
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
