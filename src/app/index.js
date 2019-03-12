import React from "react";
import { PacmanLoader } from "react-spinners";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch,
} from "react-router-dom";
import { Shop, Favorites, Cart, PageNotFound } from "./pages";
import { PageLayout } from "./components";

function PrivateRoute({ allow, path, ...props }) {
  if (allow) {
    return <Route {...props} path={path} />;
  }

  return (
    <Redirect
      to={{
        pathname: "/shop",
        state: { intendedLocation: path },
      }}
    />
  );
}

// const NAV_LINKS = ["shop", "cart", "favorites"].map(link => (
//   <button type="button" href="#" onClick={() => this.setState({ route: link })}>
//     {link}
//   </button>
// ));

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      error: null,
      loading: false,
      allow: false,
    };

    this.NAV_LINKS = ["shop", "cart", "favorites"].map(link => (
      <NavLink to={`/${link}`}>{link}</NavLink>
    ));
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch("https://boiling-reaches-93648.herokuapp.com/food-shop/products")
      .then(response => response.json())
      .then(json => {
        const products = json.map(product => ({
          ...product,
          isFavorite: false,
          cartCount: 0,
        }));
        this.setState({ products, loading: false });
      })
      .catch(() =>
        this.setState({ error: "Something gone wrong", loading: false })
      );
  }

  toggleFavorite = id => {
    // console.log("Toggle Favorite", id);
    this.setState(state => ({
      products: state.products.map(product => {
        if (product.id === id) {
          return { ...product, isFavorite: !product.isFavorite };
        }
        return product;
      }),
    }));
  };

  updateCartCount = (id, value) => {
    this.setState(state => ({
      products: state.products.map(product => {
        if (product.id === id) {
          return { ...product, cartCount: value };
        }
        return product;
      }),
    }));
  };

  login = (intended, history) => {
    this.setState({ allow: true }, () => {
      history.replace(intended || "/favorites");
    });
  };

  logout = () => {
    console.log("logout");
    this.setState({ allow: false });
  };

  renderShop = props => {
    const { products, allow } = this.state;

    return (
      <Shop
        {...props}
        allow={allow}
        login={intended => this.login(intended, props.history)}
        logout={this.logout}
        products={products}
        toggleFavorite={this.toggleFavorite}
        updateCartCount={this.updateCartCount}
      />
    );
  };

  renderFavorites = () => {
    const { products } = this.state;
    return (
      <Favorites
        products={products.filter(product => product.isFavorite)}
        toggleFavorite={this.toggleFavorite}
        updateCartCount={this.updateCartCount}
      />
    );
  };

  renderCart = () => {
    const { products } = this.state;
    return (
      <Cart products={products.filter(product => product.cartCount > 0)} />
    );
  };

  render() {
    const { loading, error, allow } = this.state;

    return (
      <Router>
        <PageLayout navLinks={this.NAV_LINKS}>
          {loading && <PacmanLoader />}
          {error && <h2 className="errorMessage">{error}</h2>}
          <Switch>
            <Route exact path="/shop" component={this.renderShop} />
            <Route exact path="/favorites" component={this.renderFavorites} />
            <PrivateRoute
              allow={allow}
              exact
              path="/cart"
              component={this.renderCart}
            />
            <Route exact path="/404" component={PageNotFound} />
            <Redirect exact from="/" to="/shop" />
            <Redirect to="/404" />
          </Switch>
        </PageLayout>
      </Router>
    );
  }
}

export default App;
