import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/userReducer";
import "./Header.css";

function Header({username, logout}) {

  return (
    <header>
      <div className="Header">
        <div className="Profile-Container">
          <p>{username}</p>
        </div>
        <nav className="nav-links">
            <Link to='/feed'>Home</Link>
            <Link to="/form">Create New Post</Link>
        </nav>
        <Link to="/" onClick={logout}>Logout</Link>
      </div>
    </header>
  );
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {logout})(Header);
