import React from "react";
import "./index.scss";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
    };
  }

  onLogin = () => {
    const { username, password } = this.state;
    const { history } = this.props;

    if (username && password) {
      history.replace("/favorites");
    }
  };

  render() {
    return (
      <div className="Webshop-Login">
        <div className="Webshop-Login--form">
          <input
            onChange={e => this.setState({ username: e.target.value })}
            type="text"
            placeholder="Your IRC Nick"
          />
          <input
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Password"
          />
          <button onClick={this.onLogin} type="button">
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
