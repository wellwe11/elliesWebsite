import classes from "./products.module.scss";

const Products = ({ products, page }) => {
  // minImages displays the absolute minimum of index which is allowed to be shown on each page
  // page starts on 0, goes to 1, 2, 3 etc.

  const start = (page - 1) * 9; // First image is then current (page - 1) * 9. -1 because pages are not based on index, but index + 1 (to avoid page being displayed as 0)
  // So, 0, 8, 18 etc.

  const end = start + 9; // maxPage displays absolute maximum index that is displayed on current page
  // so, 8, 17, 26 etc.

  // slices only visible objects
  const displayedProducts = products.slice(start, end);

  const mappedProductImages = displayedProducts.map((product, index) => (
    <div key={index} className={classes.productWrapper}>
      <img className={classes.productImage} src={product.image} alt="" />
    </div>
  ));

  return (
    <div className={classes.products}>
      <div className={classes.productsContainer}>{mappedProductImages}</div>
    </div>
  );
};

export default Products;
