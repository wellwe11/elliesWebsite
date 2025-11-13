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
    return value.map((v) => (
      <div className={classes.ref} style={{ backgroundColor: v }} />
    ));
  }

  if (result === "primitive") {
    return (
      <h1 className={`${previewClass.titleTypeText} ${classes.value}`}>
        {value}
      </h1>
    );
  }
};

const Entry = ({ entry, entryWidth, obj }) => {
  const capitalEntry = capitalizeFirstLetter(entry);

  return (
    <div className={classes.entryContainer} style={{ width: `${entryWidth}%` }}>
      <div className={classes.refContainer}>{<EntryValue value={obj} />}</div>
      <p className={previewClass.bioTypeText}>{capitalEntry}</p>
    </div>
  );
};

// Product will have a short description and this button is a boolean to display it or to hide the description
const ProductDescription = ({ infoDetails }) => {
  const infoEntries = Object.entries(infoDetails);
  const entryWidth = 100 / infoEntries.length;

  return (
    <div className={classes.productDescription}>
      <div className={classes.info}>
        {infoEntries.map(([entry, obj], index) => (
          <Entry key={index} entry={entry} entryWidth={entryWidth} obj={obj} />
        ))}
      </div>
    </div>
  );
};

export default ProductDescription;
