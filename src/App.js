import './App.css';
import Header from './Components/Header/Header'
import routes from './routes'
import {useLocation} from 'react-router-dom'

function App() {
  const location = useLocation()
  return (
    <div className="App">
      {location.pathname === '/' ? null : <Header/>}
      {routes}
    </div>
  );
}

export default App;
