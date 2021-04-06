import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from './contexts/theme'
import Nav from "./components/Nav";
import {Switch, Route,
  BrowserRouter as Router} from "react-router-dom";
import Posts from './components/Posts'; 
import User from './components/User'; 

function App () {
  const [theme, setTheme] = React.useState('light')
  const toggleTheme = () => setTheme((theme) =>  theme === 'light' ? 'dark' : 'light')

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className="container">
            <Nav toggleTheme={toggleTheme}/>
            <Switch>
              <Route exact path="/" render={() => <Posts type='top' />} />
              <Route exact path="/new" render={() => <Posts type='new' />} />
              <Route path="/user" component={User} />
            </Switch>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
  }

ReactDOM.render(<App />, document.getElementById("app"));
