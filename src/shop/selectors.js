import { NAME } from "./constants";

export const getProducts = state => state[NAME].products;

export const getCartProducts = state => {
  const allProducts = getProducts(state);

  return allProducts.filter(product => product.cartCount > 0);
};

export const getFavouriteProducts = state => {
  const allProducts = getProducts(state);

  return allProducts.filter(product => product.isFavorite);
};

export const isLoading = state => state[NAME].loading;
export const getError = state => state[NAME].error;
