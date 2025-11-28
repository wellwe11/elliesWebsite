import classes from "./product.module.scss";
import ProductAmount from "./components/productAmount/productAmount.jsx";
import ProductImage from "./components/productImage/productImage.jsx";
import ProductName from "./components/productName/productName.jsx";
import ProductPrice from "./components/productPrice/productPrice.jsx";

export const Product = ({ product, amount, setDisplayShoppingCart }) => {
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
      <ProductImage
        image={image}
        product={product}
        setDisplayShoppingCart={setDisplayShoppingCart}
      />
      {leftSection}
      {rightSection}
    </div>
  );
};
