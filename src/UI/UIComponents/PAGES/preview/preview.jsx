import classes from "./preview.module.scss";

import routeClasses from "../../routeContainer/routeContainer.module.scss";

import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import ProductInfo from "./components/productInfo/productInfo.jsx";

import ArrowNoBodySVG from "@components/SVGS/arrowNoBodySVG/arrowNoBodySVG";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import bodyNoScroll from "@functions/bodyNoScroll";
import ExtendedProductInfo from "./components/extendedProductInfo/extendedProductInfo.jsx";

import Footer from "../../FOOTER/footer.jsx";

const ActiveImage = ({ productProps, activeImageIndex }) => {
  const {
    displayedDetails: { quickViewImages },
  } = productProps;

  return (
    <div className={classes.activeImageWrapper}>
      <img
        className={classes.activeImage}
        src={quickViewImages?.[activeImageIndex]}
        alt=""
      />
    </div>
  );
};

const Info = ({ productProps, activeImageIndex, setActiveImageIndex, obj }) => {
  return (
    <div className={classes.infoWrapper}>
      <ProductInfo
        obj={obj}
        productProps={productProps}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />
    </div>
  );
};

// Element containing product-image and product-info
const DisplayProductContainer = ({ productProps, obj }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0); // A list of other images related to currently viewed product which are clickable. Clicking one displays it to the side for user to inspect it as a bigger image

  return (
    <div className={classes.imageContainer}>
      <ActiveImage
        productProps={productProps}
        activeImageIndex={activeImageIndex}
      />
      <Info
        obj={obj}
        productProps={productProps}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />
    </div>
  );
};

const ExtendedInfo = ({ productProps }) => {
  // price, type, width, height, frame, description,
  const {
      all: {
        details: { price, type, height, width, set },
        setDescription,
      },
    } = productProps,
    props = { price, height, width, type, set },
    description = setDescription;

  return (
    <div className={classes.extendedInfo}>
      <ExtendedProductInfo props={props} description={description} />
    </div>
  );
};

const IsLoading = ({ isLoading }) => {
  const navigate = useNavigate(); // navigates to a backgroundLocation
  const { enableScroll } = bodyNoScroll();

  return (
    <div className={classes.preview}>
      <LoadingWrapper
        onClick={() => {
          enableScroll();
          navigate(-1);
        }}
        condition={isLoading}
      />
    </div>
  );
};

const Preview = ({ productProps, isLoading, obj }) => {
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
              <DisplayProductContainer productProps={productProps} obj={obj} />
              <ExtendedInfo productProps={productProps} />
            </div>
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
