import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import CreatePage from './createPage/createPage'
import ViewPage from './viewPage/viewPage'

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Switch>
          <Route exact path="/">
            <CreatePage />
          </Route>
          <Route path="/about">
            <p>ABOUT PAGE</p>
          </Route>
          <Route path="/howto">
            <p>HOW TO</p>
          </Route>
          <Route>
            <ViewPage/>
          </Route>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
