const setRef = (el, ref) => {
  if (el && !ref.current.includes(el)) {
    ref.current.push(el);
  }
};

export default setRef;
