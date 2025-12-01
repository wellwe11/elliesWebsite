import classes from "./preview.module.scss";
import routeClasses from "../../routeContainer/routeContainer.module.scss";

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import ProductInfo from "./components/productInfo/productInfo.jsx";

import ArrowNoBodySVG from "@components/SVGS/arrowNoBodySVG/arrowNoBodySVG";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import ExtendedProductInfo from "./components/extendedProductInfo/extendedProductInfo.jsx";

import Footer from "../../FOOTER/footer.jsx";

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
  const { price, height, width, type, set, setImages } = obj;
  const props = { price, height, width, type, set };

  return (
    <div className={classes.extendedInfo}>
      <ExtendedProductInfo props={props} images={setImages} />
    </div>
  );
};

const IndividualProducts = ({ obj }) => {
  console.log(obj);
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
  // Check if obj is a set or single
  // for extendedProductInfo:
  // if single:
  // add into data a couple of more images inside of single images and use those
  // (this will fix bug where currently single-items cannot be clicked)

  // if collection:
  // use current setup which uses restImages
  // display IndividualProducts, which is an element that shows all indidivual items if user wants to view those instead

  const fixedPreviewRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
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

  if (isLoading) return <IsLoading isLoading={isLoading} />;

  return (
    <div className={classes.preview}>
      <div className={classes.fixedPreviewContainer} ref={fixedPreviewRef}>
        <div>
          <div className={classes.backgroundColorWrapper}>
            <div className={routeClasses.contentWrapper}>
              <DisplayProductContainer obj={obj} />
              <ExtendedInfo obj={obj} />
            </div>
          </div>
        </div>
        <div>
          <IndividualProducts obj={obj} />
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
