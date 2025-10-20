import classes from "./uniqueImage.module.scss";
import { useEffect, memo, useMemo } from "react";

import UniqueTopSection from "./components/uniqueTopSection/uniqueTopSection.jsx";
import UniqueInfoSection from "./components/uniqueInfoSection/uniqueInfoSection.jsx";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";

import Loading from "../../LOADING/loading.jsx";

// Component containing all info for top-section
const UniqueTopSectionComponent = memo(({ info, foundObject }) => {
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
});

// Component containing all info for info-section
const UniqueInfoSectionComponent = ({ info, foundObject }) => {
  const details = info?.details; // info which is used on uniqueInfoSection. It contains things such as size, color, type etc.
  const extendedDetailsImages = useMemo(
    () => foundObject?.images.map((image) => image.src) ?? [],
    [foundObject]
  ); // set of images which are related to the set (only 'main-type images')

  return (
    <UniqueInfoSection
      images={extendedDetailsImages}
      textInfo={details}
      foundObject={foundObject}
    />
  );
};

const UniqueImage = ({ data: { foundObj, info } }) => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const uniqueTopSectionWrapper = (
    <section className={classes.uniqueTopSectionWrapper}>
      <UniqueTopSectionComponent info={info} foundObject={foundObj} />
    </section>
  );

  const uniqueInfoSectionWrapper = (
    <section className={classes.uniqueInfoSectionWrapper}>
      <UniqueInfoSectionComponent info={info} foundObject={foundObj} />
    </section>
  );

  const sectionSeperatorWithImage = (
    // seperates sections with some form of image (currently with a placeholder) and margins
    <div className={classes.sectionSeperationWrapper}>
      <SectionSeperationImage withImage={true} />
    </div>
  );

  const sectionSeperatorNoImage = (
    // seperates sections with some form of image (currently with a placeholder) and margins
    <div className={classes.sectionSeperationWrapper}>
      <SectionSeperationImage />
    </div>
  );

  return (
    <div className={classes.uniqueImage}>
      {uniqueTopSectionWrapper}
      {sectionSeperatorNoImage}

      {sectionSeperatorWithImage}
      {sectionSeperatorNoImage}

      {uniqueInfoSectionWrapper}
      {sectionSeperatorNoImage}
    </div>
  );
};

export default UniqueImage;
