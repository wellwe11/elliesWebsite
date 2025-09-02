import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";
import classes from "./products.module.scss";

const ProductBio = ({ bioData }) => {
  console.log(bioData);

  /**
   *
   * Type
   * SetName (if any)
   * Price
   */

  const type =
    bioData.details.type.slice(0, 1).toUpperCase() +
    bioData.details.type.slice(1);
  const Type = (
    <div className={classes.type}>
      <h4 className={classes.bioText}>{type}</h4>
    </div>
  );

  const name = bioData.setTitle;
  const Name = (
    <div className={classes.name}>
      <h4 className={classes.bioText}>{name}</h4>
    </div>
  );

  // for future implementation - locate user, find accurate currency, convert euro price to respecive currency
  // need api to save users ip so currency stays
  // need option for manually changing currency
  // const typeOfCurrency = "euro or dollar or something"
  const price = bioData.details.price;
  const Price = (
    <div className={classes.price}>
      <h4 className={classes.bioText}>{price + "€"}</h4>
    </div>
  );

  const addToCartButton = (
    <button className={classes.addToCartButton}>
      <div className={classes.shoppingBagSVGWrapper}>
        <ShoppingBagSVG />
      </div>
      <h4 className={classes.bioText}>Add to cart</h4>
    </button>
  );

  return (
    <div className={classes.productBioSection}>
      <div className={classes.productBio}>
        <div className={classes.bioTopSection}>
          {Name}
          {Type}
        </div>
        {Price}
      </div>
      {addToCartButton}
    </div>
  );
};

const Products = ({ products, page }) => {
  console.log(products);

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
      <div className={classes.productImageWrapper}>
        <img className={classes.productImage} src={product.image} alt="" />
      </div>
      <ProductBio bioData={product?._embedded} />
    </div>
  ));

  return (
    <div className={classes.products}>
      <div className={classes.productsContainer}>{mappedProductImages}</div>
    </div>
  );
};

export default Products;
