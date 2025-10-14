import classes from "./uniqueTopSection.module.scss";
import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";
import ArrowNoBodySVG from "@components/SVGS/arrowNoBodySVG/arrowNoBodySVG";

import ButtonStyle from "../uniqueButton/uniqueButton.jsx";
import { storeData } from "../../../../routeContainer/routeContainer.jsx";

const ButtonsWrapper = ({ foundObject }) => {
  const { addToCart } = storeData();

  const handleCart = (item) => {
    addToCart(item);
  };

  const addToCartButtonWrapper = (
    <ButtonStyle
      text={"Add to cart"}
      onClick={() =>
        handleCart(
          foundObject /** foundObject is the currently displayed product which user is visiting */
        )
      }
    >
      <div className={classes.shoppingBagSVGWrapper}>
        <ShoppingBagSVG />
      </div>
    </ButtonStyle>
  );

  const scrollBottom = () => {
    window.scrollTo({
      top: window.innerHeight + 140,
      behavior: "smooth",
    });
  };

  const scrollDownButton = (
    <ButtonStyle text={"Info"} onClick={() => scrollBottom()}>
      <div className={classes.arrowSVGWrapper}>
        <ArrowNoBodySVG strokeWidth={1.5} />
      </div>
    </ButtonStyle>
  );

  return (
    <div className={classes.buttonsWrapper}>
      {addToCartButtonWrapper}
      {scrollDownButton}
    </div>
  );
};

// One big image that is showing you an example of the currently displayed art-piece
const TopImage = ({ image }) => {
  return (
    <div className={classes.topImage}>
      <img className={classes.topImageImage} src={image} alt="" />
    </div>
  );
};

// Text is split into 2 sections. This allows
// the text to transition 'un-evenly', giving a nicer
const UniqueTopSectionTitle = ({ titleInfo: { titleOne, titleTwo } }) => {
  const titleTextOne = (
    // Title one. Transitions first
    <div className={classes.uniqueLeftTitle}>
      <h1 className={`${classes.uniqueLeftTitleText} ${classes.first}`}>
        {titleOne}
      </h1>
    </div>
  );

  const titleTextTwo = (
    // Title two. Transitions second, is also positioned below.
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
const UniqueTopSectionBio = ({ textInfo: { bioTitle, bioText } }) => {
  const bioTextTitle = <p className={classes.bioTitle}>{bioTitle}</p>,
    bioTextBio = <p className={classes.bioText}>{bioText}</p>;

  return (
    <div className={classes.bioTextContainer}>
      <div className={classes.bioTextWrapper}>
        {bioTextTitle}
        {bioTextBio}
      </div>
    </div>
  );
};

const UniqueTopSection = ({ topImage, textInfo, titleInfo, foundObject }) => {
  const leftSectionWrapper = (
    <div className={classes.uniqueTopLeft}>
      <UniqueTopSectionTitle textInfo={textInfo} titleInfo={titleInfo} />
      <div className={classes.uniqueTopBottom}>
        <div className={classes.left}>
          <ButtonsWrapper foundObject={foundObject} />
        </div>
        <div className={classes.right}>
          <UniqueTopSectionBio textInfo={textInfo} />
        </div>
      </div>
    </div>
  );

  const rightSectionWrapper = (
    <div className={classes.uniqueTopRight}>
      <TopImage image={topImage} />
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
