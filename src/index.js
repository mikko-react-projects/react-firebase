import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';
import App from './App';
import { signInSuccess } from './actions/auth';
import 'semantic-ui-css/semantic.min.css';

if(localStorage.todotoken) {
  const user = localStorage.todotoken;
  store.dispatch(signInSuccess(user));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={null} persistor={persistor}>
        <Route component={App} />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
