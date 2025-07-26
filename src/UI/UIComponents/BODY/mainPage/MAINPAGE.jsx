import classes from "./MAINPAGE.module.scss";

import MainImage from "./mainpageImage/mainImage";
import MainPageTopPresentation from "./mainPageTopPresentation/mainPageTopPresentation";
import MainPageImages from "./mainpageImages/mainpageImages";
import Services from "./services/services";

import imageOne from "@assets/exampleImages/imageExampleOne.jpg";
import imageTwo from "@assets/exampleImages/imageExampleTwo.jpg";
import imageThree from "@assets/exampleImages/imageExampleThree.jpg";
import welcomeImageOne from "@assets/welcomeImageOne.jpg";

import exampleImageOne from "@assets/frontPageMainImages/mainImageOne.jpg";
import exampleImageTwo from "@assets/frontPageMainImages/mainImageTwo.jpg";
import exampleImageThree from "@assets/frontPageMainImages/mainImageThree.jpg";

const designedBy = "ELizabet Belova";
const bio = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const images = {
  Prints: {
    imageOne: imageOne,
    imageTwo: imageTwo,
    imageThree: imageThree,
  },
  Paintings: {
    imageOne: imageOne,
    imageTwo: imageTwo,
    imageThree: imageThree,
  },
};

const texts = [
  "this is text one",
  "this is text two",
  "this is text three",
  "this is text three",
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

const MainPage = () => {
  const smallCircleImages = [welcomeImageOne, welcomeImageOne, welcomeImageOne];
  return (
    <div>
      {/* <MainImage /> */
      /*Ellie doesnt like this example 
      !! if I enable again, make sure to put props-info IN THIS FILE & pass them as props
      */}

      <MainPageTopPresentation images={smallCircleImages} />
      <MainPageImages images={images} bio={bio} designedBy={designedBy} />
      <Services
        texts={texts}
        textsTitles={textsTitles}
        buttonNames={buttonNames}
        imagesShuffle={imagesShuffle}
      />
    </div>
  );
};

export default MainPage;
