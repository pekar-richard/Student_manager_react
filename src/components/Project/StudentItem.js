import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteStudent } from "../../actions/StudentActions";
import { Example } from "./Example";
import "../../App.css";
import { getAgenturs } from "../../actions/AgenturActions";

class StudentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agenturs: [],
      agenturKurzname: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { agenturs } = props.agentur;

    return {
      agenturs,
    };
  }

  componentDidMount() {
    this.props.getAgenturs();
  }

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
              ? "student-aktiv"
              : "student-nichtaktiv"
          }`}
        >
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{increment}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{student.studentNachname}</h3>
              <p>{student.studentVorname}</p>
              <p>Kredit: {student.studentKredit} euro</p>
              <p>
                Agentur:{" "}
                {this.state.agenturs.map(
                  (agentur) =>
                    student.agenturIndex === agentur.agenturIndex &&
                    agentur.agenturKurzname
                )}
              </p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link
                  className="linkButton"
                  to={`/LektionDashboard/${student.studentIndex}`}
                >
                  <li className="list-group-item board">
                    <i className="fa fa-flag-checkered pr-1"> Lektion Board </i>
                  </li>
                </Link>
                <Link
                  className="linkButton"
                  to={`/updateStudent/${student.studentIndex}`}
                >
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update</i>
                  </li>
                </Link>
                <Example
                  deleteitem={this.onDeleteClick.bind(
                    this,
                    student.studentIndex
                  )}
                  modalheading={`Delete Student: ${student.studentSortierung}`}
                  message={
                    "Bist du sicher? Dadurch werden der Student und alle damit verbundenen Daten gelöscht!"
                  }
                />
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
  getAgenturs: PropTypes.func.isRequired,
  agentur: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  agentur: state.agentur,
});

export default connect(mapStateToProps, { deleteStudent, getAgenturs })(
  StudentItem
);
