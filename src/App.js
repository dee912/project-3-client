import Home from './components/common/Home'
import Nav from './components/common/Nav'
import PL8Index from './components/pl8s/PL8Index'
import PL8Show from './components/pl8s/PL8Show'
import Profile from './components/m8s/Profile'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Cr8APl8 from './components/pl8s/Cr8APl8'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Game from './components/game/Game'

export default function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/pl8s/cr8" component={Cr8APl8}/>
        <Route path="/pl8s/:pl8Id" component={PL8Show}/>
        <Route path="/pl8s" component={PL8Index}/>
        <Route path="/login" component={Login}/>
        <Route path="/become-a-m8" component={Register}/>
        <Route path="/m8/:m8id" component={Profile}/>
        <Route path="/game" component={Game}/>
      </Switch>
    </Router>
  )
}