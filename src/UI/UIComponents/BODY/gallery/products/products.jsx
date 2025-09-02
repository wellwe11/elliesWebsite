import ShoppingBagSVG from "@components/SVGS/shoppingBagSVG/shoppingBagSVG";
import classes from "./products.module.scss";
import {
  QuickViewButton,
  QuickViewImageContainer,
} from "@fullyComponents/wheelOfManyImages/quickView/quickView";
import { useState } from "react";

// element that displays specified information about a product. In this case: The collections name, it's type, and the price.
const ProductBio = ({ bioData }) => {
  const type =
    bioData.details.type.slice(0, 1).toUpperCase() +
    bioData.details.type.slice(1);
  const Type = (
    <div className={classes.type}>
      <h4 className={classes.bioText}>{type}</h4>
    </div>
  );

  const name = bioData.setTitle; // collections name
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

const QuickViewButtonComponent = ({ product, setDisplayImage }) => {
  console.log(product);

  const quickViewButtonWrapper = (
    <div className={classes.quickViewButtonWrapper}>
      <QuickViewButton setDisplayImage={setDisplayImage} />
    </div>
  );

  return (
    <div className={classes.quickViewButtonComponent}>
      {quickViewButtonWrapper}
    </div>
  );
};

const ProductComponent = ({ products, page }) => {
  const [displayImage, setDisplayImage] = useState(false);
  const [activeImageSrc, setActiveImageSrc] = useState(null);

  const activeImageProps = { activeImageSrc, setActiveImageSrc };
  const quickViewProps = {};

  // start displays the absolute minimum of index which is allowed to be shown on each page
  // page starts on 0, goes to 1, 2, 3 etc.
  const start = (page - 1) * 9; // First image is then current (page - 1) * 9. -1 because pages are not based on index, but index + 1 (to avoid page being displayed as 0)
  // So, 0, 8, 18 etc.

  const end = start + 9; // end displays absolute maximum index that is displayed on current page
  // so, 8, 17, 26 etc.

  // slices only visible objects
  const displayedProducts = products.slice(start, end);

  // map only visible objects to display them as 'pages' which can be navigated by user
  const mappedProductImages = displayedProducts.map((product, index) => (
    <div key={index} className={classes.productWrapper}>
      <div className={classes.productImageWrapper}>
        <img className={classes.productImage} src={product.image} alt="" />
        <div className={classes.quickViewButtonComponentWrapper}>
          <QuickViewButtonComponent
            product={product}
            setDisplayImage={setDisplayImage}
          />
        </div>
      </div>
      <ProductBio bioData={product?._embedded} />
      {displayImage && (
        <div className={classes.quickViewImageContainerWrapper}>
          <QuickViewImageContainer
            setDisplayImage={setDisplayImage}
            activeImageProps={activeImageProps}
            quickViewProps={quickViewProps}
          />
        </div>
      )}
    </div>
  ));

  return mappedProductImages;
};

const Products = ({ products, page }) => {
  return (
    <div className={classes.products}>
      <div className={classes.productsContainer}>
        <ProductComponent products={products} page={page} />
      </div>
    </div>
  );
};

export default Products;
