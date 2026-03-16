import classes from "./cartBottomItem.module.scss";

const CartBottomItem = () => {
  return (
    <div className={classes.cartBottomItem}>
      <h6 className={classes.cartBottomText}>The cart is currently empty</h6>
    </div>
  );
};

export default CartBottomItem;
