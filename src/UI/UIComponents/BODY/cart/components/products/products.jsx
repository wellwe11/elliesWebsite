import classes from "./products.module.scss";

import { Product } from "./product/product.jsx";

import CartBottomItem from "../cartBottomItem/cartBottomItem.jsx";
import { storeData } from "../../../../routeContainer/routeContainer.jsx";

const Products = () => {
  const { cart, getItemId } = storeData(),
    cartValues = Object.values(cart);

  console.log(cart, cartValues);

  const cartProductsWrapper = cartValues.map((obj, index) => (
    <Product
      key={getItemId(obj.item)}
      product={obj.item}
      amount={obj.quantity}
    />
  ));

  return (
    <div className={classes.cartProductsContainer}>
      {cartProductsWrapper}
      {cartValues.length < 1 && <CartBottomItem />}
    </div>
  );
};

export default Products;
