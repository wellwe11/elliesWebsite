import classes from "./extendedProductInfo.module.scss";

const DescriptionElement = ({ obj }) => {
  const key = obj[0].toUpperCase();
  const value = obj[1];

  const Text = ({ children }) => (
    <h6 className={`${classes.bioText} ${classes.textWeight}`}>{children}</h6>
  );

  return (
    <div className={classes.elWrapper}>
      <Text>{key}</Text>
      <Text>{value}</Text>
    </div>
  );
};

const Description = ({ data }) => {};

const Info = ({ data }) => {
  const entries = Object.entries(data);

  return (
    <div className={classes.infoWrapper}>
      <h3 className={`${classes.infoTitle} ${classes.textWeight}`}>DETAILS</h3>
      {entries.map(([key, obj], index) => (
        <DescriptionElement obj={[key, obj]} key={index} />
      ))}
    </div>
  );
};

const ExtendedProductInfo = ({ props, description }) => {
  return (
    <div className={classes.extendedProductInfo}>
      <Info data={props} />
      <Description data={description} />
    </div>
  );
};

export default ExtendedProductInfo;
