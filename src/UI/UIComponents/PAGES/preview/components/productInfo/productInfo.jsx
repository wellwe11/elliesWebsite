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
  <h5 className={previewClass.bioTypeText}>{title}</h5>
);

const InfoType = ({ type }) => {
  const text = capitalizeFirstLetter(type);

  return <p className={previewClass.bioTypeText}>{text}</p>;
};

const Description = ({ data }) => {
  const description = data.setDescription;
  return (
    <div className={classes.description}>
      <div className={classes.textWrapper}>
        <p className={`${classes.text} ${previewClass.bioTypeText}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

const ProductInfo = ({ obj }) => {
  const { setTitle, type } = obj;
  const { enableScroll } = bodyNoScroll();
  const location = useLocation();

  return (
    <div className={classes.infoSection}>
      <div className={classes.productTitleAndBioWrapper}>
        <div className={classes.closeWrapper}>
          <CloseButton
            to={location.state.backgroundLocation || -1} // return to actual previous page which is home or gallery
            onClick={enableScroll}
          />
        </div>
        <InfoProductTitle title={setTitle} />
        <InfoType type={type} />
        <div className={previewClass.paddingTop1} />
        <ProductDescription obj={obj} />
        <div className={previewClass.paddingTop4} />
        <Description data={obj} />
      </div>
      <div className={classes.addToCartWrapper}>
        <AddToCart obj={obj} />
      </div>
    </div>
  );
};

export default ProductInfo;
