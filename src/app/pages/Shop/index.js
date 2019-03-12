import React from "react";
import PropTypes from "prop-types";
import { ProductCard, ProductContainer } from "../../components";

function Shop({
  products,
  toggleFavorite,
  updateCartCount,
  login,
  allow,
  logout,
  history,
  location,
}) {
  const  intended  = location.state && location.state.intendedLocation;

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
      {allow && (
        <button type="button" onClick={() => history.push("/cart")}>
          Go to Checkout
        </button>
      )}
      <button type="button" onClick={() => (allow ? logout : login(intended))}>
        {allow ? "Logout" : "Login"}
      </button>
    </ProductContainer>
  );
}

Shop.propTypes = {
  history: PropTypes.shape({}).isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
  toggleFavorite: PropTypes.func.isRequired,
  updateCartCount: PropTypes.func.isRequired,
};

Shop.defaultProps = {
  products: [],
};

export default Shop;
