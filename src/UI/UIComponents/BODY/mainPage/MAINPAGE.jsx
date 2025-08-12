import classes from "./MAINPAGE.module.scss";

import MainPageTopPresentation from "./mainPageTopPresentation/mainPageTopPresentation";

import mainImage from "@assets/welcomeImage.jpg";
import welcomeImageOne from "@assets/welcomeImageOne.jpg";

import Categories from "./categories/categories";
import artCategory from "@assets/categories/artCategory.webp";
import bookmarksCategory from "@assets/categories/bookmarksCategory.webp";
import printsCategory from "@assets/categories/printsCategory.webp";
import stickersCategory from "@assets/categories/stickersCategory.webp";

import Prints from "./prints/prints";
import Paintings from "./paintings/paintings";
import imageOne from "@assets/exampleImages/imageExampleOne.jpg";
import imageTwo from "@assets/exampleImages/imageExampleTwo.jpg";
import imageThree from "@assets/exampleImages/imageExampleThree.jpg";

import Services from "./services/services";
import wallImage from "@assets/wall.png";
import exampleImageOne from "@assets/frontPageMainImages/mainImageOne.png";
import exampleImageTwo from "@assets/frontPageMainImages/mainImageTwo.png";
import exampleImageThree from "@assets/frontPageMainImages/mainImageThree.png";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";
import { useEffect, useState } from "react";

// for paintings-section
const paintings = [imageOne, imageTwo, imageThree];

// temporary quick-view images for prints & paintings
const quickViewImages = [
  imageOne,
  imageTwo,
  imageThree,
  imageOne,
  imageTwo,
  imageThree,
  imageOne,
  imageTwo,
  imageThree,
];

// temporary object for quickView
const quickViewObjects = [
  {
    // information which is displayed on the front-page
    genericData: {
      image: imageOne,
      bioInfo: {
        setTitle: "This is a title for this set",
        price: 19.99,
        images: [
          {
            src: imageOne,
            bio: "This is bio about itemOne",
          },
          {
            src: imageTwo,
            bio: "This is bio about itemTwo",
          },
          {
            src: imageThree,
            bio: "This is bio about itemThree",
          },
        ],
      },
    },

    // embedded information which will be accessed once a specified request is make. I.e. uniqueImage-page is displayed. Fetch additional data
    _embedded: {
      // data fetched when you visit a collection
      uniqueImageData: {
        title: ["Hello one", "Hello two"],
        bio: {
          title: "This is the title for uniqueImage bio",
          bio: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.",
        },
        details: {
          colors: ["Red", "Blue", "White"],
          eight: 35,
          width: 20,
          type: "Print or painting - will update",
          amount: 3,
        },
      },

      // quickView data which is accessible on front-page to view smaller amounts of information
      quickViewData: {
        restImages: [
          imageTwo,
          imageThree,
          imageOne,
          imageTwo,
          imageThree,
          imageOne,
          imageTwo,
          imageThree,
        ],
        setDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    },
  },

  {
    // information which is displayed on the front-page
    genericData: {
      image: imageOne,
      bioInfo: {
        setTitle: "This is a title for this set",
        price: 19.99,
        images: [
          {
            src: imageOne,
            bio: "This is bio about itemOne",
          },
          {
            src: imageTwo,
            bio: "This is bio about itemTwo",
          },
          {
            src: imageThree,
            bio: "This is bio about itemThree",
          },
        ],
      },
    },

    // embedded information which will be accessed once a specified request is make. I.e. uniqueImage-page is displayed. Fetch additional data
    _embedded: {
      // data fetched when you visit a collection
      uniqueImageData: {
        title: ["Hello one", "Hello two"],
        bio: {
          title: "This is the title for uniqueImage bio",
          bio: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.",
        },
        details: {
          colors: ["Red", "Blue", "White"],
          eight: 35,
          width: 20,
          type: "Print or painting - will update",
          amount: 3,
        },
      },

      // quickView data which is accessible on front-page to view smaller amounts of information
      quickViewData: {
        restImages: [
          imageTwo,
          imageThree,
          imageOne,
          imageTwo,
          imageThree,
          imageOne,
          imageTwo,
          imageThree,
        ],
        setDescription:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
    },
  },
];

// placeholder texts for image-information
const texts = [
  "this is text one",
  "this is text two",
  "this is text three",
  "this is text four",
];
// placeholder texts for image-information
const textsTitles = [
  "this is title one",
  "this is title two",
  "this is title three",
  "this is title four",
];

// Services buttons names
const buttonNames = [
  "Water collection",
  "Pastel collection",
  "Flower collection",
  "Summer collection",
];

// Services images
const imagesShuffle = [
  [exampleImageOne, exampleImageTwo, exampleImageThree],
  [exampleImageTwo, exampleImageThree, exampleImageOne],
  [exampleImageOne, exampleImageTwo, exampleImageThree],
  [exampleImageThree, exampleImageOne, exampleImageTwo],
];

// Categories section
const categories = {
  Prints: {
    image: printsCategory,
  },
  Paintings: {
    image: artCategory,
  },

  Bookmarks: {
    image: bookmarksCategory,
  },
  Stickers: {
    image: stickersCategory,
  },
};

// placeholder images for now
const wheelImages = [
  imageTwo,
  imageThree,
  imageOne,
  imageTwo,
  imageThree,
  imageOne,
  imageThree,
  imageOne,
  imageTwo,
  imageThree,
  imageThree,
  imageOne,
  imageTwo,
  imageOne,
  imageTwo,
];

const PrintsSection = () => {
  // set of images and their sources
  const [printImagesSrc, setPrintImagesSrc] = useState(null);
  // corresponding texts to each image
  const [printImagesText, setPrintImagesText] = useState(null);

  // Generic data fetched
  const printsData = quickViewObjects.map((obj) => obj?.genericData);

  // automated data which finds last image. This is because front-page should represent the most recently added collection, to keep it 'fresh' and nicely updated
  const mostRecentlyAddedSet = printsData[printsData.length - 1];

  // sets title
  const setTitle = mostRecentlyAddedSet.bioInfo.setTitle;

  useEffect(() => {
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
  }, []);

  if (printImagesSrc && setPrintImagesSrc) {
    return (
      <section>
        <Prints
          wheelImages={wheelImages}
          images={printImagesSrc}
          quickViewImages={quickViewImages}
          texts={printImagesText}
          textBioTitle={setTitle}
        />
      </section>
    );
  }
};

const MainPage = () => {
  const smallCircleImages = [welcomeImageOne, welcomeImageOne, welcomeImageOne];

  // Welcoming image and small animation
  const topSection = (
    <section>
      <MainPageTopPresentation
        images={smallCircleImages}
        mainImage={mainImage}
      />
    </section>
  );

  // Clickable images to navigate to filtered products
  const categoriesSection = (
    <section>
      <Categories categories={categories} />
    </section>
  );

  // Realistic image containing different colletions of images to "ikea-style" display them
  const servicesSection = (
    <section>
      <Services
        texts={texts}
        textsTitles={textsTitles}
        buttonNames={buttonNames}
        imagesShuffle={imagesShuffle}
        wallImage={wallImage}
      />
    </section>
  );

  // Example-images of paintings
  const paintingsSection = (
    <section>
      <Paintings
        wheelImages={wheelImages}
        images={paintings}
        quickViewImages={quickViewImages}
        texts={texts}
      />
    </section>
  );

  // seperates sections with some form of image (currently with a placeholder) and margins
  const sectionSeperatorWithImage = (
    <div className={classes.sectionSeperationWrapper}>
      <SectionSeperationImage imgSrc={mainImage} imgAlt={""} />
    </div>
  );

  // seperates sections simply with margins and it's own height
  const sectionSeperatorWithNoImage = (
    <div className={`${classes.sectionSeperationWrapper} ${classes.lowMargin}`}>
      <SectionSeperationImage />
    </div>
  );

  return (
    <div>
      {topSection}
      {sectionSeperatorWithNoImage}

      {categoriesSection}
      {sectionSeperatorWithImage}

      <PrintsSection />
      {sectionSeperatorWithImage}

      {servicesSection}
      {sectionSeperatorWithImage}

      {paintingsSection}
      {sectionSeperatorWithImage}
    </div>
  );
};

export default MainPage;
