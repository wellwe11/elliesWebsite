import classes from "./preview.module.scss";
import routeClasses from "../../routeContainer/routeContainer.module.scss";

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import ProductInfo from "./components/productInfo/productInfo.jsx";

import ArrowNoBodySVG from "@components/SVGS/arrowNoBodySVG/arrowNoBodySVG";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import ExtendedProductInfo from "./components/extendedProductInfo/extendedProductInfo.jsx";

import Footer from "../../FOOTER/footer.jsx";
import useGetLocation from "@hooks/useGetLocation.jsx";
import bodyNoScroll from "@functions/bodyNoScroll.js";

const MainImage = ({ src }) => {
  return (
    <div className={classes.activeImageWrapper}>
      <img className={classes.activeImage} src={src} alt="" />
    </div>
  );
};

const Info = ({ obj }) => {
  return (
    <div className={classes.infoWrapper}>
      <ProductInfo obj={obj} />
    </div>
  );
};

// Element containing product-image and product-info
const DisplayProductContainer = ({ obj }) => {
  const MainImageSrc = obj.image;
  return (
    <div className={classes.imageContainer}>
      <MainImage src={MainImageSrc} />
      <Info obj={obj} />
    </div>
  );
};

const ExtendedInfo = ({ obj }) => {
  const { price, height, width, type, set, setImages, extraImages } = obj;
  const props = {
    price: `${Math.round(price * 0.85)} €`,
    height: `${height} cm`,
    width: `${width} cm`,
    type,
    set,
  };

  return (
    <div className={classes.extendedInfo}>
      <ExtendedProductInfo props={props} images={setImages || extraImages} />
    </div>
  );
};

const IndividualProducts = ({ obj }) => {
  const navigate = useNavigate();
  const collection = obj?.collection;

  const { location } = useGetLocation();
  const backgroundLocation = location.state?.backgroundLocation || null;

  return (
    <ul className={classes.individualProducts}>
      {collection.map((obj, index) => (
        <li
          className={classes.product}
          key={index}
          onClick={() => {
            navigate(`/preview?category=${obj.type}&id=${obj.id}`, {
              state: {
                backgroundLocation: backgroundLocation
                  ? backgroundLocation
                  : location,
              },
            });
          }}
        >
          <img src={obj.image} alt="" />
          <span className={classes.title}>{obj.setTitle}</span>
        </li>
      ))}
    </ul>
  );
};

const IsLoading = ({ isLoading }) => {
  const navigate = useNavigate(); // navigates to a backgroundLocation

  return (
    <div className={classes.preview}>
      <LoadingWrapper
        onClick={() => {
          navigate(-1);
        }}
        condition={isLoading}
      />
    </div>
  );
};

const Preview = ({ isLoading, obj }) => {
  const fixedPreviewRef = useRef(null);
  const footerRef = useRef(null);

  const { enableScroll, disableScroll } = bodyNoScroll();

  useEffect(() => {
    disableScroll();

    return () => enableScroll();
  }, [disableScroll, enableScroll]);

  useEffect(() => {
    console.log("asd");
    const footerElement = footerRef.current;
    const scrollableElement = fixedPreviewRef.current;

    if (!footerElement || !scrollableElement) return;

    const handleWheel = (e) => {
      e.preventDefault();
      scrollableElement.scrollTop += e.deltaY;
    };

    footerElement.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      footerElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    fixedPreviewRef.current.scrollTo({ top: 0 });
  }, [obj]);

  if (isLoading) return <IsLoading isLoading={isLoading} />;

  if (!obj) return null;

  return (
    <div className={classes.preview}>
      <div className={classes.fixedPreviewContainer} ref={fixedPreviewRef}>
        <div className={classes.backgroundColorWrapper}>
          <div className={routeClasses.contentWrapper}>
            <DisplayProductContainer obj={obj} />
            <ExtendedInfo obj={obj} />
            {obj.collection && (
              <div className={classes.individualWrapper}>
                <h6 className={classes.individualSetTitle}>SET ITEMS</h6>
                <IndividualProducts obj={obj} />
              </div>
            )}
          </div>
        </div>
        <div className={classes.transparentEl} />
      </div>

      <div className={classes.footerWrapper} ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Preview;
