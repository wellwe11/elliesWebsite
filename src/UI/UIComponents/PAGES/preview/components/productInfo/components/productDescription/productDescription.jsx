import classes from "./productDescription.module.scss";
import previewClass from "../../../../preview.module.scss";

import { capitalizeFirstLetter } from "@functions/firstLetterCapital.js";

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
    return value.map((v, index) => (
      <div
        key={v + index}
        className={classes.ref}
        style={{ backgroundColor: v }}
      />
    ));
  }

  if (result === "primitive") {
    return (
      <p className={`${previewClass.bioTypeText} ${classes.value}`}>{value}</p>
    );
  }
};

const Entry = ({ entry, obj }) => {
  const capitalEntry = capitalizeFirstLetter(entry);

  return (
    <div className={classes.entryContainer}>
      <p className={`${classes.entry} ${previewClass.bioTypeText}`}>
        {capitalEntry}
      </p>
      <div className={classes.refContainer}>
        <EntryValue value={obj} />
      </div>
    </div>
  );
};

// Product will have a short description and this button is a boolean to display it or to hide the description
const ProductDescription = ({ obj }) => {
  const { price, colors } = obj;
  const infoDetails = {
    price: obj.collection ? `${Math.round(price * 0.85)} € (15% off)` : price,
    amount: obj.collection ? obj.collection.length : 1,
    colors,
  };

  const infoEntries = Object.entries(infoDetails);

  return (
    <div className={classes.productDescription}>
      <div className={classes.info}>
        {infoEntries.map(([entry, obj], index) => (
          <Entry key={index} entry={entry} obj={obj} />
        ))}
      </div>
    </div>
  );
};

export default ProductDescription;
