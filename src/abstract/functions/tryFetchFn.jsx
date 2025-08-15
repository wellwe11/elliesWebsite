// fetch dynamic data
const tryFetchFn = async (link) => {
  try {
    // json containing all info
    const response = await fetch(link);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

export default tryFetchFn;
