import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Navs/Layout';
import Wall from './components/Wall';
import Home from './pages/Home/Home.js';


function App() {
  return (
    <div>
      <Router>
        <Layout>
        <h1>TeamCool</h1>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about" exact>
            <Wall id="2" />
          </Route>
          <Route path="/contact" exact>
            <Wall id="3" />
          </Route>
        </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
