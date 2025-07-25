import { useNavigate } from "react-router-dom";

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
