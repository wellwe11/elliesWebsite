import classes from "./uniqueImage.module.scss";

import UniqueTopSection from "./components/uniqueTopSection/uniqueTopSection";
import UniqueInfoSection from "./components/uniqueInfoSection/uniqueInfoSection";

import mainImage from "@assets/welcomeImage.jpg";

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
    <UniqueInfoSection
      images={extendedDetailsImages}
      textInfo={details}
      foundObject={foundObject}
    />
  );
};

const UniqueImage = ({ data, info }) => {
  const uniqueTopSectionWrapper = (
    <section className={classes.uniqueTopSectionWrapper}>
      <UniqueTopSectionComponent info={info} foundObject={data} />
    </section>
  );

  const uniqueInfoSectionWrapper = (
    <section className={classes.uniqueInfoSectionWrapper}>
      <UniqueInfoSectionComponent info={info} foundObject={data} />
    </section>
  );

  const sectionSeperatorWithImage = (
    // seperates sections with some form of image (currently with a placeholder) and margins
    <div className={classes.sectionSeperationWrapper}>
      <SectionSeperationImage imgSrc={mainImage} imgAlt={""} />
    </div>
  );

  return (
    <div className={classes.uniqueImage}>
      {uniqueTopSectionWrapper}
      {sectionSeperatorWithImage}
      {uniqueInfoSectionWrapper}
    </div>
  );
};

export default UniqueImage;
