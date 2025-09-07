import classes from "./uniqueImage.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UniqueTopSection from "./uniqueTopSection/uniqueTopSection";
import UniqueInfoSection from "./uniqueInfoSection/uniqueInfoSection";

// Component containing all info for top-section
const UniqueTopSectionComponent = ({ info, foundObject }) => {
  // currently placeholders right now. Not sure what I will use, but there will be text related to the set somehow.

  const uniqueTopSectionTitles = {
    title: "Hello,",
    bio: "Hello Two",
  };

  // Same image/one of the same images of set which has been clicked.
  const topImage = foundObject.image;

  const topBio = {
    title: info.setTitle,
    bio: info.setDescription,
  };

  return (
    <UniqueTopSection
      topImage={topImage}
      textInfo={{ bioTitle: topBio.title, bioText: topBio.bio }}
      titleInfo={{
        titleOne: uniqueTopSectionTitles.title,
        titleTwo: uniqueTopSectionTitles.bio,
      }}
    />
  );
};

// Component containing all info for info-section
const UniqueInfoSectionComponent = ({ info, foundObject }) => {
  // info which is used on uniqueInfoSection. It contains things such as size, color, type etc.
  const details = info?.details;

  // set of images which are related to the set (only 'main-type images')
  const extendedDetailsImages = foundObject?.images.map((image) => image.src);

  return (
    <UniqueInfoSection images={extendedDetailsImages} textInfo={details} />
  );
};

const UniqueImage = ({ data }) => {
  // state that will store correct item - if you're on this page, correct product needs to be displayed.
  const [foundObject, setFoundObject] = useState(null);

  // checks params for which type (painting/prints etc...) & id (id is printed on each objected after fetch, which is based on their position)
  const { type, id } = useParams();

  useEffect(() => {
    // if no data, return. If no type & id (link is undefined) return
    if (!data || (!type && !id)) return;

    // searches data for a matching id to params
    const foundUniqueImage = data?.[type].find((obj) => obj.id === +id);

    if (foundUniqueImage) {
      setFoundObject(foundUniqueImage);
    }
  }, [data, type, id]);

  // need to design a loading screen in future for these cases
  if (foundObject === null) return <h1>loading...</h1>;

  // _embedded contains all nested information about specifics of product
  const info = foundObject._embedded;

  const uniqueTopSectionWrapper = (
    <section className={`${classes.snapStart} ${classes.first}`}>
      <UniqueTopSectionComponent info={info} foundObject={foundObject} />
    </section>
  );

  const uniqueInfoSectionWrapper = (
    <section className={classes.snapStart}>
      <UniqueInfoSectionComponent info={info} foundObject={foundObject} />
    </section>
  );

  return (
    <div className={classes.uniqueImage}>
      {uniqueTopSectionWrapper}
      {uniqueInfoSectionWrapper}
    </div>
  );
};

export default UniqueImage;
