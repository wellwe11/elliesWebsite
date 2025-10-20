import { useMemo } from "react";

// made for PRINTS and PAINTINGS > SetOfExampleCollectionSection
const useSetOfExampleCollectionLogic = (data) => {
  // automated data which finds last image. This is because front-page should represent the most recently added collection, to keep it 'fresh' and nicely updated
  const mostRecentlyAddedSet = data[data.length - 1];

  // navigational information: navigate(`uniqueImage?category=${linkType}&=${linkId}`).

  const bioInfo = useMemo(() => {
    return {
      linkId: mostRecentlyAddedSet?.id,
      linkType: mostRecentlyAddedSet?._embedded.details.type,
      textBioTitle: mostRecentlyAddedSet._embedded.setTitle, // sets title
      images: mostRecentlyAddedSet?.images.map((image) => image.src),
      imagesBio: mostRecentlyAddedSet?.images.map((image) => image.bio),
    };
  }, [mostRecentlyAddedSet]);

  return { bioInfo };
};

export default useSetOfExampleCollectionLogic;
