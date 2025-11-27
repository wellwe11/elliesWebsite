import classes from "./product.module.scss";
import ProductAmount from "../productAmount/productAmount.jsx";
import ProductImage from "../productImage/productImage.jsx";
import ProductName from "../productName/productName.jsx";
import ProductPrice from "../productPrice/productPrice.jsx";

export const Product = ({ product, amount }) => {
  const { image: image, setTitle: name, price } = product;

  const leftSection = (
    <div className={classes.leftSection}>
      <ProductName name={name} />
      <ProductAmount product={product} amount={amount} />
    </div>
  );

  const rightSection = (
    <div className={classes.rightSection}>
      <ProductPrice price={price} />
    </div>
  );

  return (
    <div className={classes.product}>
      <ProductImage image={image} product={product} />
      {leftSection}
      {rightSection}
    </div>
  );
};
