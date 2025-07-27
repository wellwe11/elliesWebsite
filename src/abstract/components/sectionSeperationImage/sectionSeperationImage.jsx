import classes from "./sectionSeperationImage.module.scss";

const SectionSeperationImage = ({ imgSrc, imgAlt }) => {
  return (
    <div className={classes.sectionSeperationImageWrapper}>
      {imgSrc && imgSrc.length > 0 ? (
        <img
          className={classes.image}
          src={imgSrc || ""}
          alt={imgAlt || "alt"}
        />
      ) : (
        <div className={classes.image} />
      )}
    </div>
  );
};

export default SectionSeperationImage;
