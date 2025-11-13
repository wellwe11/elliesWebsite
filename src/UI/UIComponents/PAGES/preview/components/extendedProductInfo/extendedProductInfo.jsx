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
      <h3 className={`${classes.infoTitle} ${previewClasses.titleTypeText}`}>
        BIO
      </h3>

      <div className={classes.textWrapper}>
        <h6 className={`${classes.text} ${previewClasses.bioTypeText}`}>
          {data}
        </h6>
      </div>
    </div>
  );
};

const Info = ({ data }) => {
  const entries = Object.entries(data);

  return (
    <div className={classes.infoWrapper}>
      <h3 className={`${previewClasses.titleTypeText} ${classes.infoTitle}`}>
        DETAILS
      </h3>
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
      <h3 className={`${previewClasses.titleTypeText} ${classes.guideTitle}`}>
        Guide
      </h3>
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
        <Description data={description} />
      </div>
      <div className={classes.extendedSectionTwo}>
        <Guide description={props} />
      </div>
    </div>
  );
};

export default ExtendedProductInfo;
