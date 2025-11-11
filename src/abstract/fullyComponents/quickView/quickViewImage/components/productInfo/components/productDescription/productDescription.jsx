import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";
import classes from "./productDescription.module.scss";

const valueTypeChecker = (val) => {
  if (typeof val === "object" && typeof val !== "function" && val !== null) {
    return "reference";
  } else {
    return "primitive";
  }
};

const EntryValue = ({ value }) => {
  const result = valueTypeChecker(value);

  if (result === "reference") {
    return value.map((v) => (
      <div className={classes.ref} style={{ backgroundColor: v }} />
    ));
  }

  if (result === "primitive") {
    return (
      <h1 className={`${classes.titleTypeText} ${classes.value}`}>{value}</h1>
    );
  }
};

// Product will have a short description and this button is a boolean to display it or to hide the description
const ProductDescription = ({ infoDetails }) => {
  const infoEntries = Object.entries(infoDetails);

  const entryTitle = infoEntries.map(([entry, obj], index) => {
    const capitalEntry = capitalizeFirstLetter(entry);

    return (
      <div
        className={classes.entryContainer}
        key={index}
        style={{ width: `calc(${100 / infoEntries.length}%)` }}
      >
        <div className={classes.refContainer}>{<EntryValue value={obj} />}</div>
        <p className={classes.bioTypeText}>{capitalEntry}</p>
      </div>
    );
  });

  return (
    <div className={classes.productDescription}>
      <div className={classes.info}>{entryTitle}</div>
    </div>
  );
};

export default ProductDescription;
