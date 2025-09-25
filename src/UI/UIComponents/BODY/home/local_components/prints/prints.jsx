import classes from "./prints.module.scss";
import { useEffect, useState } from "react";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";

import WheelOfManyImages from "@fullyComponents/wheelOfManyImages/wheelOfManyImages";
import ExploreNewIn from "@fullyComponents/exploreNewIn/exploreNewIn";
import SetOfimagesWithText from "@fullyComponents/SetOfImagesWithText/setOfImagesWithText";

import { useNavigate } from "react-router-dom";

// Example section of a collection of prints - 3 images with scrolling text below as bio
const SetOfExampleCollectionSection = ({ data }) => {
  // if user clicks on any image, will navigate to collection
  const navigate = useNavigate();

  const [printImagesSrc, setPrintImagesSrc] = useState(null), // set of images and their sources (this is for the 3-set images which have rolling-text)
    [printImagesText, setPrintImagesText] = useState(null); // corresponding texts to each image

  const mostRecentlyAddedSet = data[data.length - 1], // automated data which finds last set-images. This is because front-page should represent the most recently added collection, to keep it 'fresh' and nicely updated
    linkId = mostRecentlyAddedSet?.id,
    linkType = mostRecentlyAddedSet?._embedded.details.type,
    textBioTitle = mostRecentlyAddedSet._embedded.setTitle; // sets title

  useEffect(() => {
    if (!mostRecentlyAddedSet) return;

    // local arrays that will contain fetched data related to SetOfExampleCollectionSection
    const sources = [],
      bios = [];

    // images, their source and related text
    const printsImages = mostRecentlyAddedSet.images;

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
        onClick={() => navigate(`uniqueImage/${linkType}#${linkId}`)}
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
  return (
    <section className={classes.wheelImagesSection}>
      <div>
        <h5>{"Placeholder title"}</h5>
      </div>
      <WheelOfManyImages canQuickView={true} data={data} />
    </section>
  );
};

const Prints = ({ data }) => {
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
      {/* Currently contains nothing except small text */}
      {exploreNewInSection}
      {sectionSeperationImage}

      <WheelImagesSection data={data} />
      {sectionSeperationImage}

      <SetOfExampleCollectionSection data={data} />
      {sectionSeperationImage}
    </div>
  );
};

export default Prints;
