import { useEffect, useRef, useState } from "react";
import classes from "./sectionSeperationImage.module.scss";

const SectionSeperationImage = ({
  imgSrc,
  imgAlt,
  margin = "20px",
  height = "100px",
}) => {
  const [marginTop, setMarginTop] = useState(0);
  const [refIsIntersecting, setRefIsIntersecting] = useState(false);
  const sectionRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRefIsIntersecting(true);
      } else {
        setRefIsIntersecting(false);
      }
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
      setMarginTop(
        Math.round(sectionRef.current.getBoundingClientRect().top / 60)
      );
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const trackMargin = () => {
      if (sectionRef.current) {
        if (
          sectionRef.current.getBoundingClientRect().top > 100 &&
          sectionRef.current.getBoundingClientRect().top < 520 &&
          Math.round(sectionRef.current.getBoundingClientRect().top / 70) !==
            marginTop
        ) {
          console.log(
            Math.round(sectionRef.current.getBoundingClientRect().top / 70)
          );
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
    <div
      ref={sectionRef}
      className={classes.sectionSeperationImageWrapper}
      style={{ marginBottom: margin, marginTop: margin, height: height }}
    >
      {imgSrc && imgSrc.length > 0 ? (
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
