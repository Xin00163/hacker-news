import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from './contexts/theme'
import Nav from "./components/Nav";
import {
  BrowserRouter as Router} from "react-router-dom";
import Posts from './components/Posts'; 

class App extends React.Component {
  state = {
    theme: 'light',
    toggleTheme: () => {
      this.setState(({theme}) => ({
        theme: theme === 'light'? 'dark' : 'light'
      }))
    }
  }
  render() {
    return (
      <Router>
      <ThemeProvider value={this.state}>
        <div className={this.state.theme}>
          <div className="container">
            <Nav />
          </div>
        </div>
      </ThemeProvider>
      <Posts type='top'/>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
