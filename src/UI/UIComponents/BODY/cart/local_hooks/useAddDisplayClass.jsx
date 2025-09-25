import { useEffect, useRef } from "react";
import bodyNoScroll from "@functions/bodyNoScroll.js";
import { useNavigate } from "react-router-dom";

const useAddDisplayClass = (classes) => {
  const cartWrapperRef = useRef(),
    backgroundWhiteRef = useRef();

  const navigate = useNavigate();
  const { disableScroll } = bodyNoScroll();

  useEffect(() => {
    disableScroll();

    if (cartWrapperRef.current) {
      setTimeout(() => {
        cartWrapperRef.current.classList.add(classes.slideFromRight);
      }, 50);
    }

    if (backgroundWhiteRef.current) {
      setTimeout(() => {
        backgroundWhiteRef.current.classList.add(classes.appearBackgroundWhite);
      }, 50);
    }
  }, []);

  return { cartWrapperRef, backgroundWhiteRef, navigate };
};

export default useAddDisplayClass;
