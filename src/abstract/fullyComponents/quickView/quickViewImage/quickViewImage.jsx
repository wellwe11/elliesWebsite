import classes from "./quickViewImage.module.scss";
import { useEffect, useState } from "react";

import ArrowNoBodySVG from "@components/SVGS/arrowNoBodySVG/arrowNoBodySVG";

import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import QuickViewButton from "../quickViewButton/quickViewButton";
import bodyNoScroll from "@functions/bodyNoScroll";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import useFetchDataIDs from "../../../hooks/useFetchDataIDs.jsx";

// If you want to view the actual product, this button takes you to a new page which contains further information and such
const ViewProductButton = () => {
  const navigate = useNavigate(); // navigates to a backgroundLocation

  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null,
    id = searchParams.get("id") || null;

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
const ProductDescription = ({ bio }) => {
  const [viewDescription, setViewDescription] = useState(true);

  const expandDescriptionButton = (
    // actual button which is always displayed
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
      {expandDescriptionButton}
      {expandDescriptionText}
      <ViewProductButton />
    </div>
  );
};

// Element containing information & further info about the product, such as other images, price, name, description
const QuickViewInfo = ({
  quickViewProps: { title = "Title", price = 19.99, bio, quickViewImages },
  activeImageIndex,
  setActiveImageIndex,
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

  const allImagesRelatedToQuickViewImage = (
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
      <ProductDescription bio={bio} />
    </div>
  );
};

// Element containing product-image and product-info
const QuickViewImageContainer = ({ quickViewProps }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0); // A list of other images related to currently viewed product which are clickable. Clicking one displays it to the side for user to inspect it as a bigger image

  const { quickViewImages } = quickViewProps; // destructure to access images for currentActiveImage

  const currentActiveImage = (
    // currentActiveImage is the image which you initially clicked on quickView. It can be changed by clicking then related images (set of smaller images displayed in quickViewInfo)
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

const useQuickViewData = () => {
  const location = useLocation(),
    tab = location.pathname.split("/")[1] === "preview" ? "home" : "gallery"; // not dynamic. Need to fix in future

  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null;

  const { data, loading } = useFetchDataIDs(
    `/API_imitation/${tab}/${category}.json`
  );

  return { data, loading };
};

// Element containing QuickViewImage & QuickViewInfo, as well as a faded background.
// Will always be positonined fixed in middle of the screen.
const QuickViewImage = () => {
  const navigate = useNavigate(); // navigates to a backgroundLocation

  const [searchParams] = useSearchParams(),
    id = searchParams.get("id") || null;

  const { data, loading } = useQuickViewData();

  const { enableScroll } = bodyNoScroll();

  if (loading)
    return (
      <div className={classes.quickViewImage}>
        <LoadingWrapper
          onClick={() => {
            enableScroll();
            navigate(-1);
          }}
          condition={loading}
        />
      </div>
    );

  const foundObj = data.find((a) => +a.id === +id); // finds matching obj

  const uniqueViewEmbedded = foundObj?._embedded;

  const quickViewProps = {
    quickViewImages: uniqueViewEmbedded?.restImages,
    title: uniqueViewEmbedded?.setTitle,
    price: uniqueViewEmbedded?.details.price,
    bio: uniqueViewEmbedded?.setDescription,
  };

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
        style={{ opacity: foundObj ? 1 : 0 }}
      >
        {WhiteBackgroundPopUp}
        <QuickViewImageContainer quickViewProps={quickViewProps} />
      </div>
    </>
  );
};

export default QuickViewImage;
