import classes from "./productAmount.module.scss";

import { useEffect, useState } from "react";
import storeData from "../../../../routeContainer/zustandObject/storeData.jsx";

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
      e.preventDefault();
      const numericValue = Number(value);

      if (numericValue > 0) {
        // if there are items in the cart
        changeFromInputToCart(product, numericValue);
      } else {
        // else, remove the item
        changeFromInputToCart(product, 0);
      }

      e.target.blur();
    }
  };

  const handleMouseClickOutsideInput = () => {
    // user has typed new amount and clicks outside Input
    // If user inputs a new amount, and then clicks outside the input; updates input as if enter was clicked
    changeFromInputToCart(product, Number(value)); // update array
  };

  const handleChangeInput = (e) => {
    // user writes new input in Input
    // update input & localCart
    const input = e?.target?.value;

    if (
      input === "" ||
      (input !== "" &&
        !isNaN(Number(input)) &&
        Number(input) >= 0 &&
        input < 99)
    ) {
      setValue(input);
    } else if (input > 99) {
      setValue(99);
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
