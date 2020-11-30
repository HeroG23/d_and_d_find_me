import { connect } from "react-redux";
import { getUser } from "../../redux/reducer";
import axios from "axios";
import "./Auth.css";
import { Component } from "react";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      dm: false,
      online: false,
      registerView: false,
    };
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  login = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    try {
      const user = await axios.post("/auth/login", { username, password });
      this.props.getUser(user.data.username, user.data.dm, user.data.userId);
      this.props.history.push("/feed");
    } catch (err) {
      alert(err.response.request.response);
    }
  };
  register = async (e) => {
    e.preventDefault();
    const { email, password, username, dm, online } = this.state;
    try {
      const user = await axios.post("/auth/register", {
        email,
        password,
        username,
        dm,
        online,
      });
      this.props.getUser(user.data.userId, user.data.username, user.data.dm);
      this.props.history.push("/feed");
    } catch (err) {
      alert(err.response.request.response);
    }
  };

  toggleView = () => {
    this.setState({ registerView: !this.state.registerView });
  };

  render() {
    const { email, username, password, dm, online } = this.state;
    return (
      <div className="Auth">
        {!this.state.registerView ? (
          <div className="Login">
            <h1>D&D Find Me</h1>
            <br />
            <h2>Login</h2>
            <br />
            <p>Username:</p>
            <input
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => this.changeHandler(e)}
            />
            <br />
            <p>password</p>
            <input
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => this.changeHandler(e)}
            />
            <div className="Auth-buttons">
              <button className="entry-button" onClick={this.login}>
                Login
              </button>
              <button className="view-button" onClick={this.toggleView}>
                Need to Register?
              </button>
            </div>
          </div>
        ) : (
          <div className="Register">
            <h1>D&D Find Me</h1>
            <br />
            <h2>Register</h2>
            <br />
            <p>email:</p>
            <input
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => this.changeHandler(e)}
            />
            <br />
            <p>username:</p>
            <input
              name="username"
              placeholder="username"
              value={username}
              onChange={(e) => this.changeHandler(e)}
            />
            <br />
            <p>password</p>
            <input
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => this.changeHandler(e)}
            />
            <br />
            <input type="checkbox" onClick={this.setState({ [dm]: true })}>
              Are you a dm?
            </input>
            <br />
            <input type="checkbox" onClick={this.setState({ [online]: true })}>
              Adventure online?
            </input>
            <div className="Auth-buttons">
              <button className="entry-button" onClick={this.register}>
                Register
              </button>
              <button className="view-button" onClick={this.toggleView}>
                Already Registered?
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getUser })(Auth);
