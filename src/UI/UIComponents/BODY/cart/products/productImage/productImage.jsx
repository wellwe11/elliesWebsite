import { useNavigate } from "react-router-dom";
import classes from "./productImage.module.scss";
import bodyNoScroll from "@functions/bodyNoScroll";

const ProductImage = ({ image, alt, product }) => {
  console.log(product[0]);

  const navigate = useNavigate();
  const productId = product[0].id;
  const productType = product[0]._embedded.details.type;

  const handleNavigate = () => {
    bodyNoScroll().enableScroll();
    return navigate(`/uniqueImage/${productType}#${productId}`);
  };
  // clicking on image should navigate to that product again
  const productImage = (
    <div className={classes.productImageWrapper}>
      <img src={image} alt={alt} onClick={handleNavigate} />
    </div>
  );

  return <div className={classes.imageContainer}>{productImage}</div>;
};

export default ProductImage;
