import classes from "./paintings.module.scss";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";

import WheelOfManyImages from "@fullyComponents/wheelOfManyImages/wheelOfManyImages";
import ExploreNewIn from "@fullyComponents/exploreNewIn/exploreNewIn";
import SetOfimagesWithText from "@fullyComponents/SetOfImagesWithText/setOfImagesWithText";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";

// section to view many different collections (1 image per collection) which is clickable
const WheelImagesSection = ({ wheelImages, quickViewImages }) => {
  return (
    <section className={classes.wheelImagesSection}>
      <div>
        <h1>{"Placeholder title"}</h1>
      </div>
      <WheelOfManyImages
        images={wheelImages}
        quickViewImages={quickViewImages}
        canQuickView={true}
      />
    </section>
  );
};

const Paintings = ({
  wheelImages,
  images,
  quickViewImages,
  texts,
  textBioTitle,
}) => {
  // if user clicks on any image, will navigate to collection
  const navigate = handleNavigateSmooth();

  // Title for section of prints
  const titleWrapper = (
    <div className={classes.titleWrapper}>
      <h1 className={classes.title}>Paintings</h1>
    </div>
  );

  // Example section of a collection of prints
  const setOfExampleCollectionSection = (
    <section
      className={classes.exampleCollectionSection}
      onClick={() => navigate("/uniqueImage")}
    >
      <SetOfimagesWithText
        images={images}
        texts={texts}
        textBioTitle={textBioTitle || "Please insert a title"}
      />
    </section>
  );

  // section containing most recently added print together with some text
  const exploreNewInSection = (
    <section className={classes.exploreNewInSection}>
      <ExploreNewIn />
    </section>
  );

  // adds space between sections
  const sectionSeperationImage = (
    <div className={classes.sectionSeperationImage}>
      <SectionSeperationImage />
    </div>
  );

  return (
    <div className={classes.paintings}>
      {titleWrapper}

      {setOfExampleCollectionSection}
      {sectionSeperationImage}

      <WheelImagesSection
        wheelImages={wheelImages}
        quickViewImages={quickViewImages}
      />
      {sectionSeperationImage}

      {/* Currently contains nothing except small text */}
      {exploreNewInSection}
    </div>
  );
};

export default Paintings;
