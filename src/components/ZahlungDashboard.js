import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getZahlungsByStudentID } from "../actions/ZahlungActions";
import CreateZahlungButton from "./Project/CreateZahlungButton";
import ZahlungBackButton from "./Project/ZahlungBackButton";
import ZahlungItem from "./Project/ZahlungItem";
import { getStudent } from "../actions/StudentActions";

class ZahlungDashboard extends Component {
  componentDidMount() {
    const { studentIndex } = this.props.match.params;
    this.props.getStudent(studentIndex, this.props.history);
    this.props.getZahlungsByStudentID(studentIndex, this.props.history);
  }

  render() {
    const { zahlungsByStudentID } = this.props.zahlung;
    const { student } = this.props.student;
    let kredit = 0;
    let i = 1;
    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h1 className="display-4 text-center">
                Alle Zahlungen {student.studentSortierung}
              </h1>
              <br />
              <br />
              <div className="CreateZahlungButton">
                <CreateZahlungButton
                  student_index={this.props.match.params.studentIndex}
                />
              </div>
              <div className="ZahlungBackButton">
                <ZahlungBackButton
                  student_index={this.props.match.params.studentIndex}
                />
              </div>

              <hr />
              {zahlungsByStudentID.map(
                (zahlung) => (
                  (kredit = kredit + zahlung.zahlungBetrag),
                  (
                    <ZahlungItem
                      student_index={this.props.match.params.studentIndex}
                      studentKreditSum={kredit}
                      key={zahlung.zahlungIndex}
                      zahlung={zahlung}
                      increment={i++}
                    />
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ZahlungDashboard.propTypes = {
  getZahlungsByStudentID: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  zahlung: state.zahlung,
  student: state.student,
});

export default connect(mapStateToProps, { getZahlungsByStudentID, getStudent })(
  ZahlungDashboard
);
