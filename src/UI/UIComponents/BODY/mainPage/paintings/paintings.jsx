import classes from "./paintings.module.scss";
import { useContext, useEffect, useState } from "react";

import UniqueImageContext from "../../uniqueImageContext";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";

import WheelOfManyImages from "@fullyComponents/wheelOfManyImages/wheelOfManyImages";
import ExploreNewIn from "@fullyComponents/exploreNewIn/exploreNewIn";
import SetOfimagesWithText from "@fullyComponents/SetOfImagesWithText/setOfImagesWithText";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";

// Example section of a collection of paintings - 3 images with scrolling text below as bio
const SetOfExampleCollectionSection = ({ data }) => {
  const { setUniqueImage } = useContext(UniqueImageContext);

  // if user clicks on any image, will navigate to collection
  const navigate = handleNavigateSmooth();

  // set of images and their sources (this is for the 3-set images which have rolling-text)
  const [paintingsImagesSrc, setPaintingsImagesSrc] = useState(null);
  // corresponding texts to each image
  const [paintingsImagesText, setPaintingsImagesText] = useState(null);

  // automated data which finds last image. This is because front-page should represent the most recently added collection, to keep it 'fresh' and nicely updated
  const mostRecentlyAddedSet = data[data.length - 1];

  const linkId = mostRecentlyAddedSet?.id;

  const linkType = mostRecentlyAddedSet?._embedded.details.type;

  // sets title
  const textBioTitle = mostRecentlyAddedSet._embedded.setTitle;

  useEffect(() => {
    if (!mostRecentlyAddedSet) return;

    // local arrays that will contain fetched data related to SetOfExampleCollectionSection
    const sources = [];
    const bios = [];

    // images, their source and related text
    const paintingsImages = mostRecentlyAddedSet.images;

    paintingsImages.forEach((image) => {
      sources.push(image.src);
      bios.push(image.bio);
    });

    setPaintingsImagesSrc(sources);
    setPaintingsImagesText(bios);
  }, [data]);

  if (paintingsImagesSrc && paintingsImagesText) {
    return (
      <section
        className={classes.exampleCollectionSection}
        onClick={() => {
          setUniqueImage(mostRecentlyAddedSet);
          navigate(`uniqueImage/${linkType}/${linkId}`);
        }}
      >
        <SetOfimagesWithText
          images={paintingsImagesSrc}
          texts={paintingsImagesText}
          textBioTitle={textBioTitle || "Please insert a title"}
        />
      </section>
    );
  }
};

// section to view many different collections (1 image per collection) which is clickable
const WheelImagesSection = ({ data }) => {
  const { setUniqueImage } = useContext(UniqueImageContext);

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

    setUniqueImage(data[activeImageSrc]);
  }, [activeImageSrc]);

  return (
    <section className={classes.wheelImagesSection}>
      <div>
        <h1>{"Placeholder title"}</h1>
      </div>
      <WheelOfManyImages
        canQuickView={true}
        images={wheelImages}
        activeImageProps={{ activeImageSrc, setActiveImageSrc }}
        quickViewProps={{
          quickViewImages: activeQuickViewData?.restImages,
          title: activeQuickViewData?.setTitle,
          price: activeQuickViewData?.details.price,
          bio: activeQuickViewData?.setDescription,
        }}
      />
    </section>
  );
};

const Paintings = ({ data }) => {
  // adds space between sections
  const sectionSeperationImage = (
    <div className={classes.sectionSeperationImage}>
      <SectionSeperationImage />
    </div>
  );

  return (
    <div className={classes.paintings}>
      <SetOfExampleCollectionSection data={data} />
      {sectionSeperationImage}

      <WheelImagesSection data={data} />
      {sectionSeperationImage}
    </div>
  );
};

export default Paintings;
