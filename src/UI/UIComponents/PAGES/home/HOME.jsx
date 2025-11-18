import classes from "./HOME.module.scss";
import fadeInClass from "@classes/fadeInOnLoad.module.scss";

import MainPageTopPresentation from "./components/mainPageTopPresentation/mainPageTopPresentation.jsx";
import waterColorImage from "@assets/blueWhiteWaterColor.avif";

import Services from "./components/services/services.jsx";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";

import Loading from "../../LOADING/loading.jsx";
import Products from "./componentsPhoneSize/products/products.jsx";
import SetOfLatestItem from "./components/setOfLatestItem/setOfLatesItem.jsx";
import WheelOfManyImages from "./components/wheelOfManyImages/wheelOfManyImages.jsx";
import ExploreNewIn from "./components/exploreNewIn/exploreNewIn.jsx";

const SectionSeperator = ({ lowMargin = false, withImage = false }) => (
  <div
    className={`${classes.sectionSeperationWrapper} ${
      lowMargin ? classes.lowMargin : ""
    }`}
  >
    <SectionSeperationImage withImage={withImage} />
  </div>
);

const Home = ({ data: { galleryData, servicesData } }) => {
  return (
    <div className={`${classes.home} ${fadeInClass.fade_in_on_load}`}>
      {/* DESKTOP  */}
      <div className={classes.desktop}>
        <section className={classes.topSection}>
          <MainPageTopPresentation mainImage={waterColorImage} />
        </section>

        <section>
          <SectionSeperator lowMargin />
          <ExploreNewIn title="Explore" />
        </section>

        <section>
          <SectionSeperator lowMargin />
          <SetOfLatestItem data={galleryData} />
        </section>

        <section>
          <SectionSeperator lowMargin />
          <WheelOfManyImages data={galleryData} />
        </section>

        <div className={classes.servicesWrapper}>
          <SectionSeperator withImage />
          <section className={classes.serviceSection}>
            <Services data={servicesData} />
          </section>
          <SectionSeperator withImage />
        </div>

        {/* <section>
      <h1>insta</h1>
      </section> */}
      </div>
      {/* MOBILE */}
      <div className={classes.mobile}>
        <Products data={{ galleryData }} />
      </div>
    </div>
  );
};

export default Home;
