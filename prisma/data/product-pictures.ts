type ProductItem = {
  id: string;
};

const getProductIndex = () => Math.floor(Math.random() * 6) + 1;

export const generateProductPictureList = (product: ProductItem, count = 4) =>
  [...Array(count).keys()].map(() => ({
    imagePath: `/pictures/${getProductIndex()}.png`,
    productId: product.id,
    cover: count === 4
  }));
