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

import exampleImageOne from "@assets/frontPageMainImages/mainImageOne.jpg";
import exampleImageTwo from "@assets/frontPageMainImages/mainImageTwo.jpg";
import exampleImageThree from "@assets/frontPageMainImages/mainImageThree.jpg";
import Prints from "./prints/prints";
import Paintings from "./paintings/paintings";
import Accessories from "./categories/categories";
import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";

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
      <SectionSeperationImage margin="0px" height="50px" />
      <section>
        <Accessories categories={categories} />
      </section>
      <SectionSeperationImage
        imgSrc={mainImage}
        imgAlt={""}
        margin="25px"
        height="100px"
      />
      <section>
        <Prints images={prints} texts={texts} />
      </section>
      <section>
        <Services
          texts={texts}
          textsTitles={textsTitles}
          buttonNames={buttonNames}
          imagesShuffle={imagesShuffle}
        />
      </section>
      <section>
        <Paintings images={paintings} texts={texts} />
      </section>
      <SectionSeperationImage imgSrc={mainImage} imgAlt={""} />
    </div>
  );
};

export default MainPage;
