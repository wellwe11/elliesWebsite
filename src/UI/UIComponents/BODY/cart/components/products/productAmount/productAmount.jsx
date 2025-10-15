import classes from "./productAmount.module.scss";

import { useEffect, useState } from "react";
import { storeData } from "../../../../../routeContainer/routeContainer.jsx";

// increase number of items
const PlusButton = ({ product }) => {
  const addToCart = storeData((state) => state.addToCart);

  const handlePlus = () => {
    addToCart(product);
  };

  return (
    <button
      className={`${classes.amountBtn} ${classes.plus}`}
      onClick={handlePlus}
    >
      +
    </button>
  );
};

// decrease number of items & if decreased to 0, remove item
const MinusButton = ({ product }) => {
  const removeFromCart = storeData((state) => state.removeFromCart);

  const handleMinus = () => {
    removeFromCart(product);
  };

  return (
    <button
      className={`${classes.amountBtn} ${classes.minus}`}
      onClick={handleMinus}
    >
      -
    </button>
  );
};

// input which allow user to write amount of products
const Input = ({ product, amount }) => {
  const { changeFromInputToCart } = storeData();

  const [value, setValue] = useState(amount);

  // change value if user clicks PlusButton or MinusButton
  useEffect(() => {
    if (+value !== amount) {
      setValue(amount);
    }
  }, [amount]);

  const handleClickEnterInput = (e) => {
    // user clicks enter while focusing Input and confirms amount
    if (e.key === "Enter") {
      if (+value > 0) {
        // if there are items in the cart
        changeFromInputToCart(product, +value);
      } else {
        // else, remove the item
        changeFromInputToCart(product, 0);
      }
    }
  };

  const handleMouseClickOutsideInput = () => {
    // user has typed new amount and clicks outside Input
    // If user inputs a new amount, and then clicks outside the input; updates input as if enter was clicked
    changeFromInputToCart(product, +value); // update array
  };

  const handleChangeInput = (e) => {
    // user writes new input in Input
    // update input & localCart
    const input = e?.target?.value;

    if (input === "" || input >= 0) {
      setValue(input);
    }

    return;
  };

  return (
    <input
      className={classes.productAmountInput}
      onKeyDown={handleClickEnterInput}
      onChange={handleChangeInput}
      value={value}
      onBlur={handleMouseClickOutsideInput}
    />
  );
};

const ProductAmount = ({ product, amount }) => {
  return (
    <div className={classes.productAmount}>
      <MinusButton product={product} />
      <Input amount={amount} product={product} />
      <PlusButton product={product} />
    </div>
  );
};

export default ProductAmount;
