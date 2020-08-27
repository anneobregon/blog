import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import "../node_modules/jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
// import 'bootstrap/dist/js/bootstrap.js';
import './stylesheets/style.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './component/Nav';
import Home from './component/Home';
import About from './component/About';
import Contact from './component/Contact';
import Compose from './component/Compose';
import Post from './component/Post';
import Footer from './component/Footer';
import Update from './component/Update';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/compose" component={Compose} />
          <Route path="/post/:id" component={Post} />
          <Route path="/update/:id" component={Update} />
        </Switch>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
