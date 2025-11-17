import classes from "./HOME.module.scss";
import fadeInClass from "@classes/fadeInOnLoad.module.scss";

import MainPageTopPresentation from "./components/mainPageTopPresentation/mainPageTopPresentation.jsx";
import waterColorImage from "@assets/blueWhiteWaterColor.avif";

import Categories from "./components/categories/categories.jsx";
import artCategory from "@assets/categories/artCategory.avif";
import bookmarksCategory from "@assets/categories/bookmarksCategory.avif";
import printsCategory from "@assets/categories/printsCategory.avif";
import stickersCategory from "@assets/categories/stickersCategory.avif";

import Prints from "./components/prints/prints.jsx";
import Paintings from "./components/paintings/paintings.jsx";
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

const Home = ({ data: { paintingsData, printsData, servicesData } }) => {
  return (
    <div className={`${classes.home} ${fadeInClass.fade_in_on_load}`}>
      {/* DESKTOP  */}
      <div className={classes.desktop}>
        <section className={classes.topSection}>
          <MainPageTopPresentation mainImage={waterColorImage} />
        </section>

        <SectionSeperator lowMargin />

        <section className={classes.printSection}>
          <Prints data={printsData} />
        </section>

        {/* {newInSection}
        {sectionSeperatorWithImage} */}

        <div className={classes.servicesWrapper}>
          <SectionSeperator withImage />
          <section className={classes.serviceSection}>
            <Services data={servicesData} />
          </section>
          <SectionSeperator withImage />
        </div>

        <section className={classes.paintingSection}>
          <Paintings data={paintingsData} />
        </section>
        <SectionSeperator withImage />

        {/* <section className={classes.newInSection}>
      <NewIn />
      </section> */}

        {/* <section>
      <h1>insta</h1>
      </section> */}
      </div>
      {/* MOBILE */}
      <div className={classes.mobile}>
        <Products data={{ paintingsData, printsData }} />
      </div>
    </div>
  );
};

export default Home;
