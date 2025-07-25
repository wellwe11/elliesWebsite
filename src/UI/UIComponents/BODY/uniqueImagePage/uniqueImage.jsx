import classes from "./uniqueImage.module.scss";

import placeholderImageOne from "@assets/exampleImages/imageExampleOne.jpg";
import placeholderImageTwo from "@assets/exampleImages/imageExampleTwo.jpg";
import placeholderImageThree from "@assets/exampleImages/imageExampleThree.jpg";

import intersectingRefs from "@functions/intersectingRefs";
import UniqueTopSection from "./uniqueTopSection/uniqueTopSection";
import UniqueInfoSection from "./uniqueInfoSection/uniqueInfoSection";

const info = {
  images: {
    imageOne: placeholderImageOne,
    imageTwo: placeholderImageTwo,
    imageThree: placeholderImageThree,
  },

  uniqueTopSection: {
    title: {
      title: "Hello,",
      bio: "Hello Two",
    },

    bio: {
      title: "consectetuer adipiscing elit.",
      bio: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.",
    },
  },

  uniqueBottomSection: {
    DETAILS: {
      Colors: ["Red", "Blue", "White"],
      Height: "35cm",
      Width: "20cm",
      Type: "Print",
      Amount: 3,
    },
  },
};

const UniqueImage = () => {
  return (
    <div className={classes.uniqueImage}>
      <section className={`${classes.snapStart} ${classes.first}`}>
        <UniqueTopSection
          images={info.images}
          textInfo={info.uniqueTopSection}
        />
      </section>
      <section className={classes.snapStart}>
        <UniqueInfoSection
          images={info.images}
          textInfo={info.uniqueBottomSection}
        />
      </section>
    </div>
  );
};

export default UniqueImage;
