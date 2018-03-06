export const downloadHTMLAsync = async (url) => {
  try {

    let res = await fetch(url);
    let result = await res.text();
    return result;
  } catch (error) {
    console.error(error);
  }
};