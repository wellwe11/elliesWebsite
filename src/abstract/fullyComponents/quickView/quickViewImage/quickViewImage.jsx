import classes from "./quickViewImage.module.scss";
import { useContext, useEffect, useState } from "react";

import ArrowNoBodySVG from "@components/SVGS/arrowNoBodySVG/arrowNoBodySVG";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";
import UniqueImageContext from "../../../../UI/UIComponents/BODY/uniqueImageContext";
import WhiteButtonCenterText from "@components/whiteButtonCenterText/WHITEBUTTONCENTERTEXT";
import { useNavigate, useParams } from "react-router-dom";

// If you want to view the actual product, this button takes you to a new page which contains further information and such
const ViewProductButton = () => {
  const navigate = handleNavigateSmooth();

  const { uniqueImage } = useContext(UniqueImageContext);

  const linkId = uniqueImage?.id;
  const linkType = uniqueImage?._embedded.details.type;

  return (
    <div className={classes.viewProductButtonWrapper}>
      <WhiteButtonCenterText
        text={<h3 className={classes.buttonText}>Explore item</h3>}
        onClick={() => navigate(`/uniqueImage/${linkType}/${linkId}`)}
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
      <h3 className={classes.buttonDescriptionButtonText}>
        Description
        <div
          className={`${classes.descriptionSvgContainer} ${
            viewDescription ? classes.arrowFaceIn : ""
          }`}
        >
          <ArrowNoBodySVG />
        </div>
      </h3>
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
      <h1>{title}</h1>
    </div>
  );

  // products price
  const infoProductPrice = (
    <div className={classes.price}>
      <h4>{price}$</h4>
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
      <h4>Currently selected product: {activeImageIndex}</h4>
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
const QuickViewImage = ({ quickViewProps }) => {
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
const QuickViewImageContainer = ({ data }) => {
  // Object which will be displayed ocne user clicks quickview
  const [quickViewObj, setQuickViewObj] = useState(null);
  const [loadingText, setLoadingText] = useState("loading...");

  // navigates to a backgroundLocation
  const navigate = useNavigate();
  const params = useParams();

  // gets correct object type & info to find the correct object
  const tabType = params?.type;
  const productId = +params?.id;

  useEffect(() => {
    if (!data) return;

    // finds matching obj
    const foundObj = data[tabType].find((a) => +a.id === productId);

    // tries to find obj quickly
    setTimeout(() => {
      if (foundObj) {
        setQuickViewObj(foundObj);
      }
    }, 1500);

    // if not found, spends more time
    if (!quickViewObj) {
      setTimeout(() => {
        setLoadingText("Need more time to find object...");
        setTimeout(() => {
          if (foundObj) {
            setQuickViewObj(foundObj);
          }
        }, 1500);
      }, 6000);
    }

    // if no item is found by 10 seconds, navigates to error-page (which will be made specifically for not finding products in future)
    setTimeout(() => {
      if (!foundObj) navigate("/Error");
    }, 10000);
  }, [data]);

  // white background-image that differs pop-up from the rest of the website
  const WhiteBackgroundPopUp = (
    <div
      className={classes.quickViewBackground}
      // If you click on the white background it will close current quick-view window
      onClick={() => navigate(-1)} // navigates pages -1; previous page.
    />
  );

  if (!quickViewObj)
    return (
      <div className={classes.quickViewImage}>
        {WhiteBackgroundPopUp}
        <h1 className={classes.loadingText}>{loadingText}</h1>
      </div>
    );

  const uniqueViewEmbedded = quickViewObj?._embedded;

  const quickViewProps = {
    quickViewImages: uniqueViewEmbedded?.restImages,
    title: uniqueViewEmbedded?.setTitle,
    price: uniqueViewEmbedded?.details.price,
    bio: uniqueViewEmbedded?.setDescription,
  };

  return (
    <div className={classes.quickViewImage}>
      {WhiteBackgroundPopUp}
      <QuickViewImage quickViewProps={quickViewProps} />
    </div>
  );
};

export default QuickViewImageContainer;
