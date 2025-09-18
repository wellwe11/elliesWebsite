import classes from "./quickView.module.scss";
import { useNavigate } from "react-router-dom";
import QuickViewButton from "./quickViewButton/quickViewButton";
import bodyNoScroll from "@functions/bodyNoScroll";

const QuickView = ({ src, secondSrc, productType, productId }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/uniqueImage/${productType}#${productId}`);
  };

  const quickViewImage = (
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
        onClick={handleNavigate}
      />
    </div>
  );

  return (
    <div className={classes.quickViewImageContainer}>
      {quickViewImage}

      <div className={classes.quickViewButtonComponentWrapper}>
        {
          // Button which pops up on hovering an image. Clicking it will display QuickViewImageContainer.
          // Button is positioned absolute, so will awlays be relative to parent-element which needs to be set to a wrapper
        }
        <QuickViewButton
          text={"Quick view"}
          onClick={() => {
            navigate(`./preview/${productType}#${productId}`, {
              state: { backgroundLocation: location.pathname },
            });

            bodyNoScroll().disableScroll();
          }}
        />
      </div>
    </div>
  );
};

export default QuickView;
