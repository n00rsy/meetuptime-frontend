import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import CreatePage from './createPage/createPage'
import ViewPage from './viewPage/viewPage'
import NavigationBar from './shared/navbar'
import Footer from './shared/footer'
import Background from './shared/background'
/*
<h1>React Router Example</h1>
    <ul role="nav">
    <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/howto">How To</Link></li>
      <li><Link to="/faq">FAQ</Link></li>
    </ul>
*/


ReactDOM.render(
  <React.StrictMode>

    <Router>
      <NavigationBar />
      <div className="app-wrapper" >       
       <Switch>
          <Route exact path="/">
            <div style = {{zIndex:"1"}}>
            <Background page="create" />
            <CreatePage />
            </div>
          </Route>
          <Route path="/about">
            <p>ABOUT PAGE</p>
          </Route>
          <Route path="/howto">
            <p>HOW TO</p>
          </Route>
          <Route path="/faq">
            <p>FAQ</p>
          </Route>
          <Route>
            <ViewPage />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
