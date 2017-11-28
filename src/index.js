import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import store from './store';
import startConnection from './connections';

import HomePage from './components/HomePage';
import ProjectorScreen from './components/ProjectorScreen';
import PresenterScreen from './components/PresenterScreen';

startConnection(store);

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/home" component={HomePage} />
    <Route path="/home/:id" component={HomePage} />
    <Route path="/projector" component={ProjectorScreen} />
    <Route path="/presenter" component={PresenterScreen} />
  </Switch>
  </BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
