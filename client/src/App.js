import Icon from '@material-ui/core/Icon';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import FetchExample from './components/FetchExample';
import Wall from './components/Wall'
import Home from './components/Home/Home.js'
import BottomAppBar from './components/BottomAppBar'
import Footer from './components/Navs/Footer/Footer.js'


function App() {
  return (<div>
    <Icon>home</Icon>
    <AccessAlarm/>
    <ThreeDRotation/>
    <h1>TeamCool</h1>
    {/* <FetchExample/> */}
    {/* <Wall id = "3"/> */}
    {/* <BottomAppBar/> */}

    <Router>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/about" exact component={() => <Wall id="2"/>} />
          <Route path="/contact" exact component={() => <Wall id="3"/> } />
        </Switch>
      </Router>

      <Footer />

  </div>)
}

export default App;
