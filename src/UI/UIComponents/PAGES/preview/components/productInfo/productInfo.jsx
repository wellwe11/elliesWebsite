import classes from "./productInfo.module.scss";
import previewClass from "../../preview.module.scss";
import { Link, useLocation } from "react-router-dom";

import ProductDescription from "../productInfo/components/productDescription/productDescription.jsx";

import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";
import bodyNoScroll from "@functions/bodyNoScroll.js";
import X_SVG from "@components/SVGS/X_SVG/X_SVG.jsx";
import CloseButton from "@components/closeButton/closeButton.jsx";

import AddToCart from "./components/addToCart/addToCart.jsx";

const InfoProductTitle = ({ title }) => (
  <h1 className={previewClass.titleTypeText}>{title}</h1>
);

const InfoType = ({ type }) => {
  const text = capitalizeFirstLetter(type);

  return <h6 className={previewClass.bioTypeText}>{text}</h6>;
};

const QuickViewImageOptions = ({
  quickViewImages,
  activeImageIndex,
  setActiveImageIndex,
}) => (
  <div className={classes.allImagesExamples}>
    {quickViewImages?.map((image, index) => (
      <div
        key={index}
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
  <h6 className={previewClass.bioTypeText}>Product: {+activeImageIndex + 1}</h6>
);

const ProductInfo = ({ obj, activeImageIndex, setActiveImageIndex }) => {
  const location = useLocation();
  const { setTitle, type, setImages, image } = obj;
  const { enableScroll } = bodyNoScroll();

  return (
    <div className={classes.infoSection}>
      <div className={classes.closeWrapper}>
        <CloseButton
          to={-1} // return to actual previous page which is home or gallery
          onClick={enableScroll}
        />
      </div>
      <div className={classes.productTitleAndBioWrapper}>
        <InfoType type={type} />
        <InfoProductTitle title={setTitle} />
        <div className={previewClass.paddingTop4}>
          <CurrentlySelectedProduct activeImageIndex={activeImageIndex} />
          <QuickViewImageOptions
            quickViewImages={setImages || [image]}
            activeImageIndex={activeImageIndex}
            setActiveImageIndex={setActiveImageIndex}
          />
        </div>
      </div>

      <ProductDescription obj={obj} />
      <div className={classes.addToCartWrapper}>
        <AddToCart obj={obj} />
      </div>
    </div>
  );
};

export default ProductInfo;
