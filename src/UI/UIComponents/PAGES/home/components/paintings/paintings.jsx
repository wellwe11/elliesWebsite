import classes from "./paintings.module.scss";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";

import WheelOfManyImages from "@fullyComponents/wheelOfManyImages/wheelOfManyImages";
import ExploreNewIn from "@fullyComponents/exploreNewIn/exploreNewIn";
import SetOfimagesWithText from "@fullyComponents/SetOfImagesWithText/setOfImagesWithText";
import { useNavigate } from "react-router-dom";
import useSetOfExampleCollectionLogic from "../../hooks/useSetOfExampleCollectionLogic.jsx";

// Example section of a collection of prints - 3 images with scrolling text below as bio
const SetOfExampleCollectionSection = ({ data }) => {
  const { imageSrc, text, bioInfo } = useSetOfExampleCollectionLogic(data);
  const { linkId, linkType, textBioTitle } = bioInfo;

  // if user clicks on any image, will navigate to collection
  const navigate = useNavigate();
  const handleNavigate = () =>
    navigate(`uniqueImage?category=${linkType}&id=${linkId}`);

  if (imageSrc && text) {
    return (
      <section
        className={classes.exampleCollectionSection}
        onClick={handleNavigate}
      >
        <SetOfimagesWithText
          images={imageSrc}
          texts={text}
          textBioTitle={textBioTitle || "Please insert a title"}
        />
      </section>
    );
  }
};

const Paintings = ({ data }) => {
  // section containing most recently added paintings together with some text
  const exploreNewInSection = (
    <section className={classes.exploreNewInSection}>
      <ExploreNewIn />
    </section>
  );

  const wheelImagesSection = (
    <section className={classes.wheelImagesSection}>
      <div>
        <h5>{"Placeholder title"}</h5>
      </div>
      <WheelOfManyImages canQuickView={true} data={data} />
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
      <SectionSeperationImage />
    </div>
  );

  return (
    <div className={classes.paintings}>
      {/* Currently contains nothing except small text */}
      {exploreNewInSection}
      {sectionSeperationImage}

      {wheelImagesSection}
      {sectionSeperationImage}

      {setOfImagesWithText}
    </div>
  );
};

export default Paintings;
