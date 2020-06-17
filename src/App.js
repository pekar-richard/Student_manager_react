import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/Project/AddStudent";
import UpdateStudent from "./components/Project/UpdateStudent";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route
            path="/addStudent"
            render={(props) => <AddStudent {...props} isAuthed={true} />}
          />
          <Route exact path="/updateStudent/:id" component={UpdateStudent} />
        </div>
      </Router>
    );
  }
}
export default App;
