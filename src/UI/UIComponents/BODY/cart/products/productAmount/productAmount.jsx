import classes from "./productAmount.module.scss";

import {
  addToCart,
  changeFromInputToCart,
  removeFromCart,
} from "@functions/handleCart";
import { useContext, useRef, useState } from "react";
import cartContext from "../../../cartContext";

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

const Input = ({ localCart, setLocalCart, product }) => {
  const { setCart } = useContext(cartContext);
  const inputRef = useRef();

  const handleClickEnterInput = (e, item) => {
    const value = +inputRef.current.value;
    if (value === length) return;
    if (e.key === "Enter") {
      if (localCart.length > 0) {
        changeFromInputToCart(setCart, item, +localCart);
      } else {
        changeFromInputToCart(setCart, item, 0);
      }
    }
  };

  const handleMouseClickOutsideInput = (item) => {
    const value = +inputRef.current.value;
    setLocalCart(value);
    changeFromInputToCart(setCart, item, value);
  };

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
  const [localCart, setLocalCart] = useState(length);

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
