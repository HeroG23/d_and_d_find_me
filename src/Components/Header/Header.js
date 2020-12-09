import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/userReducer";
import "./Header.css";

const styles = {
  link: { textDecoration: "none" },
};

function Header({ user, logout }) {
  return (
    <header>
      <nav className="nav-links">
        <Link style={styles.link} className="home-nav" to="/feed">
          Home
        </Link>
        <Link style={styles.link} className="form-nav" to="/postform">
          Create New Post
        </Link>
        <Link style={styles.link} className="profile-nav" to="/profile">
          <h2>Welcome, {user.username}</h2>
        </Link>
        <Link style={styles.link} className="contact-nav" to="/contact">
          Contact Us
        </Link>
        <Link
          style={styles.link}
          className="logout-nav"
          to="/"
          onClick={logout}
        >
          Logout
        </Link>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { logout })(Header);
