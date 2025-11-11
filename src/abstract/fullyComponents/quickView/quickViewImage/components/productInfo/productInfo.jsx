import classes from "./productInfo.module.scss";
import quickViewClass from "../../quickViewImage.module.scss";

import ProductDescription from "./components/productDescription/productDescription.jsx";
import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";

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
  return (
    <div className={classes.infoSection}>
      <div className={classes.productTitleAndBioWrapper}>
        <InfoProductTitle title={title} />
        <InfoType type={type} />
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
    </div>
  );
};

export default ProductInfo;
