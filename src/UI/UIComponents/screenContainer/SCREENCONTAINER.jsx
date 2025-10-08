import { Routes, Route, useLocation, useSearchParams } from "react-router-dom";
import { Suspense, useState } from "react";
import classes from "./SCREENCONTAINER.module.scss";

import Footer from "../FOOTER/footer";
import Navbar from "../NAVBAR/navbar";
import Home from "../BODY/home/HOME";
import Gallery from "../BODY/gallery/GALLERY";
import ContactUs from "../BODY/contactUs/contactUs.jsx";

import UniqueImage from "../BODY/uniqueImagePage/uniqueImage";
import Cart from "../BODY/cart/cart";

import UniqueImageContext from "../BODY/cartContext";
import QuickViewImage from "@fullyComponents/quickView/quickViewImage/quickViewImage";
import LoadingWrapper from "@components/loadingAnimation/loadingIconWithBackground";
import useData from "@hooks/useData.jsx";

import getTotalInfo from "./functions/totalItems.js";
import UseFetchData from "@hooks/useFetchData.jsx";
import useUpdateDataLogic from "../BODY/gallery/hooks/useUpdateDataLogic.jsx";

const PreviewRoute = ({ backgroundLocation }) => {
  const { data, isLoading } = useData(backgroundLocation);

  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null,
    id = searchParams.get("id") || null;

  if (isLoading) return null;

  const categoryData = data[category];

  const foundObj = categoryData.find((a) => +a.id === +id); // finds matching obj

  const uniqueViewEmbedded = foundObj?._embedded;

  const quickViewProps = {
    quickViewImages: uniqueViewEmbedded?.restImages,
    title: uniqueViewEmbedded?.setTitle,
    price: uniqueViewEmbedded?.details.price,
    bio: uniqueViewEmbedded?.setDescription,
  };

  return (
    <QuickViewImage quickViewProps={quickViewProps} isLoading={isLoading} />
  );
};

const BackgroundRoutes = () => {
  const location = useLocation(),
    backgroundLocation =
      location.state?.backgroundLocation.replace("/", "") || "home";

  return (
    <Routes>
      <Route
        path="/:tab?/preview/:category?/:id?/*"
        element={<PreviewRoute backgroundLocation={backgroundLocation} />}
      />
      <Route path="/:tab?/cart" element={<Cart />} />
    </Routes>
  );
};

const GalleryRoute = () => {
  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null;

  const { data, isLoading } = useData("gallery");
  const { updatedData } = useUpdateDataLogic(category, data);
  if (isLoading) return null;

  return <Gallery data={updatedData} />;
};

const HomeRoute = () => {
  const { data, isLoading } = useData("home");

  if (isLoading) return null; // loading screen in future

  return <Home data={data} />;
};

const UniqueImageRoute = () => {
  return <UniqueImage />;
};

const MainPagesRoutes = () => {
  const location = useLocation(),
    state = location.state;

  return (
    <Routes location={state?.backgroundLocation || location}>
      <Route path="/" element={<HomeRoute />} />
      <Route path="/gallery/:category?/:id?/*" element={<GalleryRoute />} />
      <Route path="/contact" element={<ContactUs />} />

      {/** Extended pages */}
      <Route
        path="/uniqueImage/:category?/:id?/*"
        element={<UniqueImageRoute />}
      />
    </Routes>
  );
};

const ScreenContainer = () => {
  const [cart, setCart] = useState({}); // context for whichever product is in focus

  const { totalItems, totalPrice } = getTotalInfo(cart);

  const location = useLocation(),
    state = location.state;

  return (
    <div className={classes.widthContainer}>
      <Navbar cartItems={totalItems} />

      <div className={`${classes.contentWrapper} ${classes.paddingClass}`}>
        <UniqueImageContext.Provider
          value={{ cart, setCart, totalItems, totalPrice }}
        >
          <MainPagesRoutes />
          {state?.backgroundLocation && <BackgroundRoutes />}
        </UniqueImageContext.Provider>
        <Footer />
      </div>
    </div>
  );
};

export default ScreenContainer;
