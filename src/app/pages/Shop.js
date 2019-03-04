import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function Shop({ products }) {
  return (
    <div className="Products-Page">
      {products.map(product => (
        <div className="Product-Card">
          <img key={products.id} src={product.image} alt={product.name} />
          <h3 key={products.id}>{product.name}</h3>
          <span key={products.id}>
            {product.price}-{product.currencySymbol}
          </span>
          <p key={products.id}>{product.description}</p>
          <div className="Card-Buttons">
            <button type="submit">
              <span role="img" aria-label="shopping cart">
                🛒
              </span>
            </button>
            <button type="submit">Add to favorites</button>
          </div>
        </div>
      ))}
    </div>
  );
}

Shop.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

Shop.defaultProps = {
  products: [],
};

export default Shop;
