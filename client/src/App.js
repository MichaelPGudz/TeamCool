import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './components/Navs/Layout';
import Home from './pages/Home/Home.js';
import UserPage from './pages/UserPage/UserPage';
import TeamPage from "./pages/TeamPage/TeamPage";
import Store from "./components/Store/Store";
import {CloudinaryContext} from "cloudinary-react";
import LoginPage from "./pages/LoginPage/LoginPage";
import TeamTree from "./pages/TeamTree/TeamTree";

function App() {
    return (
        <div>
            <Router>
                <Store>
                    <CloudinaryContext cloudName="teamcool" secure="true" upload_preset="teamlogo">
                            <Switch>
                                <Route path="/login" exact>
                                    <LoginPage/>
                                </Route>
                                <Layout>
                                    <Route path="/" exact>
                                        <Home/>
                                    </Route>
                                    <Route path="/about" exact>
                                        <Home/>
                                    </Route>
                                    <Route path="/contact" exact>
                                        <Home/>
                                    </Route>
                                    <Route path="/user/:id" exact>
                                        <UserPage/>
                                    </Route>
                                    <Route path="/team/:teamId" exact>
                                        <TeamPage/>
                                    </Route>
                                    <Route path="/team/:teamId/tree" exact>
                                        <TeamTree/>
                                    </Route>
                                </Layout>
                            </Switch>
                    </CloudinaryContext>
                </Store>
            </Router>
        </div>
);
}

export default App;
