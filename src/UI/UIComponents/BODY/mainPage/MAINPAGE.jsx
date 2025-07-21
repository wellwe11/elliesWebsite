import classes from "./MAINPAGE.module.scss";

import MainImage from "./mainpageImage/mainImage";
import MainPageImages from "./mainpageImages/mainpageImages";

const MainPage = () => {
  return (
    <div>
      <MainImage />
      <MainPageImages />
    </div>
  );
};

export default MainPage;
