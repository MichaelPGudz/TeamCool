import Icon from '@material-ui/core/Icon';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';

import FetchExample from './components/FetchExample';
import Layout from './components/Navs/Layout';
import Navbar from './components/Navs/Navbar/Navbar';
import Wall from './components/Wall';
import Home from './pages/Home/Home.js';
import BottomAppBar from './components/BottomAppBar';
import Footer from './components/Navs/Footer/Footer.js';

function App() {
  return (
    <div>
      {/* <FetchExample/> */}
      {/* <Wall id = "3"/> */}
      {/* <BottomAppBar/> */}

      <Router>

        {/* Option 1 */}
        {/* <Navbar /> */}

        {/* Option 2 */}
        <Layout>
          
        <Icon>home</Icon>
        <AccessAlarm />
        <ThreeDRotation />
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
        <Footer />
        </Layout>
      </Router>
    </div>
  );
}

export default App;
