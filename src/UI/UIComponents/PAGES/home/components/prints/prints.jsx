import classes from "./prints.module.scss";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";

import WheelOfManyImages from "@fullyComponents/wheelOfManyImages/wheelOfManyImages";
import ExploreNewIn from "@fullyComponents/exploreNewIn/exploreNewIn";
import SetOfimagesWithText from "@fullyComponents/SetOfImagesWithText/setOfImagesWithText";

import { useNavigate } from "react-router-dom";
import useSetOfExampleCollectionLogic from "../../hooks/useSetOfExampleCollectionLogic.jsx";

// Example section of a collection of prints - 3 images with scrolling text below as bio
const SetOfExampleCollectionSection = ({ data }) => {
  const { bioInfo } = useSetOfExampleCollectionLogic(data);
  const { linkId, linkType, textBioTitle } = bioInfo;

  // if user clicks on any image, will navigate to collection
  const navigate = useNavigate();
  const handleNavigate = () =>
    navigate(`uniqueImage?category=${linkType}&id=${linkId}`);

  if (bioInfo) {
    const imagesSrc = bioInfo.images,
      imagesText = bioInfo.imagesBio;
    return (
      <section
        className={classes.exampleCollectionSection}
        onClick={handleNavigate}
      >
        <SetOfimagesWithText
          images={imagesSrc}
          texts={imagesText}
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
      <WheelOfManyImages canQuickView={true} data={data} />
    </section>
  );
};

const Prints = ({ data }) => {
  // section containing most recently added print together with some text
  const exploreNewInSection = (
    <section className={classes.exploreNewInSection}>
      <ExploreNewIn title={"Prints"} link={"/gallery?category=prints&page=1"} />
    </section>
  );

  const setOfImagesWithText = (
    <div className={classes.setOfImagesWithTextWrapper}>
      <SetOfExampleCollectionSection data={data} />
    </div>
  );

  // adds space between sections
  const sectionSeperationImage = (
    <div className={classes.sectionSeperationImage}>
      <SectionSeperationImage data />
    </div>
  );

  return (
    <div className={classes.prints}>
      {/* Currently contains nothing except small text */}
      {exploreNewInSection}
      {sectionSeperationImage}
      {sectionSeperationImage}
      {sectionSeperationImage}

      {sectionSeperationImage}
      <WheelImagesSection data={data} />
      {sectionSeperationImage}

      {setOfImagesWithText}
    </div>
  );
};

export default Prints;
