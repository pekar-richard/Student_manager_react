import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getStudents } from "../actions/StudentActions";
import StudentItem from "./Project/StudentItem";
import CreateStudentButton from "./Project/CreateStudentButton";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getStudents();
  }
  render() {
    const { students } = this.props.student;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Students</h1>
              <br />
              <CreateStudentButton />
              <br />
              <hr />
              {students.map((student) => (
                <StudentItem key={student.student_index} student={student} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  student: PropTypes.object.isRequired,
  getStudents: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.student,
});

export default connect(mapStateToProps, { getStudents })(Dashboard);
