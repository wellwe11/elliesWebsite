import classes from "./productPrice.module.scss";

const ProductPrice = ({ price }) => {
  const currency = "€"; // need to update for a currency based on location/pref
  return (
    <div className={classes.productPrice}>
      <p>
        {price} {currency}
      </p>
    </div>
  );
};

export default ProductPrice;
