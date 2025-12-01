import classes from "./addToCart.module.scss";
import previewClass from "../../../../preview.module.scss";
import { useState } from "react";
import storeData from "../../../../../../routeContainer/zustandObject/storeData.jsx";

const Button = ({ children, fn }) => {
  return (
    <button onClick={fn} className={classes.button}>
      {children}
    </button>
  );
};

const handleInput = (setter, input) => {
  const inputValue = input.target.value;

  if (Number(inputValue) && inputValue > 0 && inputValue < 100) {
    setter(+inputValue);
  } else if (inputValue > 99) {
    setter(99);
  } else if (typeof inputValue === "string" && inputValue !== "") {
    setter("");
  } else if (inputValue === "") {
    setter("");
  } else {
    setter(1);
  }
};

const clickOutsideWithNoValue = (setter, input) => {
  const inputValue = input.target.value;

  if (inputValue === "" || inputValue < 1) {
    setter(1);
  }
};

const AddToCart = ({ obj }) => {
  const [addToCartAmount, setAddToCartAmount] = useState(1);

  const addToCart = storeData((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(obj, +addToCartAmount);
  };

  return (
    <div className={classes.addToCartContainer}>
      <div className={classes.amountContainer}>
        <input
          className={classes.input}
          value={addToCartAmount}
          onChange={(e) => handleInput(setAddToCartAmount, e)}
          onBlur={(e) => clickOutsideWithNoValue(setAddToCartAmount, e)}
          max={99}
          min={1}
          type="number"
        />
      </div>
      <button className={classes.addToCartBtn} onClick={handleAddToCart}>
        <h6 className={`${classes.text} ${previewClass.titleTypeText}`}>Add</h6>
      </button>
    </div>
  );
};

export default AddToCart;
