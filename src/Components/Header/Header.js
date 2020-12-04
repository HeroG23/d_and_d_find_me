import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/userReducer";
import "./Header.css";

function Header({ user, logout }) {
  return (
    <header>
      <nav className="nav-links">
        
          <Link style={{textDecoration: "none"}} className="home-nav" to="/feed">
            Home
          </Link>
          <Link style={{textDecoration: "none"}} className="form-nav" to="/postform">
            Create New Post
          </Link>
          <Link style={{textDecoration: "none"}} className="profile-nav" to="/profile">
            <h2>Welcome, {user.username}</h2>
          </Link>
        <div><br/></div>
        <Link style={{textDecoration: "none"}} className="logout-nav" to="/" onClick={logout}>
          Logout
        </Link>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { logout })(Header);
