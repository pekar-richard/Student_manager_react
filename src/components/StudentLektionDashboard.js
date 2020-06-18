import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLektions } from "../actions/LektionActions";
import LektionItem from "./Project/LektionItem";
import CreateLektionButton from "./Project/CreateLektionButton";

class StudentLektionDashboard extends Component {
  constructor() {
    super();

    this.state = {
      student_index: "",
    };
  }

  componentDidMount() {
    this.props.getLektions();

    const { student_index } = this.props.match.params;

    this.setState({
      student_index: student_index,
    });
  }

  render() {
    const { lektions } = this.props.lektion;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Lektions</h1>
              <br />
              <CreateLektionButton student_index={this.state.student_index} />
              <br />
              <hr />
              {lektions.map((lektion) => (
                <LektionItem key={lektion.lektion_index} lektion={lektion} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StudentLektionDashboard.propTypes = {
  lektion: PropTypes.object.isRequired,
  getLektions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lektion: state.lektion,
});

export default connect(mapStateToProps, { getLektions })(
  StudentLektionDashboard
);
