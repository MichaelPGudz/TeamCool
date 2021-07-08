import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './components/Navs/Layout';
import Wall from './components/Wall';
import Home from './pages/Home/Home.js';
import UserPage from './pages/UserPage/UserPage';
import TeamPage from "./pages/TeamPage/TeamPage";

var token = window.localStorage.getItem('token');
var userId = window.localStorage.getItem('id');
var firstName = window.localStorage.getItem('firstName');
var lastName = window.localStorage.getItem('lastName');


function App() {
    return (
        <div>
            <Router>
                <Layout token={token}>
                    <Switch>
                        <Route path="/" exact>
                            <Home firstName = {firstName} lastName = {lastName}/>
                        </Route>
                        <Route path="/about" exact>
                            <Wall id="2"/>
                        </Route>
                        <Route path="/contact" exact>
                            <Wall id="3"/>
                        </Route>
                        <Route path="/user/:id" exact>
                            <UserPage />
                        </Route>
                        <Route path="/team/:teamId" exact>
                            <TeamPage/>
                        </Route>
                    </Switch>
                </Layout>
            </Router>
        </div>
    );
}

export default App;
