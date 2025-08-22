import classes from "./uniqueImage.module.scss";

import UniqueTopSection from "./uniqueTopSection/uniqueTopSection";
import UniqueInfoSection from "./uniqueInfoSection/uniqueInfoSection";
import { useContext, useEffect, useState } from "react";
import UniqueImageContext from "../uniqueImageContext";
import { useLocation, useParams } from "react-router-dom";

const UniqueImage = ({ data }) => {
  const { uniqueImage, setUniqueImage } = useContext(UniqueImageContext);
  const [foundObject, setFoundObject] = useState(null);
  const { type, id } = useParams();

  useEffect(() => {
    if (!data || !type || !id) return;

    const foundUniqueImage = data?.[type].find((obj) => obj.id === +id);

    console.log(foundUniqueImage);
    if (foundUniqueImage) {
      setFoundObject(foundUniqueImage);
    }
  }, [data, type, id]);

  console.log("before", foundObject);
  if (foundObject === null) return <h1>loading...</h1>;
  console.log("after", foundObject);

  const info = foundObject._embedded;

  const title = {
    title: "Hello,",
    bio: "Hello Two",
  };
  const topBio = {
    title: "consectetuer adipiscing elit.",
    bio: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.",
  };

  const topImage = foundObject.image;
  const productName = info?.setTitle;
  const productDescription = info?.setDescription;
  const details = info?.details;
  const extendedDetailsImages = foundObject?.images.map((image) => image.src);

  return (
    <div className={classes.uniqueImage}>
      <section className={`${classes.snapStart} ${classes.first}`}>
        <UniqueTopSection
          topImage={topImage}
          textInfo={topBio}
          titleInfo={title}
        />
      </section>
      <section className={classes.snapStart}>
        <UniqueInfoSection
          images={extendedDetailsImages}
          textInfo={details}
          setTitle={productName}
        />
      </section>
    </div>
  );
};

export default UniqueImage;
