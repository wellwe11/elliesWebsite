const transitionInAnimation = (ref, className, disconnect = false) => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      entry.target.classList.add(className);
    } else {
      if (disconnect === true) {
        entry.target.classList.remove(className);
      }
    }
  });

  const element = ref.current;

  if (element) {
    observer.observe(element);
  }

  return () => {
    if (element) {
      observer.unobserve(element);
    }
    observer.disconnect();
  };
};

export default transitionInAnimation;
