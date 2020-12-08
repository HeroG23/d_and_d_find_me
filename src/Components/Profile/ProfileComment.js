import {connect} from "react-redux";
import axios from 'axios';

const ProfileComment = ({comment, user}) => {

    return(
        <div>
            <h1>{comment.body}</h1>
        </div>
    )
}

const mapStateToProps = state => state
export default connect(mapStateToProps)(ProfileComment)