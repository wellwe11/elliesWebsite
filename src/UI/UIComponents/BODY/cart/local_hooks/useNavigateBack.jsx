import bodyNoScroll from "@functions/bodyNoScroll.js";
import useAddDisplayClass from "./useAddDisplayClass.jsx";

const useNavigateBack = (cartWrapperRef, backgroundWhiteRef, classes) => {
  const { enableScroll } = bodyNoScroll();

  const { navigate } = useAddDisplayClass();

  //  user wants to return away from cart
  const handleNavigateBack = () => {
    cartWrapperRef.current.classList.remove(classes.slideFromRight); // side-bar goes back before navigating away

    setTimeout(() => {
      // once cartWrapperRef is gone, fade back into website
      backgroundWhiteRef.current.classList.remove(
        classes.appearBackgroundWhite
      );
    }, 200);

    setTimeout(() => {
      // once transition is completed, navigate url to previous page
      navigate(-1);
      enableScroll();
    }, 500); // transitiion for slideFromRight is 0.2s; needs to match
  };

  return { handleNavigateBack };
};

export default useNavigateBack;
