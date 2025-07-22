import classes from "./shoppingBagSVG.module.scss";

const ShoppingBagSVG = () => {
  return (
    <div className={classes.shoppingBagSVG}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 7h12l1 13H5L6 7z" />

        <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      </svg>
    </div>
  );
};

export default ShoppingBagSVG;
