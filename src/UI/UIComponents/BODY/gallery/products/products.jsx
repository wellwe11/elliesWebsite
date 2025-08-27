import classes from "./products.module.scss";

const Products = ({ products, page }) => {
  // minImages displays the absolute minimum of index which is allowed to be shown on each page
  // page starts on 0, goes to 1, 2, 3 etc.
  // First image is then current page * 9.
  // So, 0, 8, 18 etc.
  const start = page * 9;

  // maxPage displays absolute maximum index that is displayed on current page
  // so, 8, 17, 26 etc.
  const end = start + 9;

  // slices only visible objects
  const displayedProducts = products.slice(start, end);

  const mappedProductImages = displayedProducts.map((product, index) => (
    <div key={index} className={classes.productWrapper}>
      <img src={product.image} alt="" />
    </div>
  ));

  return (
    <div className={classes.products}>
      <div className={classes.productsContainer}>{mappedProductImages}</div>
    </div>
  );
};

export default Products;
