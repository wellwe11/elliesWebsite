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
import usePrevious from "../../../abstract/hooks/usePrevious.jsx";

const QuickViewRoute = ({ data, isLoading }) => {
  const [searchParams] = useSearchParams(),
    category = searchParams.get("category") || null,
    id = searchParams.get("id") || null;

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
    <Routes>
      <Route
        path="/:tab?/preview/:category?/:id?/*"
        element={
          <QuickViewImage
            quickViewProps={quickViewProps}
            isLoading={isLoading}
          />
        }
      />
    </Routes>
  );
};

const CartRoute = ({ data, isLoading }) => {
  return (
    <Routes>
      <Route path="/:tab?/cart" element={<Cart />} />;
    </Routes>
  );
};

const BackgroundRoutes = () => {
  const location = useLocation(),
    tab = location.pathname.split("/")[1],
    tabChecked = location.state.backgroundLocation
      .replace("/", "")
      .includes("gallery")
      ? "gallery"
      : "home";

  console.log(tabChecked);

  const { data, isLoading } = useData(tabChecked);

  if (isLoading)
    return (
      <div>
        <h1>Loading</h1>
      </div>
    ); // loading screen in future

  return (
    <div key={tabChecked}>
      {tab === "cart" ? (
        <CartRoute data={data} isLoading={isLoading} />
      ) : (
        <QuickViewRoute data={data} isLoading={isLoading} />
      )}
    </div>
  );
};

const BodyRoutes = () => {
  const location = useLocation(),
    state = location.state,
    tab = location.pathname.split("/")[1] || "home",
    prevTab = usePrevious(tab),
    tabChecked = tab === "preview" || tab === "cart" ? prevTab : tab;

  console.log(prevTab);

  const { data, isLoading } = useData(tabChecked);

  if (isLoading) return null; // loading screen in future

  return (
    <div key={tabChecked}>
      {/** Main routes */}
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<Home data={data} />} />
        <Route
          path="/gallery/:category?/:id?/*"
          element={<Gallery data={data} />}
        />
        <Route path="/contact" element={<ContactUs />} />

        {/** Extended pages */}
        <Route
          path="/uniqueImage/:category?/:id?/*"
          element={<UniqueImage />}
        />
      </Routes>
    </div>
  );
};

// {state?.loadingLocation && (
//   <Routes location={state?.loadingLocation || location}>
//     <Route path="/" element={<Home />} />
//     <Route path="/gallery/:category?/:id?/*" element={<Gallery />} />
//     <Route path="/contact" element={<ContactUs />} />

//     {/** Extended pages */}
//     <Route
//       path="/uniqueImage/:category?/:id?/*"
//       element={<UniqueImage />}
//     />
//   </Routes>
// )}

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
          <BodyRoutes />
          {state?.backgroundLocation && <BackgroundRoutes />}
        </UniqueImageContext.Provider>
        <Footer />
      </div>
    </div>
  );
};

export default ScreenContainer;
