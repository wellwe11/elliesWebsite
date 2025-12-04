import classes from "./products.module.scss";

import { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";
import setRef from "@functions/setRefs.js";

// element that displays specified information about a product. In this case: The collections name, it's type, and the price.
const ProductBio = ({ product }) => {
  // I.e. Paintings, Prints etc.
  const detailsType = product.type,
    setType = product.set,
    type = capitalizeFirstLetter(detailsType);

  const setTitle = product.setTitle,
    titlelength = 30,
    styledName =
      setTitle.length > titlelength
        ? setTitle.slice(
            0,
            setTitle[titlelength] === " " ? titlelength - 1 : titlelength
          ) + "..."
        : setTitle; // collections/sets name - I.e. spring-collection, pastel-blue bookmarks collection, etc.

  return (
    <div className={classes.productBioSection}>
      <div className={classes.productBio}>
        <div className={classes.bioTopSection}>
          <div className={classes.nameAndMore}>
            <p className={classes.bioText}>{styledName}</p>
            <p className={classes.bioText}>{setType}</p>
          </div>
          <div className={classes.bioInfo}>
            <div className={classes.type}>
              <p className={classes.bioText}>{type}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Product = ({ productRefs, index, product }) => {
  const navigate = useNavigate();

  const { id: productId, image, type: productType } = product;

  const transitionDelay = `${index * 0.03}s`,
    productStyle = {
      transitionDelay,
    };

  return (
    <div
      className={classes.productWrapper}
      ref={(e) => setRef(e, productRefs)}
      style={productStyle}
      onClick={() =>
        navigate(`/preview?category=${productType}&id=${productId}`, {
          state: {
            backgroundLocation: {
              pathname: location.pathname,
              search: location.search,
              hash: location.hash,
            },
          },
        })
      }
    >
      <div className={classes.productImageWrapper}>
        <img src={image} className={classes.productImage} />
      </div>
      <ProductBio product={product} />
    </div>
  );
};

const Products = ({ products }) => {
  const productRefs = useRef([]);

  const mappedProductImages = useMemo(
    () => (
      <div className={classes.productsContainer}>
        {products?.map((product, index) => (
          <Product
            key={index}
            productRefs={productRefs}
            index={index}
            product={product}
          />
        ))}
      </div>
    ),
    [products]
  );

  return <div className={classes.products}>{mappedProductImages}</div>;
};

export default Products;
