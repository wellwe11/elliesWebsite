import classes from "./quickView.module.scss";

import { useNavigate } from "react-router-dom";
import QuickViewButton from "./quickViewButton/quickViewButton.jsx";
import bodyNoScroll from "@functions/bodyNoScroll";

const QuickViewImage = ({ src, secondSrc, handleNavigate }) => {
  return (
    <div className={classes.quickViewImageWrapper}>
      <img
        className={`${classes.productImage} ${
          secondSrc ? classes.secondImageExists : ""
        }`}
        src={src}
        alt=""
        onLoad={(e) => e.currentTarget.classList.add(classes.loaded)}
      />
      {secondSrc && (
        <img
          className={`${classes.productImage} ${
            secondSrc ? classes.secondImageExists : ""
          }`}
          src={secondSrc}
          alt=""
          onClick={handleNavigate}
        />
      )}
    </div>
  );
};

const QuickView = ({
  src,
  secondSrc,
  productType,
  productId,
  canQuickView = true,
}) => {
  const navigate = useNavigate();
  const { disableScroll } = bodyNoScroll();

  const handleNavigate = () =>
    navigate(`./preview?category=${productType}&id=${productId}`);

  return (
    <div className={classes.quickViewImageContainer} onClick={handleNavigate}>
      <QuickViewImage src={src} secondSrc={secondSrc} />
      {canQuickView && (
        <div className={classes.quickViewButtonComponentWrapper}>
          <QuickViewButton text={<p>Preview</p>} onClick={disableScroll} />
        </div>
      )}
    </div>
  );
};

export default QuickView;
