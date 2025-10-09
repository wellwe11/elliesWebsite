import { useLocation } from "react-router-dom";

const useGetLocation = () => {
  const location = useLocation(),
    state = location.state,
    backgroundLocation = state?.backgroundLocation;

  return {
    location,
    state,
    backgroundLocation,
  };
};

export default useGetLocation;
