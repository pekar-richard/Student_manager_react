import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard";
import LektionDashboard from "./components/LektionDashboard";
import AgenturDashboard from "./components/AgenturDashboard";
import ZahlungDashboard from "./components/ZahlungDashboard";
import RechnungDashboard from "./components/RechnungDashboard";
import AddStudent from "./components/Project/AddStudent";
import AddLektion from "./components/Project/AddLektion";
import AddAgentur from "./components/Project/AddAgentur";
import AddZahlung from "./components/Project/AddZahlung";
import Login from "./components/Project/Login";
import AddRechnung from "./components/Project/AddRechnung";
import UpdateStudent from "./components/Project/UpdateStudent";
import UpdateLektion from "./components/Project/UpdateLektion";
import UpdateAgentur from "./components/Project/UpdateAgentur";
import UpdateZahlung from "./components/Project/UpdateZahlung";
import UpdateRechnung from "./components/Project/UpdateRechnung";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAusloggen } from "./actions/LoginActions";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props.login.logout);
    return (
      <Router>
        <div className="App">
          {this.props.login.logout === "" && <Header />}

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
            path="/updateZahlung/:zahlungIndex/:studentIndex"
            render={(props) => <UpdateZahlung {...props} isAuthed={true} />}
          />

          <Route
            exact
            path="/LektionDashboard/:studentIndex"
            render={(props) => <LektionDashboard {...props} isAuthed={true} />}
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
            path="/addRechnung/"
            render={(props) => <AddRechnung {...props} isAuthed={true} />}
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
            path="/updateRechnung/:rechnungIndex"
            render={(props) => <UpdateRechnung {...props} isAuthed={true} />}
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

          <Route
            exact
            path="/RechnungDashboard/"
            render={(props) => <RechnungDashboard {...props} isAuthed={true} />}
          />
          <Route
            exact
            path="/Login"
            render={(props) => <Login {...props} isAuthed={true} />}
          />
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  getAusloggen: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  login: state.login,
});

export default connect(mapStateToProps, {
  getAusloggen,
})(App);
