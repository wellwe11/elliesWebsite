import classes from "./products.module.scss";

import { useContext } from "react";
import { Product } from "./product/product";
import cartContext from "../../cartContext";
import CartBottomItem from "../cartBottomItem/cartBottomItem";

const Products = () => {
  const { cart } = useContext(cartContext);

  const cartEntries = Object.entries(cart);

  const cartProductsWrapper = cartEntries.map(([name, arr], index) => (
    <Product key={name + index} product={arr} length={arr.length} />
  ));

  return (
    <div className={classes.cartProductsContainer}>
      {cartProductsWrapper}
      {cartEntries?.length < 1 && <CartBottomItem />}
    </div>
  );
};

export default Products;
