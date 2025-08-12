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

// fetch dynamic data
const imitationFetchGenericData = async () => {
  try {
    const response = await fetch("/API_imitation/images.json");

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error.message);
  }
};

// wrapper that contains all top-level data for prints
const PrintsSection = ({ data }) => {
  // set of images and their sources (this is for the 3-set images which have rolling-text)
  const [printImagesSrc, setPrintImagesSrc] = useState(null);
  // corresponding texts to each image
  const [printImagesText, setPrintImagesText] = useState(null);

  // automated data which finds last image. This is because front-page should represent the most recently added collection, to keep it 'fresh' and nicely updated
  const mostRecentlyAddedSet = data[data.length - 1];

  // sets title
  const setTitle = mostRecentlyAddedSet.bioInfo.setTitle;

  const wheelImages = data.map((obj) => obj.image);

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

  if (printImagesSrc && printImagesText) {
    return (
      <section>
        <Prints
          images={printImagesSrc}
          wheelImages={wheelImages}
          texts={printImagesText}
          textBioTitle={setTitle}
        />
      </section>
    );
  }
};

const MainPage = () => {
  const smallCircleImages = [welcomeImageOne, welcomeImageOne, welcomeImageOne];

  const [topLayerData, setTopLayerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await imitationFetchGenericData();
      if (data) {
        setTopLayerData(data);
      }
    };
    fetchData();
  }, []);

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
      {/* <Paintings
        wheelImages={wheelImages}
        images={paintings}
        quickViewImages={quickViewImages}
        texts={texts}
      /> */}
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

  if (topLayerData) {
    return (
      <div>
        {topSection}
        {sectionSeperatorWithNoImage}

        {categoriesSection}
        {sectionSeperatorWithImage}

        <PrintsSection data={topLayerData} />
        {sectionSeperatorWithImage}

        {servicesSection}
        {sectionSeperatorWithImage}

        {paintingsSection}
        {sectionSeperatorWithImage}
      </div>
    );
  }
};

export default MainPage;
