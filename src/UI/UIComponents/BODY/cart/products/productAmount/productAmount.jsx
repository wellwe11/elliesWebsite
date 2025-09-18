import classes from "./productAmount.module.scss";

import {
  addToCart,
  changeFromInputToCart,
  removeFromCart,
} from "@functions/handleCart";
import { useContext, useRef, useState } from "react";
import cartContext from "../../../cartContext";

// increase number of items
const PlusButton = ({ setLocalCart, product }) => {
  const { setCart } = useContext(cartContext);

  const handlePlus = (item) => {
    addToCart(setCart, item);
  };

  return (
    <button
      className={`${classes.amountBtn} ${classes.plus}`}
      onClick={() => {
        handlePlus(product[0]);
        setLocalCart((prev) => prev + 1);
      }}
    >
      +
    </button>
  );
};

// decrease number of items & if decreased to 0, remove item
const MinusButton = ({ setLocalCart, product }) => {
  const { setCart } = useContext(cartContext);

  const handleMinus = (item) => {
    removeFromCart(setCart, item);
  };

  return (
    <button
      className={`${classes.amountBtn} ${classes.minus}`}
      onClick={() => {
        handleMinus(product);
        setLocalCart((prev) => prev - 1);
      }}
    >
      -
    </button>
  );
};

// input which allow user to write amount of products
const Input = ({ localCart, setLocalCart, product }) => {
  const { setCart } = useContext(cartContext);

  const inputRef = useRef(); // for tracking value; inputRef.current.value

  // user clicks enter while focusing Input and confirms amount
  const handleClickEnterInput = (e, item) => {
    const value = +inputRef.current.value; // inputs value

    if (value === length) return; // if value is the same as the amount of items that are already in cart, do nothing
    if (e.key === "Enter") {
      if (localCart.length > 0) {
        // if there are items in the cart
        changeFromInputToCart(setCart, item, +localCart);
      } else {
        // else, remove the item
        changeFromInputToCart(setCart, item, 0);
      }
    }
  };

  // user has typed new amount and clicks outside Input
  // If user inputs a new amount, and then clicks outside the input; updates input as if enter was clicked
  const handleMouseClickOutsideInput = (item) => {
    const value = +inputRef.current.value; // input value

    setLocalCart(value); // update localCart to visible display change
    changeFromInputToCart(setCart, item, value); // update array
  };

  // user writes new input in Input
  // update input & localCart
  const handleChangeInput = (e) => {
    const input = e?.target?.value;
    if (input === +length) return;

    setLocalCart(input);
  };

  return (
    <input
      className={classes.productAmountInput}
      ref={inputRef}
      value={localCart}
      onKeyDown={(e) => handleClickEnterInput(e, product)}
      onChange={handleChangeInput}
      onBlur={() => handleMouseClickOutsideInput(product)}
    />
  );
};

const ProductAmount = ({ product, length }) => {
  const [localCart, setLocalCart] = useState(length); // a shared state that helps Input to visible update it's content; helps user see what is currently being displayed before any logic is implemented

  return (
    <div className={classes.productAmount}>
      <MinusButton setLocalCart={setLocalCart} product={product} />
      <Input
        localCart={localCart}
        setLocalCart={setLocalCart}
        product={product}
      />
      <PlusButton setLocalCart={setLocalCart} product={product} />
    </div>
  );
};

export default ProductAmount;
