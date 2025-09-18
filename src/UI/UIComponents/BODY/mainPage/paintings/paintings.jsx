import classes from "./paintings.module.scss";
import { useEffect, useState } from "react";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";

import WheelOfManyImages from "@fullyComponents/wheelOfManyImages/wheelOfManyImages";
import SetOfimagesWithText from "@fullyComponents/SetOfImagesWithText/setOfImagesWithText";
import handleNavigateSmooth from "@functions/handleNavigateSmooth";

// Example section of a collection of paintings - 3 images with scrolling text below as bio
const SetOfExampleCollectionSection = ({ data }) => {
  // if user clicks on any image, will navigate to collection
  const navigate = handleNavigateSmooth();

  const [paintingsImagesSrc, setPaintingsImagesSrc] = useState(null), // set of images and their sources (this is for the 3-set images which have rolling-text)
    [paintingsImagesText, setPaintingsImagesText] = useState(null); // corresponding texts to each image

  // automated data which finds last image. This is because front-page should represent the most recently added collection, to keep it 'fresh' and nicely updated
  const mostRecentlyAddedSet = data[data.length - 1],
    linkId = mostRecentlyAddedSet?.id,
    linkType = mostRecentlyAddedSet?._embedded.details.type,
    textBioTitle = mostRecentlyAddedSet._embedded.setTitle; // sets title

  useEffect(() => {
    if (!mostRecentlyAddedSet) return;

    // local arrays that will contain fetched data related to SetOfExampleCollectionSection
    const sources = [],
      bios = [];

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
        onClick={() => navigate(`uniqueImage/${linkType}#${linkId}`)}
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
  return (
    <section className={classes.wheelImagesSection}>
      <div>
        <h5>{"Placeholder title"}</h5>
      </div>
      <WheelOfManyImages canQuickView={true} data={data} />
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
