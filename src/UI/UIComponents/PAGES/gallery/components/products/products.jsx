import classes from "./products.module.scss";

import QuickView from "@fullyComponents/quickView/quickView";

import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import setRef from "../../../../../../abstract/functions/setRefs.js";

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

  const moreImages = product.images;
  const moreImagesWrapper = (
    <div className={classes.moreImagesWrapper}>
      {moreImages.map((img, index) => (
        <div
          key={index}
          className={classes.imageContainer}
          style={{ right: `${index * 13}px`, zIndex: index }}
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

const Products = ({ products }) => {
  const navigate = useNavigate();

  const productRefs = useRef([]);

  useEffect(() => {
    if (products.length < 1) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry && entry.isIntersecting) {
            entry.target.style.transitionDelay = `${index * 0.03}s`;
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.filter = "blur(0)";

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    productRefs.current.forEach((el) => observer.observe(el));

    return () => {
      productRefs.current.forEach((el) => observer.unobserve(el));
    };
  }, [products.length]);

  const mappedProductImages = (
    <div className={classes.productsContainer}>
      {products?.map((product, index) => (
        <div
          key={index}
          className={classes.productWrapper}
          ref={(e) => setRef(e, productRefs)}
        >
          <div className={classes.productImageWrapper}>
            <img
              src={product.image}
              className={classes.productImage}
              onClick={() =>
                navigate(
                  `/uniqueImage?category=${product._embedded.details.type}&id${product.id}`
                )
              }
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
