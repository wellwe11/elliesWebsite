import { useEffect, useState } from "react";

// made for PRINTS and PAINTINGS > SetOfExampleCollectionSection
const useSetOfExampleCollectionLogic = (data) => {
  // states for arrays where more than one item will be stored.
  const [imageSrc, setImageSrc] = useState(null), // set of images and their sources (this is for the 3-set images which have rolling-text)
    [text, setText] = useState(null); // corresponding texts to each image

  // automated data which finds last image. This is because front-page should represent the most recently added collection, to keep it 'fresh' and nicely updated
  const mostRecentlyAddedSet = data[data.length - 1];

  // Variables that are none-arrays.
  // navigational information: navigate(`uniqueImage?category=${linkType}&=${linkId}`).
  const bioInfo = {
    linkId: mostRecentlyAddedSet?.id,
    linkType: mostRecentlyAddedSet?._embedded.details.type,
    textBioTitle: mostRecentlyAddedSet._embedded.setTitle, // sets title
  };

  useEffect(() => {
    if (!mostRecentlyAddedSet) return;

    // local arrays that will contain fetched data related to SetOfExampleCollectionSection
    const sources = [],
      bios = [];

    // images, their source and related text
    const paintingsImages = mostRecentlyAddedSet.images;

    // turns image-src & img-bio into arrays that can later be mapped with index to associate with each other
    paintingsImages.forEach((image) => {
      sources.push(image.src);
      bios.push(image.bio);
    });

    setText(bios);
    setImageSrc(sources);
  }, [data]);

  return { imageSrc, text, bioInfo };
};

export default useSetOfExampleCollectionLogic;
