import './App.css';
import Home from "./screen/Home"
import SideBar from './componant/SideBar';
import Header from './componant/Header';
import { useState } from 'react';
import Backdrop from "./componant/Backdrop";
import VideoScreen from "./screen/VideoScreen"
import Login from "./login/Login";
import Register from './login/Register';
import { StateHandler } from "./context/StateProvider";
import WatchLater from "./screen/WatchLater";
import HistoryScreen from './screen/HistoryScreen';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  const [toggle, setToggle] = useState(false)

  const { user } = StateHandler()

  return (
    <Router>
      <Switch>
        <div className="app">
          <SideBar click={() => setToggle(false)} show={toggle} />
          <Backdrop click={() => setToggle(false)} show={toggle} />
          <Route exact path="/">
            <Home click={() => setToggle(true)} />
          </Route>
          <Route exact path="/login">
            {!user ? <Login /> : <Home/>}
          </Route>
          <Route exact path="/register">
            {!user ? <Register /> : <Login /> }
          </Route>
          <Route exact path="/video/:videoId">
            {user ? <VideoScreen click={() => setToggle(true)}  /> : <Login />}
          </Route>
          <Route exact path="/watchLater">
            {user ? <WatchLater click={() => setToggle(true)} /> : <Login />}
          </Route>
          <Route exact path="/history">
            {user ? <HistoryScreen click={() => setToggle(true)} /> :  <Login />}
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
