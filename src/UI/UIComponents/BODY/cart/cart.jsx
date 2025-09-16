import classes from "./cart.module.scss";
import { useContext, useEffect } from "react";

import cartContext from "../cartContext";
import bodyNoScroll from "@functions/bodyNoScroll";
import { useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "@functions/handleCart";

const Product = ({ product, length }) => {
  const { cart, setCart } = useContext(cartContext);
  // for payment details such as name, amount, single-price.

  const specificProduct = product?.[0]; // select first item in array, since all items are identical.
  const amountOfProducts = length;
  const {
    image: image,
    _embedded: {
      setTitle: name,
      details: { price: price },
    },
  } = specificProduct;

  const productImage = (
    <div className={classes.productImageWrapper}>
      <img src={image} alt="" />
    </div>
  );

  const productName = (
    <div className={classes.productName}>
      <p>{name}</p>
    </div>
  );

  const handlePlus = (item) => addToCart(setCart, item);

  const handleMinus = (item) => removeFromCart(setCart, item);

  const productAmount = (
    <div className={classes.productAmount}>
      <button
        className={`${classes.amountBtn} ${classes.minus}`}
        onClick={() => handleMinus(product)}
      >
        -
      </button>
      <h6 className={classes.amountText}>{amountOfProducts}</h6>
      <button
        className={`${classes.amountBtn} ${classes.plus}`}
        onClick={() => handlePlus(product[0])}
      >
        +
      </button>
    </div>
  );

  const currency = "€"; // need to update for a currency based on location/pref
  const productPrice = (
    <div className={classes.productPrice}>
      <p>
        {price} {currency}
      </p>
    </div>
  );

  return (
    <div className={classes.product}>
      <div className={classes.imageContainer}>{productImage}</div>
      <div className={classes.leftSection}>
        {productName}
        {productAmount}
      </div>
      <div className={classes.rightSection}>
        {productPrice}
        <div />
      </div>
    </div>
  );
};

const CartProducts = () => {
  const { cart } = useContext(cartContext);

  const cartEntries = Object.entries(cart);

  const cartProductsWrapper = cartEntries.map(([_, arr], index) => (
    <Product key={index} product={arr} length={arr.length} />
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

  useEffect(() => {
    disableScroll();
  }, []);

  const handleNavigateBack = () => {
    navigate(-1);
    enableScroll();
  };

  const toPaymentMethod = <button>To payment method</button>;

  return (
    <div className={classes.cart}>
      <div className={classes.background} onClick={handleNavigateBack} />
      <div className={classes.cartWrapper}>
        <h1>cart</h1>
        <div className={classes.productsWrapper}>
          <CartProducts />
        </div>
        <div className={classes.totalWrapper}>
          <h1>Total items: {totalItemsVar}</h1>
          <h1>Total price: {totalPriceVar}</h1>
        </div>
        {toPaymentMethod}
      </div>
    </div>
  );
};

export default Cart;
