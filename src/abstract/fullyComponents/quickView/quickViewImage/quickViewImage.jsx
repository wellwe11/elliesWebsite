import classes from "./quickViewImage.module.scss";

import { useMemo, useState } from "react";

import ArrowNoBodySVG from "@components/SVGS/arrowNoBodySVG/arrowNoBodySVG";

import { useNavigate } from "react-router-dom";
import QuickViewButton from "../quickViewButton/quickViewButton";
import bodyNoScroll from "@functions/bodyNoScroll";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import useGetParams from "@hooks/useGetParams.jsx";
import { capitalizeFirstLetter } from "../../../functions/firstLetterCapital.js";

// If you want to view the actual product, this button takes you to a new page which contains further information and such
const ViewProductButton = () => {
  const navigate = useNavigate(); // navigates to a backgroundLocation

  const { category, id } = useGetParams();

  return (
    <div className={classes.viewProductButtonWrapper}>
      <QuickViewButton
        text={<h6 className={classes.buttonText}>Explore item</h6>}
        onClick={() => {
          navigate(`/uniqueImage?category=${category}&id=${id}`);
          bodyNoScroll().enableScroll();
        }}
      />
    </div>
  );
};

// Product will have a short description and this button is a boolean to display it or to hide the description
const ProductDescription = ({ bio, infoDetails }) => {
  const [viewDescription, setViewDescription] = useState(true);

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
      return <h3 className={classes.value}>{value}</h3>;
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
        <p className={classes.entry}>{capitalEntry}</p>
      </div>
    );
  });

  const expandDescriptionButton = (
    // actual button which is always displayed
    <button
      className={classes.buttonDescriptionButton}
      onClick={() => setViewDescription(!viewDescription)}
    >
      <h5 className={classes.buttonDescriptionButtonText}>
        Description
        <div
          className={`${classes.descriptionSvgContainer} ${
            viewDescription ? classes.arrowFaceIn : ""
          }`}
        >
          <ArrowNoBodySVG />
        </div>
      </h5>
    </button>
  );

  const expandDescriptionText = (
    // text which will be hidden or displayed depending on expandDescriptionButton
    <div
      className={`${classes.descriptionWrapper} ${
        viewDescription ? classes.open : classes.closed
      }`}
    >
      <p
        className={`${classes.descriptionText} ${
          viewDescription ? classes.open : classes.closed
        }`}
      >
        {bio}
      </p>
    </div>
  );

  return (
    <div className={classes.productDescription}>
      {/* {expandDescriptionButton} */}
      {/* {expandDescriptionText} */}
      <div className={classes.info}>{entryTitle}</div>
    </div>
  );
};

// Element containing information & further info about the product, such as other images, price, name, description
const ProductInfo = ({
  infoDetails: { title = "Title", price = 19.99, bio, quickViewImages, all },
  activeImageIndex,
  setActiveImageIndex,
  infoDetails,
}) => {
  const infoProductTitle = (
    // which product is currently displayed
    <div className={classes.info}>
      <h5>{title}</h5>
    </div>
  );

  const infoProductPrice = (
    // products price
    <div className={classes.price}>
      <h6>{price}$</h6>
    </div>
  );

  const allImagesRelatedToQuickViewImage = useMemo(
    () => (
      // a set of smaller images related to product. This handles the activeImageIndex
      <div className={classes.allImagesExamples}>
        {quickViewImages?.map((image, index) => (
          <img
            key={index}
            className={classes.imageExample}
            src={image}
            alt=""
            onClick={() => {
              setActiveImageIndex(index);
            }}
          />
        ))}
      </div>
    ),
    [quickViewImages, setActiveImageIndex]
  );

  const currentImageBioText = (
    // currently only displayed index of active allImagesRelatedToQuickViewImage. In future, will have some bio-info
    <div className={classes.currentImageBioText}>
      <p>Currently selected product: {activeImageIndex}</p>
    </div>
  );

  return (
    <div className={classes.infoSection}>
      <div className={classes.productTitleAndPriceWrapper}>
        {infoProductTitle}
        {infoProductPrice}
      </div>
      <div>
        {currentImageBioText}
        {allImagesRelatedToQuickViewImage}
      </div>
      <ProductDescription bio={bio} all={all} infoDetails={infoDetails} />
    </div>
  );
};

// Element containing product-image and product-info
const DisplayProductContainer = ({ productProps, infoDetails }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0); // A list of other images related to currently viewed product which are clickable. Clicking one displays it to the side for user to inspect it as a bigger image

  const { quickViewImages } = productProps;

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
          infoDetails={infoDetails}
        />
        <ViewProductButton />
      </div>
    </div>
  );
};

// Element containing QuickViewImage & QuickViewInfo, as well as a faded background.
// Will always be positonined fixed in middle of the screen.
const QuickViewImage = ({ productProps, isLoading, infoDetails }) => {
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

  const WhiteBackgroundPopUp = (
    // white background-image that differs pop-up from the rest of the website
    <div
      className={classes.quickViewBackground}
      // If you click on the white background it will close current quick-view window
      onClick={() => {
        bodyNoScroll().enableScroll();
        navigate(-1);
      }} // navigates pages -1; previous page.
    />
  );

  return (
    <>
      <div
        className={classes.quickViewImage}
        style={{ opacity: productProps ? 1 : 0 }}
      >
        {WhiteBackgroundPopUp}
        <DisplayProductContainer
          productProps={productProps}
          infoDetails={infoDetails}
        />
      </div>
    </>
  );
};

export default QuickViewImage;
