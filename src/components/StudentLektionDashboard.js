import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getLektions } from "../actions/LektionActions";
import LektionItem from "./Project/LektionItem";
import CreateLektionButton from "./Project/CreateLektionButton";
import ZahlungBoardButton from "./Project/ZahlungBoardButton";
import { getStudent } from "../actions/StudentActions";
import "../App.css";

class StudentLektionDashboard extends Component {
  constructor() {
    super();

    this.state = {
      studentIndex: "",
    };
  }

  componentDidMount() {
    this.props.getLektions();

    const { studentIndex } = this.props.match.params;
    this.props.getStudent(studentIndex);

    this.setState({
      studentIndex: studentIndex,
    });
  }

  render() {
    const { lektions } = this.props.lektion;
    const { student } = this.props.student;
    let i = 1;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h1 className="display-4 text-center">
                Alle Lektionen {student.studentSortierung}
              </h1>
              <br />
              <br />
              <div className="CreateLektionButton">
                <CreateLektionButton studentIndex={this.state.studentIndex} />
              </div>
              <div className="ZahlungBoardButton">
                <ZahlungBoardButton studentIndex={this.state.studentIndex} />
              </div>
              <hr />
              {lektions.map(
                (lektion) =>
                  lektion.studentIndex == this.state.studentIndex && (
                    <LektionItem
                      key={lektion.lektionIndex}
                      lektion={lektion}
                      increment={i++}
                    />
                  )
              )}
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
  getStudent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lektion: state.lektion,
  student: state.student,
});

export default connect(mapStateToProps, { getLektions, getStudent })(
  StudentLektionDashboard
);
