import classes from "./products.module.scss";

import QuickView from "@fullyComponents/quickView/quickView";

import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";

// element that displays specified information about a product. In this case: The collections name, it's type, and the price.
const ProductBio = ({ product, bioData }) => {
  // I.e. Paintings, Prints etc.
  const type = capitalizeFirstLetter(bioData.details.type);

  const Type = (
    <div className={classes.type}>
      <p className={classes.bioText}>{type}</p>
    </div>
  );

  const styledName =
    bioData.setTitle.length > 20
      ? bioData.setTitle.slice(0, bioData.setTitle[19] === " " ? 19 : 20) +
        "..."
      : bioData.setTitle; // collections/sets name - I.e. spring-collection, pastel-blue bookmarks collection, etc.

  const Name = (
    <div className={classes.name}>
      <h5 className={classes.bioText}>{capitalizeFirstLetter(styledName)}</h5>
    </div>
  );

  // for future implementation - locate user, find accurate currency, convert euro price to respecive currency
  // need api to save users ip so currency stays
  // need option for manually changing currency
  // const typeOfCurrency = "euro or dollar or something"
  const price = bioData.details.price; // fixed price which is based on euro
  const Price = (
    <div className={classes.price}>
      <p className={classes.bioText}>{price + " €"}</p>
    </div>
  );

  const moreImages = product.images;
  const moreImagesWrapper = (
    <div className={classes.moreImagesWrapper}>
      {moreImages.map((img, index) => (
        <div
          className={classes.imageContainer}
          style={{ right: `${index * 17}px`, zIndex: index }}
        >
          <img src={img.src} alt="" />
        </div>
      ))}
    </div>
  );

  return (
    <div className={classes.productBioSection}>
      <div className={classes.productBio}>
        <div className={classes.bioTopSection}>
          <div className={classes.nameAndMore}>
            {Name}
            {moreImagesWrapper}
          </div>
          <div className={classes.bioInfo}>
            {Type} {Price}
          </div>
        </div>
      </div>
      {/* {addToCartButton} */}
    </div>
  );
};

const Products = ({ products }) => {
  // map only visible objects to display them as 'pages' which can be navigated by user

  const mappedProductImages = (
    <div className={classes.productsContainer}>
      {products?.map((product, index) => (
        <div key={index} className={classes.productWrapper}>
          <div className={classes.productImageWrapper}>
            <QuickView
              src={product.image}
              secondSrc={product._embedded.restImages[0]}
              productType={product._embedded.details.type}
              productId={product.id}
            />
          </div>
          <ProductBio product={product} bioData={product?._embedded} />
        </div>
      ))}
    </div>
  );

  return <div className={classes.products}>{mappedProductImages}</div>;
};

export default Products;
