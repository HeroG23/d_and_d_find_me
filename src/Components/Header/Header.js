import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/userReducer";
import "./Header.css";

function Header({user, logout}) {
  return (
    <header>
      <nav className="nav-links">
        <Link className="home-nav" to="/feed">
          Home
        </Link>
        <Link className="form-nav" to="/postform">
          Create New Post
        </Link>
        <Link className="profile-nav" to="/profile">
          Profile
        </Link>
        <Link className="logout-nav" to="/" onClick={logout}>
          Logout
        </Link>
        <h2>Welcome, {user.username}</h2>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { logout })(Header);
