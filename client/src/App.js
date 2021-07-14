import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Navs/Layout';
import Wall from './components/Wall/Wall';
import Home from './pages/Home/Home.js';
import UserPage from './pages/UserPage/UserPage';
import TeamPage from './pages/TeamPage/TeamPage';
import MyTeams from './pages/MyTeams/MyTeams';
import Store from './components/Store/Store';
import { CloudinaryContext } from 'cloudinary-react';

let token = window.localStorage.getItem('token');
let userId = window.localStorage.getItem('id');

function App() {
  return (
    <div>
      <Router>
        <Store>
          <CloudinaryContext
            cloudName="teamcool"
            secure="true"
            upload_preset="teamlogo"
          >
            <Layout token={token} id={userId}>
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
                <Route path="/user/:id" exact>
                  <UserPage />
                </Route>
                <Route path="/user/:id/myteams" exact>
                  <MyTeams id="1" />
                </Route>
                <Route path="/team/:teamId" exact>
                  <TeamPage />
                </Route>
              </Switch>
            </Layout>
          </CloudinaryContext>
        </Store>
      </Router>
    </div>
  );
}

export default App;
