import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Wall from './components/Wall'
import Home from './components/Home/Home.js'
import Sidebar from "./components/Navs/Sidebar/Sidebar";

function App() {
    return (<div>

            <Sidebar/>
            <Router>
                <Switch>
                    <Route path="/" exact component={() => <Home/>}/>
                    <Route path="/about" exact component={() => <Wall id="2"/>}/>
                    <Route path="/contact" exact component={() => <Wall id="3"/>}/>
                </Switch>
            </Router>

    </div>)
}

export default App;
