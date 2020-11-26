import logo from './logo.svg';
import './App.css';
import React from 'react';
import CreateForm from './createPage/CreateForm'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CreateForm></CreateForm>
      </header>
    </div>
  );
}

export default App;
