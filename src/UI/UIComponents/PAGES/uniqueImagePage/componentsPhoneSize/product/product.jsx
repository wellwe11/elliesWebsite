import classes from "./product.module.scss";

const Product = ({ info, foundObject }) => {
  const details = info?.details, // info which is used on uniqueInfoSection. It contains things such as size, color, type etc.
    extendedDetailsImages = foundObject?.images.map((image) => image.src); // set of images which are related to the set (only 'main-type images')

  return (
    <UniqueInfoSection
      images={extendedDetailsImages}
      textInfo={details}
      foundObject={foundObject}
    />
  );
};

export default Product;
