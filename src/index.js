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
import PresentationPreview from './components/PresentationPreview';
import StudentScreen from './components/StudentScreen';

startConnection(store);

ReactDOM.render(
<Provider store={store}>
  <BrowserRouter>
  <Switch>
    <Route exact path="/" component={App} />
    <Route exact path="/home" component={HomePage} />
    <Route path="/home/:id" component={HomePage} />
    <Route path="/presenter" component={PresenterScreen} />
    <Route exact path="/presentation/:id" component={PresentationPreview} />
    <Route path="/presentation/:id/projector" component={ProjectorScreen} />
    <Route path="/presentation/:id/presenter" component={PresenterScreen} />
    <Route path="/presentation/:id/student" component={StudentScreen} />
  </Switch>
  </BrowserRouter>
</Provider>
, document.getElementById('root'));
registerServiceWorker();
