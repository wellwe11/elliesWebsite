import { useEffect, useRef } from "react";

// function which saves the previous page when you switch pages etc.
// Used inside of ProductsWrapperComponent's useEffect to avoid page from scrolling to top unnecessarily
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;
