import { useEffect, useMemo, useState } from "react";
import intersecter from "@functions/interSection.js";

const useCategoryEffect = (categoriesRef) => {
  const { intersect } = useMemo(() => intersecter({ unMount: true }), []);
  const [observering, setObserving] = useState(false);

  useEffect(() => {
    if (!categoriesRef || !categoriesRef.current) return;

    const observer = intersect(categoriesRef, setObserving);

    return () => observer.disconnect();
  }, [intersect, categoriesRef]);

  return {
    observering,
  };
};

export default useCategoryEffect;
