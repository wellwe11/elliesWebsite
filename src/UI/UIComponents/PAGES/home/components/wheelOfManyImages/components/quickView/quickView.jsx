import classes from "./quickView.module.scss";

import { useNavigate } from "react-router-dom";
import QuickViewButton from "./quickViewButton/quickViewButton.jsx";

const QuickViewImage = ({ src, secondSrc, handleNavigate }) => {
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
        onClick={handleNavigate}
      />
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

  const handleNavigate = () =>
    navigate(`./preview?category=${productType}&id=${productId}`, {
      state: { backgroundLocation: location.pathname },
    });

  return (
    <div className={classes.quickViewImageContainer} onClick={handleNavigate}>
      <QuickViewImage src={src} secondSrc={secondSrc} />
      {canQuickView && (
        <div className={classes.quickViewButtonComponentWrapper}>
          <QuickViewButton text={<p>Preview</p>} />
        </div>
      )}
    </div>
  );
};

export default QuickView;
