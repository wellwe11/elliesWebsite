import classes from "./quickViewImage.module.scss";
import { useEffect, useState } from "react";

import ArrowNoBodySVG from "@components/SVGS/arrowNoBodySVG/arrowNoBodySVG";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import QuickViewButton from "../quickViewButton/quickViewButton";
import bodyNoScroll from "@functions/bodyNoScroll";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";

// If you want to view the actual product, this button takes you to a new page which contains further information and such
const ViewProductButton = () => {
  // navigates to a backgroundLocation
  const navigate = useNavigate();
  const params = useParams();
  const { hash } = useLocation();

  // gets correct object type & info to find the correct object
  const tabType = params?.type;
  const productId = +hash.replace(/\D/g, ""); // current page;

  return (
    <div className={classes.viewProductButtonWrapper}>
      <QuickViewButton
        text={<h5 className={classes.buttonText}>Explore item</h5>}
        onClick={() => {
          navigate(`/uniqueImage/${tabType}#${productId}`);
          bodyNoScroll().enableScroll();
        }}
      />
    </div>
  );
};

// Product will have a short description and this button is a boolean to display it or to hide the description
const ProductDescription = ({ bio }) => {
  const [viewDescription, setViewDescription] = useState(true);

  // actual button which is always displayed
  const expandDescriptionButton = (
    <div
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
    </div>
  );

  // text which will be hidden or displayed depending on expandDescriptionButton
  const expandDescriptionText = (
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
      {expandDescriptionButton}
      {expandDescriptionText}
      <ViewProductButton />
    </div>
  );
};

// Element containing information & further info about the product, such as other images, price, name, description
const QuickViewInfo = ({
  quickViewProps: { title = "Title", price = 20, bio, quickViewImages },
  activeImageIndex,
  setActiveImageIndex,
}) => {
  // which product is currently displayed
  const infoProductTitle = (
    <div className={classes.info}>
      <h5>{title}</h5>
    </div>
  );

  // products price
  const infoProductPrice = (
    <div className={classes.price}>
      <h6>{price}$</h6>
    </div>
  );

  // a set of smaller images related to product. This handles the activeImageIndex
  const allImagesRelatedToQuickViewImage = (
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
  );

  // currently only displayed index of active allImagesRelatedToQuickViewImage. In future, will have some bio-info
  const currentImageBioText = (
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
      <ProductDescription bio={bio} />
    </div>
  );
};

// Element containing product-image and product-info
const QuickViewImageContainer = ({ quickViewProps }) => {
  // A list of other images related to currently viewed product which are clickable. Clicking one displays it to the side for user to inspect it as a bigger image
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // destructure to access images for currentActiveImage
  const { quickViewImages } = quickViewProps;
  // currentActiveImage is the image which you initially clicked on quickView. It can be changed by clicking then related images (set of smaller images displayed in quickViewInfo)
  const currentActiveImage = (
    <div className={classes.activeImageWrapper}>
      <img
        className={classes.activeImage}
        src={quickViewImages?.[activeImageIndex]}
        alt=""
      />
    </div>
  );

  return (
    <div className={classes.quickViewImageContainer}>
      {currentActiveImage}
      <QuickViewInfo
        quickViewProps={quickViewProps}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />
    </div>
  );
};

// Element containing QuickViewImage & QuickViewInfo, as well as a faded background.
// Will always be positonined fixed in middle of the screen.
const QuickViewImage = ({ data }) => {
  // Object which will be displayed ocne user clicks quickview
  const [quickViewObj, setQuickViewObj] = useState(null);

  // navigates to a backgroundLocation
  const navigate = useNavigate();
  const params = useParams();
  const { hash } = useLocation();

  // gets correct object type & info to find the correct object
  const tabType = params?.type;
  const productId = +hash.replace(/\D/g, ""); // current page;

  useEffect(() => {
    if (quickViewObj) bodyNoScroll().disableScroll(); // disables scroll while quickview is active
  }, [quickViewObj]);

  useEffect(() => {
    if (!data) return;

    // finds matching obj
    const foundObj = data[tabType].find((a) => +a.id === productId);

    // tries to find obj quickly
    const timerOne = setTimeout(() => {
      if (foundObj) {
        setQuickViewObj(foundObj);
      }
    }, 1500);

    // if not found, spends more time
    if (!quickViewObj) {
      const timerTwo = setTimeout(() => {
        const timerThree = setTimeout(() => {
          if (foundObj) {
            setQuickViewObj(foundObj);
          }
        }, 1500);

        return () => clearTimeout(timerThree);
      }, 6000);

      return () => clearTimeout(timerTwo);
    }

    // if no item is found by 10 seconds, navigates to error-page (which will be made specifically for not finding products in future)
    const timerFour = setTimeout(() => {
      if (!foundObj) navigate("/Error");
    }, 10000);

    return () => {
      clearTimeout(timerOne);
      clearTimeout(timerFour);
    };
  }, [data]);

  // white background-image that differs pop-up from the rest of the website
  const WhiteBackgroundPopUp = (
    <div
      className={classes.quickViewBackground}
      // If you click on the white background it will close current quick-view window
      onClick={() => {
        bodyNoScroll().enableScroll();
        navigate(-1);
      }} // navigates pages -1; previous page.
    />
  );

  const uniqueViewEmbedded = quickViewObj?._embedded;

  const quickViewProps = {
    quickViewImages: uniqueViewEmbedded?.restImages,
    title: uniqueViewEmbedded?.setTitle,
    price: uniqueViewEmbedded?.details.price,
    bio: uniqueViewEmbedded?.setDescription,
  };

  return (
    <>
      <div className={classes.quickViewImage} key={quickViewObj?.id}>
        <LoadingWrapper
          onClick={() => {
            bodyNoScroll().enableScroll();
            navigate(-1);
          }}
          condition={!quickViewObj}
        />
      </div>

      <div
        className={classes.quickViewImage}
        style={{ opacity: quickViewObj ? 1 : 0 }}
      >
        {WhiteBackgroundPopUp}
        <QuickViewImageContainer quickViewProps={quickViewProps} />
      </div>
    </>
  );
};

export default QuickViewImage;
