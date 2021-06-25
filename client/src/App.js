import Icon from '@material-ui/core/Icon';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import FetchExample from './components/FetchExample';
import Wall from './components/Wall'
import BottomAppBar from './components/BottomAppBar'


function App() {
  return (<div>
    <Icon>home</Icon>
    <AccessAlarm/>
    <ThreeDRotation/>
    <h1>TeamCool</h1>
    {/* <FetchExample/> */}
    <Wall id = "3"/>
    {/* <BottomAppBar/> */}

  </div>)
}

export default App;
