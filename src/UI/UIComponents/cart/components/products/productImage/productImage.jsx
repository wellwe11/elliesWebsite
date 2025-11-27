import { useNavigate } from "react-router-dom";
import classes from "./productImage.module.scss";
import bodyNoScroll from "@functions/bodyNoScroll";
import useGetLocation from "../../../../../../abstract/hooks/useGetLocation.jsx";

const ProductImage = ({ image, alt, product }) => {
  const navigate = useNavigate();

  const productId = product.id,
    productType = product.type;

  const { location } = useGetLocation();

  const handleNavigate = () => {
      bodyNoScroll().enableScroll();
      navigate(`/preview?category=${productType}&id=${productId}`, {
        state: { backgroundLocation: location.pathname },
      });
    },
    productImage = (
      // clicking on image should navigate to that product again
      <div className={classes.productImageWrapper}>
        <img src={image} alt={alt} onClick={handleNavigate} />
      </div>
    );

  return <div className={classes.imageContainer}>{productImage}</div>;
};

export default ProductImage;
