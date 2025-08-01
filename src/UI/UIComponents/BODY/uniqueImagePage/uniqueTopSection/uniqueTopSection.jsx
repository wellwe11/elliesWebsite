import classes from "./uniqueTopSection.module.scss";
import placeholderImageThree from "@assets/exampleImages/imageExampleThree.jpg";

// One big image that is showing you an example of the currently displayed art-piece
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

// Text is split into 2 sections. This allows
// the text to transition 'un-evenly', giving a nicer
const UniqueTopSectionTitle = ({ textInfo }) => {
  // transition-effect.
  const titleOne = textInfo.title.title;
  const titleTwo = textInfo.title.bio;

  // Title one. Transitions first
  const titleTextOne = (
    <div className={classes.uniqueLeftTitle}>
      <h1 className={`${classes.uniqueLeftTitleText} ${classes.first}`}>
        {titleOne}
      </h1>
    </div>
  );

  // Title two. Transitions second, is also positioned below.
  const titleTextTwo = (
    <div className={classes.uniqueLeftTitle}>
      <h1 className={`${classes.uniqueLeftTitleText} ${classes.second}`}>
        {titleTwo}
      </h1>
    </div>
  );

  return (
    <div className={classes.uniqueLeftTitleWrapper}>
      {titleTextOne}
      {titleTextTwo}
    </div>
  );
};

// A small container of text containing some bio about the collection
// title. Example: "Elegant red-rose collection"
const UniqueTopSectionBio = ({ textInfo }) => {
  const bioTitle = textInfo.bio.title;
  const bioTextTitle = <h5 className={classes.bioTitle}>{bioTitle}</h5>;

  // bio. Some catchy text
  const bioText = textInfo.bio.bio;
  const bioTextBio = <h5 className={classes.bioText}>{bioText}</h5>;

  return (
    <div className={classes.bioTextContainer}>
      <div className={classes.bioTextWrapper}>
        {bioTextTitle}
        {bioTextBio}
      </div>
    </div>
  );
};

const UniqueTopSection = ({ images, textInfo }) => {
  const leftSectionWrapper = (
    <div className={classes.uniqueTopLeft}>
      <UniqueTopSectionTitle textInfo={textInfo} />
      <UniqueTopSectionBio textInfo={textInfo} />
    </div>
  );

  const rightSectionWrapper = (
    <div className={classes.uniqueTopRight}>
      <TopImage images={images} />
    </div>
  );

  return (
    <div className={classes.uniqueTopSection}>
      {leftSectionWrapper}
      {rightSectionWrapper}
    </div>
  );
};

export default UniqueTopSection;
