import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.css";
import { createStore,applyMiddleware } from "redux";
import rootReducer from "./Redux/rootReducer";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const loggerMiddleware = store => next => action => {
  const result = next(action);
  console.log('Middleware', store.getState());
  return result
}

const store = createStore(
    rootReducer,
    applyMiddleware(loggerMiddleware)
  );
  
  const app = (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  
  ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
