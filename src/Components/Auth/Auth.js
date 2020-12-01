import { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getUser } from "../../redux/userReducer";
import axios from "axios";
import AuthForm from "./AuthForm/AuthForm";
import "./Auth.css";

const Auth = ({ getUser }) => {
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    dm: false,
    online: false,
  });
  const [loggingIn, setLoggingIn] = useState(true);
  const history = useHistory();

  const entryFn = async (e) => {
    e.preventDefault();
    const { email, username, password, dm, online } = state;
    try {
      const user = await axios.post(
        `/auth/${loggingIn ? "login" : "register"}`,
        loggingIn
          ? { username, password }
          : { email, username, password, dm, online }
      );
      getUser(user.data);
      history.push("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthForm
      state={state}
      setState={setState}
      entryFn={entryFn}
      loggingIn={loggingIn}
      setLoggingIn={setLoggingIn}
    />
  );
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, { getUser })(Auth);
