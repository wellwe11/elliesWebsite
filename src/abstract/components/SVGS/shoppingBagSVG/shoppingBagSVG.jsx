import classes from "./shoppingBagSVG.module.scss";

const ShoppingBagSVG = () => {
  return (
    <div className={classes.shoppingBagSVG}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="160"
        height="160"
        viewBox="0 0 24 24"
        role="img"
        aria-labelledby="title"
      >
        <g
          fill="none"
          stroke="#000"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 8.5h12v10a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 18.5v-10z" />

          <path d="M9 8.5V6.25a3 3 0 0 1 6 0V8.5" />
        </g>
      </svg>
    </div>
  );
};

export default ShoppingBagSVG;
