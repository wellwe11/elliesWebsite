import { useState } from "react";
import classes from "./GALLERY.module.scss";

const Categories = ({ data }) => {
  const categoryKeys = Object.keys(data);

  return (
    <div>
      {categoryKeys.map((category, index) => (
        <div key={index}>
          <h1>{category}</h1>
        </div>
      ))}
    </div>
  );
};

const Gallery = ({ data }) => {
  return (
    <div className={classes.gallery}>
      <Categories data={data} />
    </div>
  );
};

export default Gallery;
