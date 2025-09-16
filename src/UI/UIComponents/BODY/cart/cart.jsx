import classes from "./cart.module.scss";
import { useContext, useEffect } from "react";

import cartContext from "../cartContext";
import bodyNoScroll from "@functions/bodyNoScroll";
import { useNavigate } from "react-router-dom";

const Product = ({ product, length }) => {
  const { setCart } = useContext(cartContext);
  // for payment details such as name, amount, single-price.

  const specificProduct = product[0]; // select first item in array, since all items are identical.
  const amountOfProducts = length;
  const {
    image: image,
    _embedded: {
      setTitle: name,
      details: { price: price, type: type },
    },
  } = specificProduct;

  const productImage = (
    <div className={classes.productImageWrapper}>
      <img src={image} alt="" />
    </div>
  );

  const productName = (
    <div className={classes.productName}>
      <h5>{name}</h5>
    </div>
  );

  const productAmount = (
    <div className={classes.productAmount}>
      <h6>{amountOfProducts}</h6>
    </div>
  );

  const productPrice = (
    <div className={classes.productPrice}>
      <p>{price}</p>
    </div>
  );

  const productType = (
    <div className={classes.productType}>
      <p>{type}</p>
    </div>
  );

  return (
    <div className={classes.product}>
      <h1>product</h1>
    </div>
  );
};

const CartProducts = ({}) => {
  const { cart } = useContext(cartContext);

  const cartEntries = Object.entries(cart);
  console.log(cartEntries);

  const cartProductsWrapper = cartEntries.map(([_, arr], index) => (
    <div key={index} className={classes.productsWrapper}>
      <Product product={arr} length={arr.length} />
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
        <CartProducts />
        <h1>Total items: {totalItemsVar}</h1>
        <h1>Total price: {totalPriceVar}</h1>
      </div>
    </div>
  );
};

export default Cart;
