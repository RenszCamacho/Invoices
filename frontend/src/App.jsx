import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { Provider } from 'react-redux';
import Dashboard from './components/Dashboard';
import configureStore from './redux/store';
import Details from './components/Details';
import Forms from './components/Forms';

function App() {
  return (
    <Provider store={configureStore()}>
      <Router>
        <Switch>
          <Route path="/details/:invoiceId" component={Details} />
          <Route path="/" exact component={Dashboard} />
          <Route path="/form" component={Forms} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
