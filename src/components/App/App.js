import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';


function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route path="/movies">
 
      </Route>
      <Route path="/saved-movies">
        
      </Route>
      <Route path="/profile">
        
      </Route>
      <Route path="/signin">
        <h2>hey</h2>
      </Route>
      <Route path="/signup">
       
      </Route>
    </Switch>
  );
}

export default App;
