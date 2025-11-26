import { useNavigate } from "react-router-dom";
import classes from "./productImage.module.scss";
import bodyNoScroll from "@functions/bodyNoScroll";

const ProductImage = ({ image, alt, product }) => {
  const navigate = useNavigate();

  const productId = product.id,
    productType = product.type;

  const handleNavigate = () => {
      bodyNoScroll().enableScroll();
      return navigate(`/preview?category=${productType}&id=${productId}`);
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
