import React from "react";
import PropTypes from "prop-types";
import { ProductCard } from "../../components";
import "./index.scss";

function Favorites({ products, toggleFavorite }) {
  return (
    <div className="Products-Page">
      {products.map(product => (
        <ProductCard
          key={product.id}
          {...product}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

Favorites.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      currencySymbol: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      isFavorite: PropTypes.bool.isRequired,
    })
  ),
  toggleFavorite: PropTypes.func.isRequired,
};

Favorites.defaultProps = {
  products: [],
};

export default Favorites;
