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
import HowTo from './staticPages/howto'
import About from './staticPages/about'
import Faq from './staticPages/faq'


ReactDOM.render(
  <React.StrictMode>

    <Router>
      <NavigationBar />
      <div className="app-wrapper" >
        <Switch>
          <Route exact path="/">
            <div style={{ zIndex: "1" }}>
              <Background page="create" />
              <CreatePage />
            </div>
          </Route>
          <Route path="/about">
          <div style={{ zIndex: "1" }}>
              <Background page="static" />
              <About />
            </div>
          </Route>
          <Route path="/howto">
          <div style={{ zIndex: "1" }}>
              <Background page="static" />
              <HowTo />
            </div>
          </Route>
          <Route path="/faq">
          <div style={{ zIndex: "1" }}>
              <Background page="static" />
              <Faq />
            </div>
          </Route>
          <Route>
            <div style={{ zIndex: "1" }}>
              <Background page="view" />
              <ViewPage />
            </div>
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
