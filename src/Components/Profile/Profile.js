import axios from "axios";
import { connect } from "react-redux";
import { useState} from "react";


const styles = {
  name: { fontSize: "28px", fontWeight: "600" },
  dm: { fontSize: "22px", fontWeight: "500" },
};

const Profile = (props) => {
  const [user, setUser] = useState(props.user)
  const [edit, setEdit] = useState(false);

  const updateUser = async (e) =>{
    e.preventDefault();
    try{
      const res = await axios.put('/auth/user', {user_id: props.user.user_id, dm: props.user.dm, online: props.user.online} )
      setUser({...user, dm:res.data, online: res.data})
    } catch(err){
      console.log(err)
    }
  }

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
        {props.user.dm ? (
          <h3 style={styles.dm}>I am a DM</h3>
        ) : (
          <h3 style={styles.dm}>I am just a mere adventurer</h3>
        )}
        {props.user.online ?(
          <h3 style={styles.dm}>I can't adventure in person</h3>
        ):(
          <h3 style={styles.dm}>I like adventuring in person</h3>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Profile);
