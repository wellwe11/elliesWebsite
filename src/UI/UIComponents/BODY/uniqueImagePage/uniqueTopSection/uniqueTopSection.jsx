import classes from "./uniqueTopSection.module.scss";

import placeholderImageThree from "@assets/exampleImages/imageExampleThree.jpg";

const TopImage = ({ images }) => {
  const placeHolderImage = images.imageThree;
  return (
    <div className={classes.topImage}>
      <img
        className={classes.topImageImage}
        src={placeHolderImage || placeholderImageThree || []}
        alt=""
      />
    </div>
  );
};

const UniqueTopSectionTitle = ({ textInfo }) => {
  const titleOne = textInfo.title.title;
  const titleTwo = textInfo.title.bio;

  return (
    <div className={classes.uniqueLeftTitleWrapper}>
      <div className={classes.uniqueLeftTitle}>
        <h1 className={`${classes.uniqueLeftTitleText} ${classes.first}`}>
          {titleOne}
        </h1>
      </div>
      <div className={classes.uniqueLeftTitle}>
        <h1 className={`${classes.uniqueLeftTitleText} ${classes.second}`}>
          {titleTwo}
        </h1>
      </div>
    </div>
  );
};

const UniqueTopSectionBio = ({ textInfo }) => {
  const bioTitle = textInfo.bio.title;
  const bioText = textInfo.bio.bio;

  return (
    <div className={classes.bioTextContainer}>
      <div className={classes.bioTextWrapper}>
        <h5 className={classes.bioTitle}>{bioTitle}</h5>
        <h5 className={classes.bioText}>{bioText}</h5>
      </div>
    </div>
  );
};

const UniqueTopSection = ({ images, textInfo }) => {
  return (
    <div className={classes.uniqueTopSection}>
      <div className={classes.uniqueTopLeft}>
        <UniqueTopSectionTitle textInfo={textInfo} />
        <UniqueTopSectionBio textInfo={textInfo} />
      </div>
      <div className={classes.uniqueTopRight}>
        <TopImage images={images} />
      </div>
    </div>
  );
};
export default UniqueTopSection;
