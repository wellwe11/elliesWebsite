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

// for prints-section
const prints = [imageOne, imageTwo, imageThree];

// for paintings-section
const paintings = {
  Paintings: {
    imageOne: imageTwo,
    imageTwo: imageThree,
    imageThree: imageOne,
  },
};

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

  // Example-images of prints
  const printsSection = (
    <section>
      <Prints wheelImages={wheelImages} images={prints} texts={texts} />
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
      <Paintings images={paintings} texts={texts} />
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

      {printsSection}
      {sectionSeperatorWithImage}

      {servicesSection}
      {sectionSeperatorWithImage}

      {paintingsSection}
      {sectionSeperatorWithImage}
    </div>
  );
};

export default MainPage;
