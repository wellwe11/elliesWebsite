import classes from "./uniqueImage.module.scss";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import mainImage from "@assets/welcomeImage.jpg";

import UniqueTopSection from "./uniqueTopSection/uniqueTopSection";
import UniqueInfoSection from "./uniqueInfoSection/uniqueInfoSection";
import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";

// Component containing all info for top-section
const UniqueTopSectionComponent = ({ info, foundObject }) => {
  // currently placeholders right now. Not sure what I will use, but there will be text related to the set somehow.

  const uniqueTopSectionTitles = {
      title: "Hello,",
      bio: "Hello Two",
    },
    topImage = foundObject.image, // Same image/one of the same images of set which has been clicked.
    topBio = {
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
      foundObject={foundObject}
    />
  );
};

// Component containing all info for info-section
const UniqueInfoSectionComponent = ({ info, foundObject }) => {
  const details = info?.details, // info which is used on uniqueInfoSection. It contains things such as size, color, type etc.
    extendedDetailsImages = foundObject?.images.map((image) => image.src); // set of images which are related to the set (only 'main-type images')

  return (
    <UniqueInfoSection images={extendedDetailsImages} textInfo={details} />
  );
};

const UniqueImage = ({ data }) => {
  const [foundObject, setFoundObject] = useState(null); // state that will store correct item - if you're on this page, correct product needs to be displayed.

  const containerRef = useRef();

  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null,
    id = searchParams.get("page") || null;

  useEffect(() => {
    if (!data || (!category && !+id)) return; // if no data, return. If no type & id (link is undefined) return

    const foundUniqueImage = data?.[category].find((obj) => obj.id === +id); // searches data for a matching id to params

    if (foundUniqueImage) {
      setFoundObject(foundUniqueImage);
    }
  }, [data, category, id]);

  if (foundObject === null) return <h1>loading...</h1>; // need to design a loading screen in future for these cases

  const info = foundObject._embedded, // _embedded contains all nested information about specifics of product
    uniqueTopSectionWrapper = (
      <section className={classes.uniqueTopSectionWrapper}>
        <UniqueTopSectionComponent info={info} foundObject={foundObject} />
      </section>
    );

  const uniqueInfoSectionWrapper = (
    <section className={classes.uniqueInfoSectionWrapper}>
      <UniqueInfoSectionComponent info={info} foundObject={foundObject} />
    </section>
  );

  const sectionSeperatorWithImage = (
    // seperates sections with some form of image (currently with a placeholder) and margins
    <div className={classes.sectionSeperationWrapper}>
      <SectionSeperationImage imgSrc={mainImage} imgAlt={""} />
    </div>
  );

  return (
    <div className={classes.uniqueImage} ref={containerRef}>
      {uniqueTopSectionWrapper}
      {sectionSeperatorWithImage}
      {uniqueInfoSectionWrapper}
    </div>
  );
};

export default UniqueImage;
