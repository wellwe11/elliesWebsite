import classes from "./preview.module.scss";
import routeClasses from "../../routeContainer/routeContainer.module.scss";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProductInfo from "./components/productInfo/productInfo.jsx";

import ArrowNoBodySVG from "@components/SVGS/arrowNoBodySVG/arrowNoBodySVG";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import ExtendedProductInfo from "./components/extendedProductInfo/extendedProductInfo.jsx";

import Footer from "../../FOOTER/footer.jsx";

const ActiveImage = ({ setImages, activeImageIndex }) => {
  return (
    <div className={classes.activeImageWrapper}>
      <img
        className={classes.activeImage}
        src={setImages?.[activeImageIndex]}
        alt=""
      />
    </div>
  );
};

const Info = ({ activeImageIndex, setActiveImageIndex, obj }) => {
  return (
    <div className={classes.infoWrapper}>
      <ProductInfo
        obj={obj}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />
    </div>
  );
};

// Element containing product-image and product-info
const DisplayProductContainer = ({ obj }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0); // A list of other images related to currently viewed product which are clickable. Clicking one displays it to the side for user to inspect it as a bigger image
  const { setImages, image } = obj;

  return (
    <div className={classes.imageContainer}>
      <ActiveImage
        setImages={setImages || [image]}
        activeImageIndex={activeImageIndex}
      />
      <Info
        obj={obj}
        activeImageIndex={activeImageIndex}
        setActiveImageIndex={setActiveImageIndex}
      />
    </div>
  );
};

const ExtendedInfo = ({ obj }) => {
  const { price, height, width, type, set, setDescription } = obj;
  const props = { price, height, width, type, set };
  const description = setDescription;

  return (
    <div className={classes.extendedInfo}>
      <ExtendedProductInfo props={props} description={description} />
    </div>
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
        <div className={classes.transparentEl} />
      </div>

      <div className={classes.footerWrapper} ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default Preview;
