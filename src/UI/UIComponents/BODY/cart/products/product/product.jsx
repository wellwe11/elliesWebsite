import classes from "./product.module.scss";
import ProductAmount from "../productAmount/productAmount";
import ProductImage from "../productImage/productImage";
import ProductName from "../productName/productName";
import ProductPrice from "../productPrice/productPrice";

export const Product = ({ product, length }) => {
  const specificProduct = product?.[0]; // select first item in array, since all items are identical.
  const {
    image: image,
    _embedded: {
      setTitle: name,
      details: { price: price },
    },
  } = specificProduct;

  const leftSection = (
    <div className={classes.leftSection}>
      <ProductName name={name} />
      <ProductAmount product={product} length={length} />
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
