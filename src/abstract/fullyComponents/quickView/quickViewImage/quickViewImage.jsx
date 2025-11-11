import classes from "./quickViewImage.module.scss";

import { useMemo, useState } from "react";

import ArrowNoBodySVG from "@components/SVGS/arrowNoBodySVG/arrowNoBodySVG";

import { useNavigate } from "react-router-dom";

import bodyNoScroll from "@functions/bodyNoScroll";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";

import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";

// Product will have a short description and this button is a boolean to display it or to hide the description
const ProductDescription = ({ infoDetails }) => {
  const infoEntries = Object.entries(infoDetails);

  const valueTypeChecker = (val) => {
    if (typeof val === "object" && typeof val !== "function" && val !== null) {
      return "reference";
    } else {
      return "primitive";
    }
  };

  const EntryValue = ({ value }) => {
    const result = valueTypeChecker(value);

    if (result === "reference") {
      return value.map((v) => (
        <div className={classes.ref} style={{ backgroundColor: v }} />
      ));
    }

    if (result === "primitive") {
      return (
        <h1 className={`${classes.titleTypeText} ${classes.value}`}>{value}</h1>
      );
    }
  };

  const entryTitle = infoEntries.map(([entry, obj], index) => {
    const capitalEntry = capitalizeFirstLetter(entry);

    return (
      <div
        className={classes.entryContainer}
        key={index}
        style={{ width: `calc(${100 / infoEntries.length}%)` }}
      >
        <div className={classes.refContainer}>{<EntryValue value={obj} />}</div>
        <p className={classes.bioTypeText}>{capitalEntry}</p>
      </div>
    );
  });

  return (
    <div className={classes.productDescription}>
      <div className={classes.info}>{entryTitle}</div>
    </div>
  );
};

// Element containing information & further info about the product, such as other images, price, name, description
const ProductInfo = ({
  productProps: {
    displayedDetails: { title = "Title", price = 19.99, type, quickViewImages },
    all,
    infoDetails,
  },
  activeImageIndex,
  setActiveImageIndex,
}) => {
  const infoProductTitle = (
    // which product is currently displayed
    <div className={classes.info}>
      <h1 className={classes.titleTypeText}>{title}</h1>
    </div>
  );

  const infoType = (
    <div className={classes.bioTypeText}>
      <h6>{capitalizeFirstLetter(type)}</h6>
    </div>
  );

  const allImagesRelatedToQuickViewImage = useMemo(
    () => (
      // a set of smaller images related to product. This handles the activeImageIndex
      <div className={classes.allImagesExamples}>
        {quickViewImages?.map((image, index) => (
          <div
            className={classes.borderContainer}
            style={{
              border:
                activeImageIndex === index
                  ? "1px solid gray"
                  : "1px solid white",
            }}
          >
            <img
              key={index}
              className={classes.imageExample}
              src={image}
              alt=""
              onClick={() => {
                setActiveImageIndex(index);
              }}
            />
          </div>
        ))}
      </div>
    ),
    [quickViewImages, setActiveImageIndex, activeImageIndex]
  );

  const currentlySelectedProduct = (
    // currently only displayed index of active allImagesRelatedToQuickViewImage. In future, will have some bio-info
    <div className={classes.bioTypeText}>
      <h6>Product: {activeImageIndex}</h6>
    </div>
  );

  return (
    <div className={classes.infoSection}>
      <div className={classes.productTitleAndBioWrapper}>
        {infoProductTitle}
        {infoType}
        <div className={classes.paddingTop4}>
          {currentlySelectedProduct}
          {allImagesRelatedToQuickViewImage}
        </div>
      </div>

      <ProductDescription all={all} infoDetails={infoDetails} />
    </div>
  );
};

// Element containing product-image and product-info
const DisplayProductContainer = ({ productProps }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0); // A list of other images related to currently viewed product which are clickable. Clicking one displays it to the side for user to inspect it as a bigger image

  const {
    displayedDetails: { quickViewImages },
  } = productProps;

  return (
    <div className={classes.quickViewImageContainer}>
      <div className={classes.activeImageWrapper}>
        <img
          className={classes.activeImage}
          src={quickViewImages?.[activeImageIndex]}
          alt=""
        />
      </div>
      <div className={classes.infoWrapper}>
        <ProductInfo
          productProps={productProps}
          activeImageIndex={activeImageIndex}
          setActiveImageIndex={setActiveImageIndex}
        />
      </div>
    </div>
  );
};

// Element containing QuickViewImage & QuickViewInfo, as well as a faded background.
// Will always be positonined fixed in middle of the screen.
const QuickViewImage = ({ productProps, isLoading }) => {
  const navigate = useNavigate(); // navigates to a backgroundLocation

  const { enableScroll } = bodyNoScroll();

  if (isLoading)
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

  return (
    <>
      <div className={classes.quickViewImage}>
        <DisplayProductContainer productProps={productProps} />
      </div>
    </>
  );
};

export default QuickViewImage;
