import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function ProductCard({
  image,
  name,
  price,
  currencySymbol,
  id,
  isFavorite,
  toggleFavorite,
  cartCount,
  description,
  updateCartCount,
}) {
  return (
    <div key={id} className="Product-Card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <span className="Price">
        {price}-{currencySymbol}
      </span>
      <p>{description}</p>
      <div className="Card-Buttons">
        <input
          type="number"
          min={0}
          onChange={e => updateCartCount(id, e.target.value)}
          value={cartCount}
        />
        <button type="submit" onClick={() => toggleFavorite(id)}>
          <span role="img" aria-label="favorites button">
            {isFavorite ? "💔 Favorite" : "👍 Add to favorites"}
          </span>
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  currencySymbol: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  cartCount: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  description: PropTypes.string.isRequired,
  updateCartCount: PropTypes.func.isRequired,
};

export default ProductCard;
