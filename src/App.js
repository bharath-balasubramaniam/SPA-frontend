import React, { useEffect } from "react";
import "./App.css";
import { UserState } from "./context/UserProvider";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import UpdatePage from "./pages/User-update";
function App() {
  const history = useHistory();
  const { user, setUser } = UserState();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {!user ? history.push("/login") : <HomePage />}
        </Route>
        <Route exact path="/login">
          {user ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route exact path="/register">
          {user ? <Redirect to="/" /> : <RegisterPage />}
        </Route>
        <Route exact path="/update/:id">
          {!user ? <Redirect to="/" /> : <UpdatePage />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
