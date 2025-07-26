import classes from "./controlledImage.module.scss";

const ControlledImage = ({ imageSrc, imageAlt }) => {
  return (
    <div className={classes.controlledImageContainer}>
      <img className={classes.controlledImage} src={imageSrc} alt={imageAlt} />
    </div>
  );
};

export default ControlledImage;
