import classes from "./uniqueTopSection.module.scss";
import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";
import ArrowNoBodySVG from "@components/SVGS/arrowNoBodySVG/arrowNoBodySVG";
import { useContext } from "react";
import cartContext from "../../cartContext";

const ButtonsWrapper = ({ foundObject }) => {
  const { cart, setCart } = useContext(cartContext);

  // button sharing same classes and structure
  const ButtonStyle = ({ text, children, fontType = "h6", onClick }) => {
    const FontType = fontType;
    return (
      <button className={classes.button} onClick={onClick}>
        <div className={classes.textWrapper}>
          {children}
          <FontType className={classes.text}>{text}</FontType>
        </div>
      </button>
    );
  };

  const scrollBottom = () => {
    window.scrollTo({
      top: window.innerHeight + 140,
      behavior: "smooth",
    });
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const addToCartButtonWrapper = (
    <ButtonStyle text={"Add to cart"} onClick={() => addToCart(foundObject)}>
      <div className={classes.shoppingBagSVGWrapper}>
        <ShoppingBagSVG />
      </div>
    </ButtonStyle>
  );

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
const UniqueTopSectionBio = ({ textInfo: { bioTitle, bioText } }) => {
  const bioTextTitle = <p className={classes.bioTitle}>{bioTitle}</p>;

  // bio. Some catchy text
  const bioTextBio = <p className={classes.bioText}>{bioText}</p>;

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
