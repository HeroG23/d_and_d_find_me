import {Switch, Route} from 'react-router-dom';

import Auth from './Components/Auth/Auth';
import Feed from './Components/Feed/Feed';
import Post from './Components/Post/Post';
import PostForm from './Components/Forms/PostForm/PostForm';
import ContactUs from './Components/ContactUs/ContactUs';
import CommForm from './Components/Forms/CommForm/CommForm';
import FunStories from './Components/FunStories/FunStories';
import Profile from './Components/Profile/Profile';

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/feed' component={Feed}/>
        <Route path='/posts/:id' component={Post}/>
        <Route path='/commform' component={CommForm}/>
        <Route path='/postform' component={PostForm}/>
        <Route path='/contact' component={ContactUs}/>
        <Route path='/fun' component={FunStories}/>
        <Route path='/profile' component={Profile}/>
    </Switch>
)