import classes from "./products.module.scss";

import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";
import setRef from "@functions/setRefs.js";
import intersecter from "@functions/interSection.js";

// element that displays specified information about a product. In this case: The collections name, it's type, and the price.
const ProductBio = ({ product, bioData }) => {
  // I.e. Paintings, Prints etc.
  const detailsType = bioData.details.type,
    type = capitalizeFirstLetter(detailsType);

  const Type = (
    <div className={classes.type}>
      <p className={classes.bioText}>{type}</p>
    </div>
  );

  const setTitle = bioData.setTitle,
    titlelength = 20,
    styledName =
      setTitle.length > titlelength
        ? setTitle.slice(
            0,
            setTitle[titlelength] === " " ? titlelength - 1 : titlelength
          ) + "..."
        : setTitle; // collections/sets name - I.e. spring-collection, pastel-blue bookmarks collection, etc.

  const Name = (
    <div className={classes.name}>
      <h5 className={classes.bioText}>{capitalizeFirstLetter(styledName)}</h5>
    </div>
  );

  const moreImages = product.images;
  const moreImagesWrapper = (
    <div className={classes.moreImagesWrapper}>
      {moreImages.map((img, index) => (
        <div
          key={index}
          className={classes.imageContainer}
          style={{ right: `${index * 12}px`, zIndex: -index }}
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
          <div className={classes.bioInfo}>{Type}</div>
        </div>
      </div>
    </div>
  );
};

const Product = ({ productRefs, index, product }) => {
  const navigate = useNavigate();

  const {
      id: productId,
      image: productImage,
      _embedded: {
        details: { type: productType },
      },
    } = product,
    bio = product._embedded;

  const transitionDelay = `${index * 0.03}s`,
    productStyle = {
      transitionDelay,
    };

  return (
    <div
      className={classes.productWrapper}
      ref={(e) => setRef(e, productRefs)}
      style={productStyle}
    >
      <div className={classes.productImageWrapper}>
        <img
          src={productImage}
          className={classes.productImage}
          onClick={() =>
            navigate(`./preview?category=${productType}&id=${productId}`, {
              state: { backgroundLocation: location.pathname },
            })
          }
        />
      </div>
      <ProductBio product={product} bioData={bio} />
    </div>
  );
};

const Products = ({ products }) => {
  const productRefs = useRef([]);

  // const { intersect } = useMemo(
  //   () =>
  //     intersecter({
  //       style: {
  //         transitionDelay: "0.03}s",
  //         opacity: "1",
  //         transform: "translateY(0)",
  //         filter: "blur(0)",
  //       },
  //       unMount: true,
  //       treshhold: 0.4,
  //       rootMargin: "0px 0px 0px 0px",
  //     }),
  //   []
  // );

  // useEffect(() => {
  //   if (!products || !productRefs.current.length) return;

  //   const observer = productRefs.current.map((el) => {
  //     const singleRef = { current: el };

  //     return intersect(singleRef);
  //   });

  //   return () => {
  //     observer.forEach((obs) => obs.disconnect());
  //   };
  // }, [products.length]);

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
