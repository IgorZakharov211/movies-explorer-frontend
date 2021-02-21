import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

function App() {
  return (
    <div className="page">
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies />
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
      <Footer />
    </div>
  );
}

export default App;
