import classes from "./uniqueImage.module.scss";

import UniqueTopSection from "./uniqueTopSection/uniqueTopSection";
import UniqueInfoSection from "./uniqueInfoSection/uniqueInfoSection";
import { useContext, useEffect } from "react";
import UniqueImageContext from "../uniqueImageContext";
import { useLocation, useParams } from "react-router-dom";

const UniqueImage = ({ data }) => {
  const { uniqueImage, setUniqueImage } = useContext(UniqueImageContext);
  const { key, hash } = useLocation();
  const { type, id } = useParams();

  useEffect(() => {
    // if user refreshes page, uniqueImage wont be set (no previous interaction with the front-page). But the correct product still needy to be displayed
    if (!uniqueImage) {
      // create a function that goes through whole api and finds correct id and maybe a matching type to prevent errors for same id's
    }
    console.log(data, type, id);
    console.log(data?.[type]);
  }, []);

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
