import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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
    toggleFavorite: bindActionCreators(shop.actions.toggleFavorite, dispatch),
    updateCartCount: bindActionCreators(shop.actions.updateCartCount, dispatch),
  })
);

export default enhance(Favorites);
