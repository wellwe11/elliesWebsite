import classes from "./products.module.scss";

import { Product } from "./product/product.jsx";

import CartBottomItem from "../cartBottomItem/cartBottomItem.jsx";
import storeData from "../../../routeContainer/zustandObject/storeData.jsx";

const Products = ({ setDisplayShoppingCart }) => {
  const { cart, getItemId } = storeData(),
    cartValues = Object.values(cart);

  const cartProductsWrapper = cartValues.map((obj) => (
    <Product
      setDisplayShoppingCart={setDisplayShoppingCart}
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
