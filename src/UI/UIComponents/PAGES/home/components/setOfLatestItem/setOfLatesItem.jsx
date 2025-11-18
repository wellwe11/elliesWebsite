import classes from "./setOfLatestItem.module.scss";
import { useNavigate } from "react-router-dom";
import useSetOfExampleCollectionLogic from "./hooks/useSetOfExampleCollectionLogic.jsx";
import SetOfimagesWithText from "./components/SetOfImagesWithText/setOfImagesWithText.jsx";

// Example section of a collection of prints - 3 images with scrolling text below as bio
const SetOfLatestItem = ({ data }) => {
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
      <section className={classes.setOflatestItem} onClick={handleNavigate}>
        <SetOfimagesWithText
          images={imagesSrc}
          texts={imagesText}
          textBioTitle={textBioTitle || "Please insert a title"}
        />
      </section>
    );
  }
};

export default SetOfLatestItem;
