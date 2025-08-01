import classes from "./sectionSeperationImage.module.scss";
import { useEffect, useRef, useState } from "react";

const SectionSeperationImage = ({ imgSrc, imgAlt }) => {
  // marginTop will change once element is displayed on screen. Creates a moving effect so it looks like an image further away (giving website depths)
  const [marginTop, setMarginTop] = useState(0);

  // ref
  const sectionRef = useRef();

  // refs on-off switch.
  const [refIsIntersecting, setRefIsIntersecting] = useState(false);

  // tracks if ref is intersecting
  useEffect(() => {
    // observer for refs on-off switch
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRefIsIntersecting(true);
      } else {
        setRefIsIntersecting(false);
      }
    });

    // if ref exists
    if (sectionRef.current) {
      observer.observe(sectionRef.current);

      // margin-from top which will be transformed with translateY
      setMarginTop(
        Math.round(sectionRef.current.getBoundingClientRect().top / 60)
      );
    }

    // disconnect
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // updates useState: marginTop while ref is intersecting.
  useEffect(() => {
    // tracks current margin from top
    const trackMargin = () => {
      // if ref exists
      if (sectionRef.current) {
        // if getBoundingClientRect().top is within the size of the size of the ref-element
        if (
          sectionRef.current.getBoundingClientRect().top > 100 &&
          sectionRef.current.getBoundingClientRect().top < 520 &&
          Math.round(sectionRef.current.getBoundingClientRect().top / 70) !==
            marginTop // checks if marginTop actually has changed, avoid unneeded updates
        ) {
          setMarginTop(
            Math.round(sectionRef.current.getBoundingClientRect().top / 70)
          );
        }
      }
    };

    if (refIsIntersecting) {
      window.addEventListener("scroll", trackMargin);

      return () => window.removeEventListener("scroll", trackMargin);
    }
  }, [refIsIntersecting]);

  return (
    <div ref={sectionRef} className={classes.sectionSeperationImageWrapper}>
      {imgSrc && imgSrc.length > 0 ? ( // either you can apply an image or create an empty section to seperate elements
        <img
          className={classes.image}
          src={imgSrc || ""}
          alt={imgAlt || "alt"}
          style={{ transform: `translateY(-${marginTop}px)` }}
        />
      ) : (
        <div className={classes.image} />
      )}
    </div>
  );
};

export default SectionSeperationImage;
