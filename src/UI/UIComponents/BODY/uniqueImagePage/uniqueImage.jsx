import classes from "./uniqueImage.module.scss";

import placeholderImageOne from "@assets/exampleImages/imageExampleOne.jpg";
import placeholderImageTwo from "@assets/exampleImages/imageExampleTwo.jpg";
import placeholderImageThree from "@assets/exampleImages/imageExampleThree.jpg";

import UniqueTopSection from "./uniqueTopSection/uniqueTopSection";
import UniqueInfoSection from "./uniqueInfoSection/uniqueInfoSection";
import { useContext } from "react";
import UniqueImageContext from "../uniqueImageContext";

const UniqueImage = () => {
  const { uniqueImage } = useContext(UniqueImageContext);

  console.log(uniqueImage);

  if (uniqueImage) {
    const title = {
      title: "Hello,",
      bio: "Hello Two",
    };
    const topImage = uniqueImage.image;
    const topBio = {
      title: "consectetuer adipiscing elit.",
      bio: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.",
    };

    const productName = uniqueImage.bioInfo.setTitle;
    const details = uniqueImage._embedded.details;
    const extendedDetailsImages = uniqueImage.bioInfo.images.map(
      (image) => image.src
    );

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
  }
};

export default UniqueImage;
