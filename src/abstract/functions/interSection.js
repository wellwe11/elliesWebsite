const elementOptions = (arg = {}) => {
  const { style = {}, className = "" } = arg;

  const applyStyle = (el) => {
    if (el && Object.keys(style).length > 0) {
      for (const key in style) {
        el.style[key] = style[key];
      }
    }
  };

  const removeStyle = (el) => {
    if (el && Object.keys(style).length > 0) {
      for (const key in style) {
        el.style[key] = "";
      }
    }
  };

  const applyClassName = (el) => {
    if (el && className.length > 0) {
      el.classList.add(className);
    }
  };

  const removeClassName = (el) => {
    if (el && className.length > 0) {
      el.classList.remove(className);
    }
  };

  return {
    applyStyle,
    applyClassName,
    removeClassName,
    removeStyle,
  };
};

const intersecter = (arg = {}) => {
  const {
    unMount = false,
    threshold = 0.4,
    rootMargin = "0px 0px -50px 0px",
  } = arg;
  const { applyStyle, removeStyle, applyClassName, removeClassName } =
    elementOptions(arg);

  const intersect = (ref, onIntersect) => {
    if (!ref) {
      return console.error("Please add ref to intersecting function");
    }

    const element = ref.current;
    if (!element) {
      return console.error(
        "IntersectingObserver function: intersecting, requires a ref to run"
      );
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // apply styles/classes
            applyStyle(entry.target);
            applyClassName(entry.target);

            if (onIntersect) {
              onIntersect(true);
            }

            // if styles/classes should remain
            if (unMount) {
              observer.unobserve(entry.target);
            }

            // if styles/classes should be applied on each intersection
          } else if (!unMount) {
            removeClassName(entry.target);
            removeStyle(entry.target);

            if (onIntersect) {
              onIntersect(false);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return observer;
  };

  return {
    intersect,
  };
};

export default intersecter;
