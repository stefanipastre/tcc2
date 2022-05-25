import './App.css';
import {BrowserRouter as Router, Switch, Route} from  'react-router-dom'
import Home from './pages';
import SigninPage from './pages/signin';
import FormPage from './pages/form';
import Profile from './pages/profile';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/signin' component={SigninPage} exact />
        <Route path='/form' component={FormPage} exact />
      </Switch>
    </Router>
  );
}

export default App;

