import Icon from '@material-ui/core/Icon';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import FetchExample from './components/FetchExample';
import Navbar from './components/Navs/Navbar/Navbar';

function App() {
  return (<div>
    <Navbar color="primary"/>
    <Icon>home</Icon>
    <AccessAlarm/>
    <ThreeDRotation/>
    <h1>TeamCool</h1>
    <FetchExample/>
  </div>)
}

export default App;
