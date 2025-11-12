import classes from "./productInfo.module.scss";
import quickViewClass from "../../preview.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";

import ProductDescription from "../productInfo/components/productDescription/productDescription.jsx";
import storeData from "../../../../routeContainer/zustandObject/storeData.jsx";

import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";
import X_SVG from "@components/SVGS/X_SVG/X_SVG.jsx";
import bodyNoScroll from "@functions/bodyNoScroll.js";

const InfoProductTitle = ({ title }) => (
  <h1 className={quickViewClass.titleTypeText}>{title}</h1>
);

const InfoType = ({ type }) => {
  const text = capitalizeFirstLetter(type);

  return <h6 className={quickViewClass.bioTypeText}>{text}</h6>;
};

const QuickViewImageOptions = ({
  quickViewImages,
  activeImageIndex,
  setActiveImageIndex,
}) => (
  <div className={classes.allImagesExamples}>
    {quickViewImages?.map((image, index) => (
      <div
        className={`${classes.borderContainer} ${
          activeImageIndex === index
            ? classes.activeBorder
            : classes.inactiveBorder
        }`}
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
);

// currently only displayed index of active allImagesRelatedToQuickViewImage. In future, will have some bio-info
const CurrentlySelectedProduct = ({ activeImageIndex }) => (
  <h6 className={quickViewClass.bioTypeText}>Product: {activeImageIndex}</h6>
);

const AddToCart = ({ obj }) => {
  const addToCart = storeData((state) => state.addToCart);
  const handleAddToCart = () => addToCart(obj);

  return (
    <button className={classes.addToCartBtn} onClick={handleAddToCart}>
      <h4 className={`${classes.text} ${quickViewClass.titleTypeText}`}>
        Add To Cart
      </h4>
    </button>
  );
};

const CloseButton = () => {
  const { enableScroll } = bodyNoScroll();

  return (
    <Link to={-1} className={classes.closeButton} onClick={enableScroll}>
      <X_SVG />
    </Link>
  );
};

const ProductInfo = ({
  obj,
  productProps: {
    displayedDetails: { title = "Title", price = 19.99, type, quickViewImages },
    all,
    infoDetails,
  },
  activeImageIndex,
  setActiveImageIndex,
}) => {
  useEffect(() => {
    const { disableScroll } = bodyNoScroll();
    disableScroll();
  }, []);

  return (
    <div className={classes.infoSection}>
      <div className={classes.closeWrapper}>
        <CloseButton />
      </div>
      <div className={classes.productTitleAndBioWrapper}>
        <InfoType type={type} />
        <InfoProductTitle title={title} />
        <div className={quickViewClass.paddingTop4}>
          <CurrentlySelectedProduct activeImageIndex={activeImageIndex} />
          <QuickViewImageOptions
            quickViewImages={quickViewImages}
            activeImageIndex={activeImageIndex}
            setActiveImageIndex={setActiveImageIndex}
          />
        </div>
      </div>

      <ProductDescription all={all} infoDetails={infoDetails} />
      <div className={classes.addToCartWrapper}>
        <AddToCart obj={obj} />
      </div>
    </div>
  );
};

export default ProductInfo;
