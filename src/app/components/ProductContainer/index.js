import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function ProductContainer({ children, className }) {
  return <div className={`Products-Page ${className}`}>{children}</div>;
}

ProductContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.node.isRequired,
};

export default ProductContainer;
