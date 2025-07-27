import classes from "./sectionSeperationImage.module.scss";

const SectionSeperationImage = ({ imgSrc, imgAlt, margin = "20px" }) => {
  return (
    <div
      className={classes.sectionSeperationImageWrapper}
      style={{ marginBottom: margin, marginTop: margin }}
    >
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
