import { useMemo } from "react";

// made for PRINTS and PAINTINGS > SetOfExampleCollectionSection
const useSetOfExampleCollectionLogic = (data) => {
  const collectionOfThrees = data.filter((obj) => obj.collection.length === 3);

  const mostRecentlyAddedSet =
    collectionOfThrees[collectionOfThrees.length - 1];

  console.log(mostRecentlyAddedSet);

  const bioInfo = useMemo(() => {
    return {
      linkId: mostRecentlyAddedSet?.id,
      linkType: mostRecentlyAddedSet?.type,
      textBioTitle: mostRecentlyAddedSet.setTitle, // sets title
      images: mostRecentlyAddedSet?.collection.map((obj) => obj.image),
      imagesBio: ["text1", "text2", "text3"],
    };
  }, [mostRecentlyAddedSet]);

  return { bioInfo };
};

export default useSetOfExampleCollectionLogic;
