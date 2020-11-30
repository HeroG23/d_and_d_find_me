import {Switch, Route} from 'react-router-dom';

import Auth from './Components/Auth/Auth';
import Feed from './Components/Feed/Feed';
import Form from './Components/Form/Form';
import Posts from './Components/Posts/Posts';
import Comments from './Components/Comments/Comments';
import FunStories from './Components/FunStories/FunStories';
import Profile from './Components/Profile/Profile';

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/feed' component={Feed}/>
        <Route path='/posts/:id' component={Posts}/>
        <Route path='/comments/:id' component={Comments}/>
        <Route path='/new' component={Form}/>
        <Route path='/fun' component={FunStories}/>
        <Route path='/profile' component={Profile}/>
    </Switch>
)