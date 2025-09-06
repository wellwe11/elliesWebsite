import { useNavigate } from "react-router-dom";
import classes from "./quickView.module.scss";
import QuickViewButton from "./quickViewButton/quickViewButton";

const QuickView = ({ src, productType, productId }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.productImageWrapper}>
      <img className={classes.productImage} src={src} alt="" />
      <div className={classes.quickViewButtonComponentWrapper}>
        {
          // Button which pops up on hovering an image. Clicking it will display QuickViewImageContainer.
          // Button is positioned absolute, so will awlays be relative to parent-element which needs to be set to a wrapper
        }
        <QuickViewButton
          text={"Quick view"}
          onClick={() =>
            navigate(`/gallery/preview/${productType}/${productId}`, {
              state: { backgroundLocation: location.pathname },
            })
          }
        />
      </div>
    </div>
  );
};

export default QuickView;
