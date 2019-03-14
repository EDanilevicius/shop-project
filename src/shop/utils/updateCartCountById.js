export default (products, id, cartCount) =>
  products.map(product => {
    if (product.id === id) {
      return { ...product, cartCount };
    }
    return product;
  });
