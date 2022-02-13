export const getSubDomain = () => {
  const parsedData = window.location.host.split(".");
  let subDomain;

  if (parsedData.length >= 3 && parsedData[0].toLowerCase() !== "www") {
    subDomain = parsedData[0];
  }

  return subDomain;
};
