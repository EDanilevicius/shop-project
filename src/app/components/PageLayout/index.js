import React from "react";
import PropTypes from "prop-types";
import "./index.scss";

function PageLayout({ children, navLinks }) {
  return (
    <div className="Page-Layout">
      <header>
        <img
          src="https://cdn6.f-cdn.com/contestentries/935496/23480148/58a670ed3dca2_thumb900.jpg"
          alt="Shop company logo"
          className="Logo"
        />
        <nav>
          {navLinks.map((link, i) => (
            <span key={i} className="Nav-Link">
              {link}
            </span>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <footer>© Copyright 2019</footer>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  navLinks: PropTypes.arrayOf(PropTypes.node),
};

PageLayout.defaultProps = {
  navLinks: [],
};

export default PageLayout;
