import classes from "./HOME.module.scss";
import fadeInClass from "@classes/fadeInOnLoad.module.scss";

import MainPageTopPresentation from "./components/mainPageTopPresentation/mainPageTopPresentation.jsx";
import waterColorImage from "@assets/blueWhiteWaterColor.avif";

import Prints from "./components/prints/prints.jsx";

import Services from "./components/services/services.jsx";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";
import NewIn from "./components/newIn/newIn.jsx";

import Loading from "../../LOADING/loading.jsx";
import Products from "./componentsPhoneSize/products/products.jsx";

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
  console.log(galleryData);
  return (
    <div className={`${classes.home} ${fadeInClass.fade_in_on_load}`}>
      {/* DESKTOP  */}
      <div className={classes.desktop}>
        <section className={classes.topSection}>
          <MainPageTopPresentation mainImage={waterColorImage} />
        </section>

        <SectionSeperator lowMargin />

        <section className={classes.printSection}>
          <Prints data={galleryData} />
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
