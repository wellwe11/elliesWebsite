import classes from "./quickView.module.scss";

import { useNavigate } from "react-router-dom";
import QuickViewButton from "./quickViewButton/quickViewButton.jsx";
import bodyNoScroll from "@functions/bodyNoScroll";

const QuickViewImage = ({
  src,
  secondSrc,
  productType,
  productId,
  handleNavigate,
}) => {
  return (
    <div className={classes.quickViewImageWrapper}>
      <img
        className={classes.productImage}
        src={src}
        alt=""
        onLoad={(e) => e.currentTarget.classList.add(classes.loaded)}
      />

      <img
        className={classes.productImage}
        src={secondSrc}
        alt=""
        onClick={() =>
          handleNavigate(`/uniqueImage?category=${productType}&id=${productId}`)
        }
      />
    </div>
  );
};

const QuickView = ({ src, secondSrc, productType, productId }) => {
  const navigate = useNavigate();
  const { disableScroll } = bodyNoScroll();

  return (
    <div className={classes.quickViewImageContainer}>
      <QuickViewImage
        src={src}
        secondSrc={secondSrc}
        productType={productType}
        productId={productId}
        handleNavigate={navigate}
      />
      <div className={classes.quickViewButtonComponentWrapper}>
        {
          // Button which pops up on hovering an image. Clicking it will display QuickViewImageContainer.
          // Button is positioned absolute, so will awlays be relative to parent-element which needs to be set to a wrapper
        }
        <QuickViewButton
          text={<p>Quick view</p>}
          onClick={() => {
            disableScroll();
            navigate(`./preview?category=${productType}&id=${productId}`, {
              state: { backgroundLocation: location.pathname },
            });
          }}
        />
      </div>
    </div>
  );
};

export default QuickView;
