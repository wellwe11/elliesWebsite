const intersectingRefs = (refs, classToAdd) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(classToAdd);
        } else {
          entry.target.classList.remove(classToAdd);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  const elements = refs.current || [];

  console.log(elements);
  if (elements) {
    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }
};

export default intersectingRefs;
