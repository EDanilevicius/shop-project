import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";
import { ProductCard, ProductContainer } from "../../components";
import shop from "../../../shop";

function Shop({ products, toggleFavorite, updateCartCount }) {
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

Shop.propTypes = {
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
    products: shop.selectors.getProducts(state),
  }),
  dispatch => ({
    toggleFavorite: bindActionCreators(shop.actions.toggleFavorite, dispatch),
    updateCartCount: bindActionCreators(shop.actions.updateCartCount, dispatch),
  })
);

export default enhance(Shop);
