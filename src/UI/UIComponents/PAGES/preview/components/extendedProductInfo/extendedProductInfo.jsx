import classes from "./extendedProductInfo.module.scss";
import previewClasses from "../../preview.module.scss";
import frameSizesImage from "@assets/sizeGuide.png";
import { capitalizeFirstLetter } from "../../../../../../abstract/functions/firstLetterCapital.js";

const DescriptionElement = ({ obj }) => {
  const key = obj[0].toUpperCase();
  const value = obj[1];

  const Text = ({ children }) => (
    <h6 className={`${classes.bioText} ${previewClasses.bioTypeText}`}>
      {children}
    </h6>
  );

  return (
    <div className={classes.elWrapper}>
      <Text>{key}</Text>
      <Text>{value}</Text>
    </div>
  );
};

const Description = ({ data }) => {
  return (
    <div className={classes.description}>
      <h5 className={`${classes.infoTitle} ${previewClasses.titleTypeText}`}>
        BIO
      </h5>

      <div className={classes.textWrapper}>
        <h6 className={`${classes.text} ${previewClasses.bioTypeText}`}>
          {data}
        </h6>
      </div>
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
      <h5 className={`${previewClasses.titleTypeText} ${classes.title}`}>
        FRAME
      </h5>
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
      <h5 className={`${previewClasses.titleTypeText} ${classes.infoTitle}`}>
        DETAILS
      </h5>
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
      <h5 className={`${previewClasses.titleTypeText} ${classes.guideTitle}`}>
        Guide
      </h5>
      <div className={classes.imageContainer}>
        <img className={classes.frameSizeImage} src={frameSizesImage} alt="" />
        <div className={classes.frameMeasurements} />
        <div className={classes.height}>
          <p className={classes.text}>
            <span className={classes.span}>
              {capitalizeFirstLetter(type)} h:{" "}
            </span>
            {height} cm
          </p>
        </div>
        <div className={classes.width}>
          <p className={classes.text}>
            <span className={classes.span}>
              {capitalizeFirstLetter(type)} w:{" "}
            </span>
            {width} cm
          </p>
        </div>
      </div>
    </div>
  );
};

const ExtendedProductInfo = ({ props, description }) => {
  return (
    <div className={classes.extendedProductInfo}>
      <div className={classes.extendedSectionOne}>
        <Info data={props} />
        <Frame />
        <Description data={description} />
      </div>
      <div className={classes.extendedSectionTwo}>
        <Guide description={props} />
      </div>
    </div>
  );
};

export default ExtendedProductInfo;
