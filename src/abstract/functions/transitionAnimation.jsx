// apply class to ref that is intersecting
const transitionInAnimation = (
  ref,
  className,
  disconnect = false,
  rootMargin = 5
) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(className);
      } else {
        if (disconnect === true) {
          entry.target.classList.remove(className);
        }
      }
    },
    {
      rootMargin: `-${rootMargin}% 0px -${rootMargin}% 0px`, // apply class further into the screen-intersection
      threshold: 0.5,
    }
  );

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
