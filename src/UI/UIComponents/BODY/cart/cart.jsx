import classes from "./cart.module.scss";
import { useContext, useEffect, useState } from "react";

import cartContext from "../cartContext";
import bodyNoScroll from "@functions/bodyNoScroll";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  changeFromInputToCart,
  removeFromCart,
} from "@functions/handleCart";

export const Product = ({ product, length }) => {
  const { cart, setCart } = useContext(cartContext);
  // for payment details such as name, amount, single-price.

  // clicking on image should navigate to that product again

  const specificProduct = product?.[0]; // select first item in array, since all items are identical.
  const amountOfProducts = length;
  const {
    image: image,
    _embedded: {
      setTitle: name,
      details: { price: price },
    },
  } = specificProduct;

  const [localCart, setLocalCart] = useState(amountOfProducts);

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

  const handleClickEnterInput = (e, item) => {
    if (e.key === "Enter") {
      if (localCart.length > 0) {
        changeFromInputToCart(setCart, item, +localCart);
      } else {
        changeFromInputToCart(setCart, item, 0);
      }
    }
  };

  const handleChangeInput = (e) => {
    console.log(e);
    const input = e.target.value;
    if (input === +amountOfProducts) return;

    setLocalCart(input);
  };

  const productAmount = (
    <div className={classes.productAmount}>
      <button
        className={`${classes.amountBtn} ${classes.minus}`}
        onClick={() => handleMinus(product)}
      >
        -
      </button>

      <input
        value={localCart}
        onKeyDown={(e) => handleClickEnterInput(e, product)}
        onChange={handleChangeInput}
      />
      <h6 className={classes.amountText}>{localCart}</h6>
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

const CartBottomItem = () => {
  return (
    <div className={classes.cartBottomItem}>
      <h1>This is the bottom</h1>
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
    <div className={classes.cartProductsContainer}>
      {cartProductsWrapper}
      <CartBottomItem />
    </div>
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

  const title = <h4 className={classes.title}>SHOPPING CART</h4>;

  const toPaymentMethod = <button>To payment method</button>;
  const currency = "€"; // will change in future

  const totalElements = (
    <div className={classes.totalWrapper}>
      <p className={classes.totalText}>
        SUBTOTAL: {totalPriceVar}
        {" " + currency}
      </p>
      <p className={classes.totalText}>Total items: {totalItemsVar}</p>
    </div>
  );

  return (
    <div className={classes.cart}>
      <div className={classes.background} onClick={handleNavigateBack} />
      <div className={classes.cartWrapper}>
        {title}
        <div className={classes.productsWrapper}>
          <CartProducts />
        </div>
        {totalElements}
        {toPaymentMethod}
      </div>
    </div>
  );
};

export default Cart;
