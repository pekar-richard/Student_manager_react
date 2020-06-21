import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteStudent } from "../../actions/StudentActions";

class StudentItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteStudent(id);
  };
  render() {
    const { student } = this.props;
    const { increment } = this.props;

    return (
      <div className="container">
        <div
          className={`card card-body mb-3 ${
            student.studentAktiv === 1 || student.studentAktiv === 0
              ? "bg-light"
              : "bg-info"
          }`}
        >
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{increment}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{student.studentNachname}</h3>
              <p>{student.studentVorname}</p>
              <p>{student.studentKredit} euro</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link to={`/StudentLektionDashboard/${student.studentIndex}`}>
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Student Board </i>
                  </li>
                </Link>
                <Link to={`/updateStudent/${student.studentIndex}`}>
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Student</i>
                  </li>
                </Link>
                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(this, student.studentIndex)}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Student</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StudentItem.propTypes = {
  deleteStudent: PropTypes.func.isRequired,
};

export default connect(null, { deleteStudent })(StudentItem);
