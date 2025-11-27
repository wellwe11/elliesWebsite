import classes from "./HOME.module.scss";
import fadeInClass from "@classes/fadeInOnLoad.module.scss";

import MainPageTopPresentation from "./components/mainPageTopPresentation/mainPageTopPresentation.jsx";
import LogoImageTopPresentation from "/frontPage/logo.png";
import waterColorImage from "@assets/blueWhiteWaterColor.avif";

import Services from "./components/services/services.jsx";

import SectionSeperationImage from "@components/sectionSeperationImage/sectionSeperationImage";

import Products from "./componentsPhoneSize/products/products.jsx";
import SetOfLatestItem from "./components/setOfLatestItem/setOfLatesItem.jsx";
import WheelOfManyImages from "./components/wheelOfManyImages/wheelOfManyImages.jsx";
import ExploreNewIn from "./components/exploreNewIn/exploreNewIn.jsx";
import dataHandler from "../../routeContainer/functions/dataHandler.js";

const SectionSeperator = ({ lowMargin = false, withImage = false }) => (
  <div
    className={`${classes.sectionSeperationWrapper} ${
      lowMargin ? classes.lowMargin : ""
    }`}
  >
    <SectionSeperationImage withImage={withImage} />
  </div>
);

const LoadAfterData = ({ data }) => {
  if (!data) return;
  const { services, ...restData } = data;
  const updatedData = dataHandler(restData, "set"),
    servicesData = data?.services;
  const canLoad = updatedData && servicesData;

  if (!canLoad) return;

  return (
    <>
      <section className={classes.exploreNewInSection}>
        <SectionSeperator lowMargin />
        <ExploreNewIn title="Studio" linkText={"Gallery"} />
      </section>

      <section className={classes.setOfLatestItemSection}>
        <SectionSeperator lowMargin />
        <SectionSeperator lowMargin />

        <SetOfLatestItem data={updatedData} />
        <SectionSeperator lowMargin />
      </section>

      <section className={classes.serviceSection}>
        <SectionSeperator withImage />
        <SectionSeperator lowMargin />
        <Services data={servicesData} />
        <SectionSeperator lowMargin />
        <SectionSeperator withImage />
      </section>

      <section className={classes.wheelOfManyImagesSection}>
        <SectionSeperator lowMargin />
        <SectionSeperator lowMargin />
        <WheelOfManyImages data={updatedData} canQuickView={false} />

        <SectionSeperator lowMargin />
        <SectionSeperator withImage />
      </section>
    </>
  );
};

const Mobile = ({ data }) => {
  if (!data) return;

  const { services, ...restData } = data;
  const updatedData = dataHandler(restData, "set");

  if (!updatedData) return;

  return (
    <div className={classes.mobile}>
      <Products data={{ updatedData }} />
    </div>
  );
};

const Home = ({ data }) => {
  return (
    <div className={`${classes.home} ${fadeInClass.fade_in_on_load}`}>
      {/* DESKTOP  */}
      <div className={classes.desktop}>
        <section className={classes.topSection}>
          <MainPageTopPresentation
            mainImage={waterColorImage}
            logoImage={LogoImageTopPresentation}
          />
        </section>
        <LoadAfterData data={data} />
        {/* <section>
          <h1>insta</h1>
          </section> */}
      </div>

      {/* MOBILE */}
      <Mobile data={data} />
    </div>
  );
};

export default Home;
