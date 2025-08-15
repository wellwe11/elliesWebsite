import classes from "./prints.module.scss";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";

import WheelOfManyImages from "@fullyComponents/wheelOfManyImages/wheelOfManyImages";
import ExploreNewIn from "@fullyComponents/exploreNewIn/exploreNewIn";
import SetOfimagesWithText from "@fullyComponents/SetOfImagesWithText/setOfImagesWithText";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";
import { useEffect, useState } from "react";

// Example section of a collection of prints
const SetOfExampleCollectionSection = ({ data }) => {
  // if user clicks on any image, will navigate to collection
  const navigate = handleNavigateSmooth();

  // set of images and their sources (this is for the 3-set images which have rolling-text)
  const [printImagesSrc, setPrintImagesSrc] = useState(null);
  // corresponding texts to each image
  const [printImagesText, setPrintImagesText] = useState(null);

  // automated data which finds last image. This is because front-page should represent the most recently added collection, to keep it 'fresh' and nicely updated
  const mostRecentlyAddedSet = data[data.length - 1];

  // sets title
  const textBioTitle = mostRecentlyAddedSet.bioInfo.setTitle;

  useEffect(() => {
    if (!mostRecentlyAddedSet) return;

    const sources = [];
    const bios = [];

    // images, their source and related text
    const printsImages = mostRecentlyAddedSet.bioInfo.images;

    printsImages.forEach((image) => {
      sources.push(image.src);
      bios.push(image.bio);
    });

    setPrintImagesSrc(sources);
    setPrintImagesText(bios);
  }, [data]);

  if (printImagesSrc && printImagesText) {
    return (
      <section
        className={classes.exampleCollectionSection}
        onClick={() => navigate("/uniqueImage")}
      >
        <SetOfimagesWithText
          images={printImagesSrc}
          texts={printImagesText}
          textBioTitle={textBioTitle || "Please insert a title"}
        />
      </section>
    );
  }
};

// section to view many different collections (1 image per collection) which is clickable
const WheelImagesSection = ({ data }) => {
  // If quickView is clicked (to display info about image), activeImageSrc is data fetched for that specific item
  const [activeImageSrc, setActiveImageSrc] = useState(null);

  // information displayed once you click quickview
  const [activeQuickViewData, setActiveQuickViewData] = useState(null);

  // extended data which is used by extended components (interactive components which only need data once they're interacted with)
  const embeddedData = data.map((obj) => obj._embedded);

  // mapped objects using their 'representive-image'
  const wheelImages = data.map((obj) => obj.image);

  useEffect(() => {
    if (!activeImageSrc) setActiveQuickViewData(null);

    setActiveQuickViewData(embeddedData[activeImageSrc]);
  }, [activeImageSrc]);

  return (
    <section className={classes.wheelImagesSection}>
      <div>
        <h1>{"Placeholder title"}</h1>
      </div>
      <WheelOfManyImages
        images={wheelImages}
        activeImageSrc={activeImageSrc}
        setActiveImageSrc={setActiveImageSrc}
        canQuickView={true}
        quickViewImages={activeQuickViewData?.restImages}
        quickViewTitle={"some title"}
        quickViewPrice={activeQuickViewData?.price}
        quickViewBio={activeQuickViewData?.setDescription}
      />
    </section>
  );
};

const Prints = ({ data }) => {
  // Title for section of prints
  const titleWrapper = (
    <div className={classes.titleWrapper}>
      <h1 className={classes.title}>Prints</h1>
    </div>
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
    <div className={classes.prints}>
      {titleWrapper}

      <SetOfExampleCollectionSection data={data} />
      {sectionSeperationImage}

      <WheelImagesSection data={data} />
      {sectionSeperationImage}

      {/* Currently contains nothing except small text */}
      {exploreNewInSection}
    </div>
  );
};

export default Prints;
