import classes from "./MAINPAGE.module.scss";

import MainImage from "./mainpageImage/mainImage";
import MainPageTopPresentation from "./mainPageTopPresentation/mainPageTopPresentation";
import MainPageImages from "./mainpageImages/mainpageImages";
import Services from "./services/services";

import imageOne from "@assets/exampleImages/imageExampleOne.jpg";
import imageTwo from "@assets/exampleImages/imageExampleTwo.jpg";
import imageThree from "@assets/exampleImages/imageExampleThree.jpg";
import welcomeImageOne from "@assets/welcomeImageOne.jpg";

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
      <Services />
    </div>
  );
};

export default MainPage;
