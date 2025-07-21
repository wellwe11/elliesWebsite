import classes from "./MAINPAGE.module.scss";

import MainImage from "./mainpageImage/mainImage";
import MainPageImages from "./mainpageImages/mainpageImages";
import Services from "./services/services";

const MainPage = () => {
  return (
    <div>
      <MainImage />
      <MainPageImages />
      <Services />
    </div>
  );
};

export default MainPage;
