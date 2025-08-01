import { useNavigate } from "react-router-dom";

// smoothly transitions between pages
const handleNavigateSmooth = () => {
  const navigate = useNavigate();

  const handleNavigate = (link) => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate(link);
      });
    } else {
      navigate(link);
    }
  };

  return handleNavigate;
};

export default handleNavigateSmooth;
