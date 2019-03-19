import React from "react";
import { connect } from "react-redux";
import { PacmanLoader } from "react-spinners";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch,
} from "react-router-dom";
import { Shop, Favorites, Cart, PageNotFound, Login } from "./pages";
import { PageLayout, PrivateRoute } from "./components";
import auth from "../auth";
import shop from "../shop";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.NAV_LINKS = [
      { title: "Logout", accessLevel: "onlyLogged", onClick: props.logout },
      { title: "Login", accessLevel: "notLogged", to: "/login" },
      { title: "Shop", to: "/shop" },
      { title: "Cart", to: "/cart" },
      {
        title: "Favorites",
        to: "/favorites",
        accessLevel: "onlyLogged",
      },
    ];
  }

  componentDidMount() {
    const { getProducts, getProductsSuccess, getProductsFailure } = this.props;

    getProducts();
    fetch("https://boiling-reaches-93648.herokuapp.com/food-shop/products")
      .then(response => response.json())
      .then(json => {
        const products = json.map(product => ({
          ...product,
          isFavorite: false,
          cartCount: 0,
        }));
        getProductsSuccess(products);
      })
      .catch(() => getProductsFailure("Something went wrong"));
  }

  renderNav = () => {
    const { isLogged } = this.props;

    return this.NAV_LINKS.map(
      ({ title, accessLevel = "always", to = "#", ...props }, i) => {
        if (accessLevel === "onlyLogged" && isLogged) {
          return (
            <NavLink key={i} to={to} {...props}>
              {title}
            </NavLink>
          );
        }

        if (accessLevel === "notLogged" && !isLogged) {
          return (
            <NavLink key={i} to={to} {...props}>
              {title}
            </NavLink>
          );
        }

        if (accessLevel === "always") {
          return (
            <NavLink key={i} to={to} {...props}>
              {title}
            </NavLink>
          );
        }

        return undefined;
      }
    ).filter(Boolean);
  };

  render() {
    const { loading, error } = this.props;

    return (
      <Router>
        <PageLayout navLinks={this.renderNav()}>
          {loading && <PacmanLoader />}
          {error && <h2 className="errorMessage">{error}</h2>}
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/shop" component={Shop} />
            <PrivateRoute exact path="/favorites" component={Favorites} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/404" component={PageNotFound} />
            <Redirect exact from="/" to="/shop" />
            <Redirect to="/404" />
          </Switch>
        </PageLayout>
      </Router>
    );
  }
}

const enhance = connect(
  state => ({
    error: state.shop.error,
    loading: state.shop.loading,
    isLogged: !!state.auth.token,
  }),
  dispatch => ({
    getProducts: () => dispatch({ type: shop.types.FETCH_PRODUCTS }),
    getProductsSuccess: payload =>
      dispatch({
        type: shop.types.FETCH_PRODUCTS_SUCCESS,
        payload,
      }),
    getProductsFailure: payload =>
      dispatch({
        type: shop.types.FETCH_PRODUCTS_FAILURE,
        payload,
      }),
    logout: () => dispatch({ type: auth.types.LOGOUT }),
  })
);

export default enhance(App);
