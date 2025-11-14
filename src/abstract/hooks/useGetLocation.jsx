import { useLocation } from "react-router-dom";

const useGetLocation = () => {
  const location = useLocation(),
    state = location.state,
    backgroundLocation = state?.backgroundLocation || null,
    prevBackgroundLocation = state?.prevBackgroundLocation || null,
    pathname = location.pathname;

  return {
    location,
    state,
    backgroundLocation,
    prevBackgroundLocation,
    pathname,
  };
};

export default useGetLocation;
