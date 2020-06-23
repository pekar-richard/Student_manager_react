import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard";
import StudentLektionDashboard from "./components/StudentLektionDashboard";
import AgenturDashboard from "./components/AgenturDashboard";
import ZahlungDashboard from "./components/ZahlungDashboard";
import AddStudent from "./components/Project/AddStudent";
import AddLektion from "./components/Project/AddLektion";
import AddAgentur from "./components/Project/AddAgentur";
import AddZahlung from "./components/Project/AddZahlung";
import UpdateStudent from "./components/Project/UpdateStudent";
import UpdateLektion from "./components/Project/UpdateLektion";
import UpdateAgentur from "./components/Project/UpdateAgentur";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Route
            exact
            path="/dashboard"
            render={(props) => <Dashboard {...props} isAuthed={true} />}
          />

          <Route
            exact
            path="/updateStudent/:id"
            render={(props) => <UpdateStudent {...props} isAuthed={true} />}
          />

          <Route
            exact
            path="/updateAgentur/:id"
            render={(props) => <UpdateAgentur {...props} isAuthed={true} />}
          />

          <Route
            exact
            path="/StudentLektionDashboard/:studentIndex"
            render={(props) => (
              <StudentLektionDashboard {...props} isAuthed={true} />
            )}
          />

          <Route
            exact
            path="/addStudent"
            render={(props) => <AddStudent {...props} isAuthed={true} />}
          />

          <Route
            exact
            path="/addAgentur"
            render={(props) => <AddAgentur {...props} isAuthed={true} />}
          />

          <Route
            exact
            path="/addZahlung/:studentIndex"
            render={(props) => <AddZahlung {...props} isAuthed={true} />}
          />
          <Route
            exact
            path="/addLektion/:studentIndex"
            render={(props) => <AddLektion {...props} isAuthed={true} />}
          />

          <Route
            exact
            path="/updateLektion/:lektionIndex/:studentIndex"
            render={(props) => <UpdateLektion {...props} isAuthed={true} />}
          />

          <Route
            exact
            path="/AgenturDashboard"
            render={(props) => <AgenturDashboard {...props} isAuthed={true} />}
          />

          <Route
            exact
            path="/ZahlungDashboard/:studentIndex"
            render={(props) => <ZahlungDashboard {...props} isAuthed={true} />}
          />
        </div>
      </Router>
    );
  }
}
export default App;
