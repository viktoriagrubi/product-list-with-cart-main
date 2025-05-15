import rawData from "./data.json";

const images = import.meta.glob("../assets/images/*.{jpg,png,jpeg}", {
  eager: true,
  as: "url",
});

const products = rawData.map((product) => {
  const getFileName = (path) => path.split("/").pop();

  return {
    ...product,
    image: {
      thumbnail:
        images[`../assets/images/${getFileName(product.image.thumbnail)}`],
      mobile: images[`../assets/images/${getFileName(product.image.mobile)}`],
      tablet: images[`../assets/images/${getFileName(product.image.tablet)}`],
      desktop: images[`../assets/images/${getFileName(product.image.desktop)}`],
    },
  };
});

export default products;
