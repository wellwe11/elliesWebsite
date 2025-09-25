import classes from "./productName.module.scss";

const ProductName = ({ name }) => {
  return (
    <div className={classes.productName}>
      <p>{name}</p>
    </div>
  );
};

export default ProductName;
