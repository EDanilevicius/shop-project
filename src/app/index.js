import React from "react";
import { PacmanLoader } from "react-spinners";
import { Shop, Favorites, Cart } from "./pages";
import { PageLayout } from "./components";

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
      route: "shop",
    };

    this.NAV_LINKS = ["shop", "cart", "favorites"].map(link => (
      <button
        type="button"
        href="#"
        onClick={() => this.setState({ route: link })}
      >
        {link}
      </button>
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

  renderRoute = () => {
    const { route, products } = this.state;

    switch (route) {
      case "shop":
        return (
          <Shop
            products={products}
            toggleFavorite={this.toggleFavorite}
            updateCartCount={this.updateCartCount}
          />
        );

      case "favorites":
        return (
          <Favorites
            products={products.filter(product => product.isFavorite)}
            toggleFavorite={this.toggleFavorite}
            updateCartCount={this.updateCartCount}
          />
        );

      case "cart":
        return (
          <Cart products={products.filter(product => product.cartCount > 0)} />
        );

      default:
        return (
          <Shop
            products={products}
            toggleFavorite={this.toggleFavorite}
            updateCartCount={this.updateCartCount}
          />
        );
    }
  };

  render() {
    const { loading, error } = this.state;

    return (
      <PageLayout navLinks={this.NAV_LINKS}>
        {loading && <PacmanLoader />}
        {error && <h2 className="errorMessage">{error}</h2>}
        {this.renderRoute()}
      </PageLayout>
    );
  }
}

export default App;
