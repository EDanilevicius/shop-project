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
  description,
}) {
  return (
    <div key={id} className="Product-Card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <span>
        {price}-{currencySymbol}
      </span>
      <p>{description}</p>
      <div className="Card-Buttons">
        <button type="submit">
          <span role="img" aria-label="shopping cart">
            🛒 Checkout
          </span>
        </button>
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
  description: PropTypes.string.isRequired,
};

export default ProductCard;
