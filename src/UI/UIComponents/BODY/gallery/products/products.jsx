import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";
import classes from "./products.module.scss";

import QuickView from "@fullyComponents/quickView/quickView";
import { useLocation } from "react-router-dom";

// element that displays specified information about a product. In this case: The collections name, it's type, and the price.
const ProductBio = ({ bioData }) => {
  // I.e. Paintings, Prints etc.
  const type =
    bioData.details.type.slice(0, 1).toUpperCase() +
    bioData.details.type.slice(1); // Starts with uppercase

  const Type = (
    <div className={classes.type}>
      <h4 className={classes.bioText}>{type}</h4>
    </div>
  );

  const name = bioData.setTitle; // collections/sets name - I.e. spring-collection, pastel-blue bookmarks collection, etc.
  const Name = (
    <div className={classes.name}>
      <h4 className={classes.bioText}>{name}</h4>
    </div>
  );

  // for future implementation - locate user, find accurate currency, convert euro price to respecive currency
  // need api to save users ip so currency stays
  // need option for manually changing currency
  // const typeOfCurrency = "euro or dollar or something"
  const price = bioData.details.price; // fixed price which is based on euro
  const Price = (
    <div className={classes.price}>
      <h4 className={classes.bioText}>{price + "€"}</h4>
    </div>
  );

  // button which will be adding object to a context containing the cart-information.
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

const ProductComponent = ({ products }) => {
  // map only visible objects to display them as 'pages' which can be navigated by user
  const mappedProductImages = products?.map((product, index) => (
    <div key={index} className={classes.productWrapper}>
      <QuickView
        src={product.image}
        productType={product._embedded.details.type}
        productId={product.id}
      />

      <ProductBio bioData={product?._embedded} />
    </div>
  ));

  return mappedProductImages;
};

// wrapper
const Products = ({ products }) => {
  return (
    <div className={classes.products}>
      <div className={classes.productsContainer}>
        <ProductComponent products={products} />
      </div>
    </div>
  );
};

export default Products;
