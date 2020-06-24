import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteZahlung } from "../../actions/ZahlungActions";
import { formatDateTime } from "../../tools";
import "../../App.css";

class ZahlungItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteZahlung(id);
  };

  render() {
    const { zahlung } = this.props;
    const { increment } = this.props;
    const { studentKreditSum } = this.props;
    const { student_index } = this.props;
    return (
      <div className="container">
        <div
          className={`card card-body mb-3 ${
            zahlung.zahlungBetrag <= 0 ? "student-nichtaktiv" : "student-aktiv"
          }`}
        >
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{increment}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h4>{formatDateTime(zahlung.zahlungDatum)}</h4>
              <p>{zahlung.zahlungKomm}</p>
              <p>Betrag: {zahlung.zahlungBetrag} euro</p>
              <p>Student Kredit: {studentKreditSum} euro</p>
            </div>

            {zahlung.zahlungKomm != "lektion-abrechnung" && (
              <div className="col-md-4 d-none d-lg-block">
                <ul className="list-group">
                  <Link
                    className="linkButton"
                    to={`/updateZahlung/${zahlung.zahlungIndex}/${student_index}`}
                  >
                    <li className="list-group-item update">
                      <i className="fa fa-edit pr-1"> Update Zahlung</i>
                    </li>
                  </Link>
                  <li
                    className="list-group-item delete"
                    onClick={this.onDeleteClick.bind(
                      this,
                      zahlung.zahlungIndex
                    )}
                  >
                    <i className="fa fa-minus-circle pr-1"> Delete Zahlung</i>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

ZahlungItem.propTypes = {
  deleteZahlung: PropTypes.func.isRequired,
};

export default connect(null, { deleteZahlung })(ZahlungItem);
