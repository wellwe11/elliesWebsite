import classes from "./preview.module.scss";

import routeClasses from "../../routeContainer/routeContainer.module.scss";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

import ProductInfo from "./components/productInfo/productInfo.jsx";

import ArrowNoBodySVG from "@components/SVGS/arrowNoBodySVG/arrowNoBodySVG";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import bodyNoScroll from "@functions/bodyNoScroll";
import ExtendedProductInfo from "./components/extendedProductInfo/extendedProductInfo.jsx";

const ActiveImage = ({ productProps, activeImageIndex }) => {
  const {
    displayedDetails: { quickViewImages },
  } = productProps;

  return (
    <div className={classes.activeImageWrapper}>
      <img
        className={classes.activeImage}
        src={quickViewImages?.[activeImageIndex]}
        alt=""
      />
    </div>
  );
};

const Info = ({ productProps, activeImageIndex, setActiveImageIndex }) => {
  return (
    <div className={classes.infoWrapper}>
      <ProductInfo
        productProps={productProps}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />
    </div>
  );
};

// Element containing product-image and product-info
const DisplayProductContainer = ({ productProps }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0); // A list of other images related to currently viewed product which are clickable. Clicking one displays it to the side for user to inspect it as a bigger image

  return (
    <div className={classes.quickViewImageContainer}>
      <ActiveImage
        productProps={productProps}
        activeImageIndex={activeImageIndex}
      />
      <Info
        productProps={productProps}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />
    </div>
  );
};

const ExtendedInfo = ({ productProps }) => {
  // price, type, width, height, frame, description,
  const {
      all: {
        details: { price, type, height, width },
        setDescription,
      },
    } = productProps,
    props = { price, height, width, type },
    description = setDescription;

  return (
    <div className={classes.extendedInfo}>
      <ExtendedProductInfo props={props} description={description} />
    </div>
  );
};

const IsLoading = ({ isLoading }) => {
  const navigate = useNavigate(); // navigates to a backgroundLocation
  const { enableScroll } = bodyNoScroll();

  return (
    <div className={classes.quickViewImage}>
      <LoadingWrapper
        onClick={() => {
          enableScroll();
          navigate(-1);
        }}
        condition={isLoading}
      />
    </div>
  );
};

// Element containing QuickViewImage & QuickViewInfo, as well as a faded background.
// Will always be positonined fixed in middle of the screen.
const QuickViewImage = ({ productProps, isLoading }) => {
  if (isLoading) return <IsLoading isLoading={isLoading} />;

  // need to style and add functionality to add to cart button
  // create a image-view to display picture height (not real-height but something to show it somehow)
  // display frame that will used for image
  // display type of paper pershaps(if print or paper, they are different);

  return (
    <div className={classes.quickViewImage}>
      <div className={routeClasses.contentWrapper}>
        <DisplayProductContainer productProps={productProps} />
        <ExtendedInfo productProps={productProps} />
      </div>
    </div>
  );
};

export default QuickViewImage;
