const bodyNoScroll = () => {
  const body = document.body;

  const disableScroll = () => (body.style.overflow = "hidden");

  const enableScroll = () => (body.style.overflow = "");

  return {
    disableScroll,
    enableScroll,
  };
};

export default bodyNoScroll;
