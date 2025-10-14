import classes from "./products.module.scss";

import { Product } from "./product/product.jsx";

import CartBottomItem from "../cartBottomItem/cartBottomItem.jsx";
import { storeData } from "../../../../routeContainer/routeContainer.jsx";

const Products = () => {
  const { cart, getItemId } = storeData(),
    cartEntries = Object.values(cart);

  console.log(cart, cartEntries);

  const cartProductsWrapper = cartEntries.map((obj, index) => (
    <Product product={obj.item} amount={obj.quantity} />
  ));

  return (
    <div className={classes.cartProductsContainer}>
      {cartProductsWrapper}
      {cartEntries?.length < 1 && <CartBottomItem />}
    </div>
  );
};

export default Products;
