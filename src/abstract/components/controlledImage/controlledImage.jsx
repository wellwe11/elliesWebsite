import classes from "./controlledImage.module.scss";

// abstract container for images.
// to collectively control images style
const ControlledImage = ({ imageSrc, imageAlt = "imageAlt" }) => {
  return (
    <div className={classes.controlledImageContainer}>
      <img className={classes.controlledImage} src={imageSrc} alt={imageAlt} />
    </div>
  );
};

export default ControlledImage;
