import {Switch, Route} from 'react-router-dom';

import Auth from './Components/Auth/Auth';
import Feed from './Components/Feed/Feed';
import Post from './Components/Post/Post';
import Form from './Components/Form/Form';
import Comments from './Components/Comments/Comments';
import FunStories from './Components/FunStories/FunStories';
import Profile from './Components/Profile/Profile';

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/feed' component={Feed}/>
        <Route path='/posts/:id' component={Post}/>
        <Route path='/comments/:id' component={Comments}/>
        <Route path='/form' component={Form}/>
        <Route path='/fun' component={FunStories}/>
        <Route path='/profile' component={Profile}/>
    </Switch>
)