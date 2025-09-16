import classes from "./cart.module.scss";
import { useContext, useEffect } from "react";

import cartContext from "../cartContext";
import bodyNoScroll from "@functions/bodyNoScroll";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  // for details such as color, price etc.
  console.log(product);

  const { cart } = useContext(cartContext);
  const flattedProducts = Object.values(cart).flat();
};

const CartProducts = ({}) => {
  const { cart } = useContext(cartContext);

  const cartEntries = Object.entries(cart);
  console.log(cartEntries);

  const cartProductsWrapper = cartEntries.map(([name, arr], index) => (
    <div key={index}>
      <h3>{name}</h3>
      <Product product={arr} />
      <h3>{arr.length}</h3>
    </div>
  ));

  return (
    <div className={classes.cartProductsContainer}>{cartProductsWrapper}</div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const { cart, setCart, totalItems, totalPrice } = useContext(cartContext);
  const { disableScroll, enableScroll } = bodyNoScroll();

  const totalPriceVar = Math.floor(+totalPrice() * 10) / 10; // 19.999... === 19.9
  const totalItemsVar = totalItems();

  // if objects have same id, stack them inside the same array
  // sorts items before viewing cart

  // add + and - button to increase/decrease amount of objects per item

  console.log(cart, totalPriceVar, totalItemsVar);

  useEffect(() => {
    disableScroll();
  }, []);

  const handleNavigateBack = () => {
    navigate(-1);
    enableScroll();
  };

  return (
    <div className={classes.cart}>
      <div className={classes.background} onClick={handleNavigateBack} />
      <div className={classes.cartWrapper}>
        <h1>cart</h1>
        <h1>Total items: {totalItemsVar}</h1>
        <h1>Total price: {totalPriceVar}</h1>
        <CartProducts />
      </div>
    </div>
  );
};

export default Cart;
