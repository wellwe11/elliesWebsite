import classes from "./MAINPAGE.module.scss";

import MainPageTopPresentation from "./mainPageTopPresentation/mainPageTopPresentation";
import Services from "./services/services";

import imageOne from "@assets/exampleImages/imageExampleOne.jpg";
import imageTwo from "@assets/exampleImages/imageExampleTwo.jpg";
import imageThree from "@assets/exampleImages/imageExampleThree.jpg";
import welcomeImageOne from "@assets/welcomeImageOne.jpg";

import artCategory from "@assets/categories/artCategory.webp";
import bookmarksCategory from "@assets/categories/bookmarksCategory.webp";
import printsCategory from "@assets/categories/printsCategory.webp";
import stickersCategory from "@assets/categories/stickersCategory.webp";

import mainImage from "@assets/welcomeImage.jpg";

import exampleImageOne from "@assets/frontPageMainImages/mainImageOne.png";
import exampleImageTwo from "@assets/frontPageMainImages/mainImageTwo.png";
import exampleImageThree from "@assets/frontPageMainImages/mainImageThree.png";
import Prints from "./prints/prints";
import Paintings from "./paintings/paintings";
import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";
import Categories from "./categories/categories";

import wallImage from "@assets/wall.png";

const prints = {
  Prints: {
    imageOne: imageOne,
    imageTwo: imageTwo,
    imageThree: imageThree,
  },
};

const paintings = {
  Paintings: {
    imageOne: imageTwo,
    imageTwo: imageThree,
    imageThree: imageOne,
  },
};

const texts = [
  "this is text one",
  "this is text two",
  "this is text three",
  "this is text four",
];

const textsTitles = [
  "this is title one",
  "this is title two",
  "this is title three",
  "this is title four",
];

const buttonNames = [
  "Water collection",
  "Pastel collection",
  "Flower collection",
  "Summer collection",
];

const imagesShuffle = [
  [exampleImageOne, exampleImageTwo, exampleImageThree],
  [exampleImageTwo, exampleImageThree, exampleImageOne],
  [exampleImageOne, exampleImageTwo, exampleImageThree],
  [exampleImageThree, exampleImageOne, exampleImageTwo],
];

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

const MainPage = () => {
  const smallCircleImages = [welcomeImageOne, welcomeImageOne, welcomeImageOne];
  return (
    <div>
      <section>
        <MainPageTopPresentation
          images={smallCircleImages}
          mainImage={mainImage}
        />
      </section>

      <div
        className={`${classes.sectionSeperationWrapper} ${classes.lowMargin}`}
      >
        <SectionSeperationImage />
      </div>

      <section>
        <Categories categories={categories} />
      </section>

      <div className={classes.sectionSeperationWrapper}>
        <SectionSeperationImage imgSrc={mainImage} imgAlt={""} />
      </div>

      <section>
        <Prints images={prints} texts={texts} />
      </section>

      <div className={classes.sectionSeperationWrapper}>
        <SectionSeperationImage imgSrc={mainImage} imgAlt={""} />
      </div>

      <section>
        <Services
          texts={texts}
          textsTitles={textsTitles}
          buttonNames={buttonNames}
          imagesShuffle={imagesShuffle}
          wallImage={wallImage}
        />
      </section>

      <div className={classes.sectionSeperationWrapper}>
        <SectionSeperationImage imgSrc={mainImage} imgAlt={""} />
      </div>

      <section>
        <Paintings images={paintings} texts={texts} />
      </section>

      <div className={classes.sectionSeperationWrapper}>
        <SectionSeperationImage imgSrc={mainImage} imgAlt={""} />
      </div>
    </div>
  );
};

export default MainPage;
