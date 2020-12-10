import axios from "axios";
import { connect } from "react-redux";
import { useState } from "react";
import {getUser} from '../../redux/userReducer';

const styles = {
  name: { fontSize: "28px", fontWeight: "600" },
  dm: { fontSize: "22px", fontWeight: "500" },
};

const Profile = (props) => {
  const [user, setUser] = useState(props.user);
  const [online, setOnline] = useState(props.user.online);
  const [dm, setDm] = useState(props.user.dm);
  const [edit, setEdit] = useState(false);

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/auth/user", {
        dm,
        online,
      });
      setUser({ ...props.user, dm: res.data.dm, online: res.data.online });
      getUser({...props.user, dm: res.data.dm, online: res.data.online})
      setEdit(!edit)
    } catch (err) {
      console.log(err);
    }
  };
 console.log(props)
  return (
    <div className="Profile content-box">
      <div className="user-info" style={{ border: "2px solid black" }}>
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
          }}
        >
          {props.user.username}
        </h1>
        <h2 style={styles.name}>{props.user.first_name}</h2>
        <h2 style={styles.name}>{props.user.last_name}</h2>
        {edit ? (
          <div>
            <form className="inputs" onSubmit={e => updateUser(e)}>
              <div id="dm">
                <p>DM or Adventurer</p>
                <label htmlFor="dm-true">True</label>
                <input
                  type="radio"
                  name="dm"
                  id="dm-true"
                  value="true"
                  onChange={(e) => setDm(e.target.value)}
                />
                <label htmlFor="dm-false">False</label>
                <input
                  type="radio"
                  name="dm"
                  id="dm-false"
                  value="false"
                  onChange={(e) => setDm(e.target.value)}
                />
              </div>
              <div id="online">
                <p>Online Or In person</p>
                <label htmlFor="online-true">True</label>
                <input
                  type="radio"
                  name="online"
                  id="online-true"
                  value="true"
                  onChange={(e) => setOnline(e.target.value)}
                />
                <label htmlFor="online-false">False</label>
                <input
                  type="radio"
                  name="online"
                  id="online-false"
                  value="false"
                  onChange={(e) => setOnline(e.target.value)}
                />
              </div>
              <div className="user-buttons">
                <button type="submit" >Submit</button>
                <button type="reset" onClick={()=>setEdit(!edit)}>Cancel</button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            {props.user.dm ? (
              <h3 style={styles.dm}>I am a DM</h3>
            ) : (
              <h3 style={styles.dm}>I am just a mere adventurer</h3>
            )}
            {props.user.online === true ? (
              <h3 style={styles.dm}>I can't adventure in person</h3>
            ) : (
              <h3 style={styles.dm}>I like adventuring in person</h3>
            )}
            <button onClick={()=> setEdit(!edit)}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps, {getUser})(Profile);
