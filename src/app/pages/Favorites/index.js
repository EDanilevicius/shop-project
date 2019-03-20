import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ProductCard, ProductContainer } from "../../components";
import shop from "../../../shop";

function Favorites({ products, toggleFavorite, updateCartCount }) {
  return (
    <ProductContainer>
      {products.map(product => (
        <ProductCard
          key={product.id}
          {...product}
          toggleFavorite={toggleFavorite}
          updateCartCount={updateCartCount}
        />
      ))}
    </ProductContainer>
  );
}

Favorites.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  updateCartCount: PropTypes.func.isRequired,
};

const enhance = connect(
  state => ({
    products: shop.selectors.getFavouriteProducts(state),
  }),
  dispatch => ({
    toggleFavorite: id =>
      dispatch({ type: shop.types.TOGGLE_FAVORITE_PRODUCT, payload: id }),
    updateCartCount: (id, count) =>
      dispatch({
        type: shop.types.UPDATE_PRODUCT_CART_COUNT,
        payload: { id, count },
      }),
  })
);

export default enhance(Favorites);
