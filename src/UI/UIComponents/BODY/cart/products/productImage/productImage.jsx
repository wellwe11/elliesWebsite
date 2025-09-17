import classes from "./productImage.module.scss";

const ProductImage = ({ image, alt }) => {
  // clicking on image should navigate to that product again
  const productImage = (
    <div className={classes.productImageWrapper}>
      <img src={image} alt={alt} />
    </div>
  );

  return <div className={classes.imageContainer}>{productImage}</div>;
};

export default ProductImage;
