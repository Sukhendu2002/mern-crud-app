import "./App.css";
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./components/pages/NotFound";
import AddUser from "./components/pages/AddUser";
import EditUser from "./components/pages/EditUser";
import ViewUser from "./components/pages/ViewUser";

function App() {
  return (
    <div className="App text-center">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/adduser" component={AddUser} />
          <Route exact path="/update/:id" component={EditUser} />
          <Route exact path="/viewuser/:id" component={ViewUser} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
