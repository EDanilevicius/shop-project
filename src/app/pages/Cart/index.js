import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ProductContainer } from "../../components";
import "./index.scss";

function Cart({ products }) {
  const total = products.reduce((result, product) => {
    return result + product.price * product.cartCount;
  }, 0);

  return (
    <ProductContainer className="Cart">
      {products.map(({ id, name, price, cartCount, image }) => {
        return (
          <div key={id} className="Cart-item">
            <div>
              <img src={image} alt={name} />
              <span>{name}</span>
            </div>
            <div>{price}</div>
            <div>{cartCount}</div>
            <div>{price * cartCount}</div>
          </div>
        );
      })}
      <div className="Cart-total">{`Total: ${total}`}</div>
    </ProductContainer>
  );
}

Cart.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};

Cart.defaultProps = {
  products: [],
};

function mapStateToProps(state) {
  return {
    products: state.shop.products.filter(product => product.cartCount > 0),
  };
}

export default connect(mapStateToProps)(Cart);
