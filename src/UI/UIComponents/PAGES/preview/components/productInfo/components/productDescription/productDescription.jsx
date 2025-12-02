import classes from "./productDescription.module.scss";

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
    return <li>{value}</li>;
  }
};

const Entry = ({ entry, obj }) => {
  const capitalEntry = capitalizeFirstLetter(entry);

  return (
    <li className={classes.entryContainer}>
      <span className={classes.entry}>{capitalEntry}</span>
      <ul className={classes.value}>
        <EntryValue value={obj} />
      </ul>
    </li>
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
    <ul className={classes.productDescription}>
      {infoEntries.map(([entry, obj], index) => (
        <Entry key={index} entry={entry} obj={obj} />
      ))}
    </ul>
  );
};

export default ProductDescription;
