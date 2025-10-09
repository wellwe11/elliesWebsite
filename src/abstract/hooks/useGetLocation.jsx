import { useLocation } from "react-router-dom";

const useGetLocation = () => {
  const location = useLocation(),
    state = location.state,
    backgroundLocation = state?.backgroundLocation,
    pathname = location.pathname;

  return {
    location,
    state,
    backgroundLocation,
    pathname,
  };
};

export default useGetLocation;
