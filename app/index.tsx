import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ThemeProvider } from "./contexts/theme";
import Nav from "./components/Nav";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Posts from "./components/Posts";
import UserComponent from "./components/User";
import PostComponent from "./components/Post";

function App() {
  const [theme, setTheme] = React.useState("light");
  const toggleTheme = () =>
    setTheme((theme) => (theme === "light" ? "dark" : "light"));

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className="container">
            <Nav toggleTheme={toggleTheme} />
            <Switch>
              <Route exact path="/" render={() => <Posts type="top" />} />
              <Route exact path="/new" render={() => <Posts type="new" />} />
              <Route path="/user" component={UserComponent} />
              <Route path="/post" component={PostComponent} />
              <Route path="*" render={() => <h1>404</h1>}/>
            </Switch>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
