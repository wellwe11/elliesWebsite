import classes from "./addToCart.module.scss";
import quickViewClass from "../../../../preview.module.scss";
import { useState } from "react";
import storeData from "../../../../../../routeContainer/zustandObject/storeData.jsx";

const Button = ({ children, fn }) => {
  return (
    <button onClick={fn} className={classes.button}>
      {children}
    </button>
  );
};

const handlePlus = (setter) => {
  setter((prev) => (prev + 1 < 100 ? +prev + 1 : prev));
};

const handleMinus = (setter) => {
  setter((prev) => (+prev > 0 ? +prev - 1 : prev));
};

const handleInput = (setter, input) => {
  const inputValue = input.target.value;

  if (Number(inputValue) && +inputValue > 0) {
    if (+inputValue < 100) {
      setter(+inputValue);
    } else {
      setter(99);
    }
  } else {
    setter((prev) => prev);
  }

  if (inputValue === "") {
    setter("");
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
    obj.amount = addToCartAmount;
    addToCart(obj);
  };

  return (
    <div className={classes.addToCartContainer}>
      <div className={classes.amountContainer}>
        <Button fn={() => handleMinus(setAddToCartAmount)}>-</Button>
        <input
          value={addToCartAmount}
          onChange={(e) => handleInput(setAddToCartAmount, e)}
          onBlur={(e) => clickOutsideWithNoValue(setAddToCartAmount, e)}
        />
        <Button fn={() => handlePlus(setAddToCartAmount)}>+</Button>
      </div>
      <button className={classes.addToCartBtn} onClick={handleAddToCart}>
        <h4 className={`${classes.text} ${quickViewClass.titleTypeText}`}>
          Add To Cart
        </h4>
      </button>
    </div>
  );
};

export default AddToCart;
