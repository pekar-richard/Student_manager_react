import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { updateZahlung } from "../../actions/ZahlungActions";
import { getZahlung } from "../../actions/ZahlungActions";
import { getStudent } from "../../actions/StudentActions";
import "bootstrap/dist/css/bootstrap.min.css";
import { formatDateLocal } from "../../tools";

class UpdateZahlung extends Component {
  constructor() {
    super();

    this.state = {
      //Zahlung daten
      rechnungnichtfillout: false,
      rechnungnichtfilloutmessage: "Bitte tragen Sie die Rechnungsnummer ein!",
      zahlungIndex: "",
      zahlungDatum: formatDateLocal(new Date()),
      zahlungBetrag: "",
      zahlungKonto: "",
      zahlungSteuer: "",
      zahlungRgnr: "",
      zahlungKomm: "",
      zahlungAbrechnung: "",
      createdAt: "",
      updatedAt: "",
      studentIndex: "",
      agenturIndex: "",
      lektionIndex: null,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      //Zahlung daten
      agenturIndex,
      zahlungIndex,
      zahlungDatum,
      zahlungBetrag,
      zahlungKonto,
      zahlungSteuer,
      zahlungRgnr,
      zahlungKomm,
      zahlungAbrechnung,
      createdAt,
      updatedAt,
      studentIndex,
      lektionIndex,
    } = nextProps.zahlung.zahlung;

    this.setState({
      agenturIndex,
      zahlungIndex,
      zahlungDatum,
      zahlungBetrag,
      zahlungKonto,
      zahlungSteuer,
      zahlungRgnr,
      zahlungKomm,
      zahlungAbrechnung,
      createdAt,
      updatedAt,
      studentIndex,
      lektionIndex,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newZahlung = {
      zahlungIndex: this.state.zahlungIndex,
      zahlungDatum: new Date(this.state.zahlungDatum).toISOString(),
      zahlungBetrag: this.state.zahlungBetrag,
      zahlungKonto: this.state.zahlungKonto,
      zahlungSteuer: this.state.zahlungSteuer,
      zahlungRgnr: this.state.zahlungRgnr,
      zahlungKomm: this.state.zahlungKomm,
      zahlungAbrechnung: this.state.zahlungAbrechnung,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
      studentIndex: this.state.studentIndex,
      lektionIndex: this.state.lektionIndex,
      agenturIndex: this.state.agenturIndex,
    };

    if (this.zahlungRechnungCheck(this.state.zahlungRgnr) != false) {
      this.props.updateZahlung(
        newZahlung,
        this.state.zahlungIndex,
        this.state.studentIndex,
        this.props.history
      );
    }
  }

  componentDidMount() {
    const { studentIndex } = this.props.match.params;
    const { zahlungIndex } = this.props.match.params;
    this.props.getStudent(studentIndex, this.props.history);
    this.props.getZahlung(zahlungIndex, this.props.history);

    this.setState({
      studentIndex,
      zahlungIndex,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  zahlungRechnungCheck = (rechnungNummer) => {
    if (
      this.state.zahlungAbrechnung === 3 ||
      this.state.zahlungAbrechnung === "3"
    ) {
      if (
        rechnungNummer === "" ||
        rechnungNummer === " " ||
        rechnungNummer === 0 ||
        rechnungNummer === "0"
      ) {
        if (this.state.rechnungnichtfillout === false) {
          this.setState({
            rechnungnichtfillout: true,
          });
        }
        return false;
      } else {
        return true;
      }
    }
    return true;
  };

  render() {
    const { errors } = this.state;
    const { student } = this.props.student;
    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h3 className="display-4 text-center">
                  Create Zahlung für den Student {student.studentSortierung}
                </h3>
                <br />
                <hr />
                <form onSubmit={this.onSubmit}>
                  <h6>Zahlung Datum</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="zahlungDatum"
                      value={this.state.zahlungDatum}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.zahlungBetrag,
                      })}
                      placeholder="Betrag"
                      name="zahlungBetrag"
                      value={this.state.zahlungBetrag}
                      onChange={this.onChange}
                    />
                    {errors.zahlungBetrag && (
                      <div className="invalid-feedback">
                        {errors.zahlungBetrag}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.zahlungKonto,
                      })}
                      placeholder="Konto"
                      name="zahlungKonto"
                      value={this.state.zahlungKonto}
                      onChange={this.onChange}
                    />
                    {errors.zahlungKonto && (
                      <div className="invalid-feedback">
                        {errors.zahlungKonto}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="zahlungSteuer"
                      value={this.state.zahlungSteuer}
                      onChange={this.onChange}
                    >
                      <option value={0}>Zahlung Steuer</option>
                      <option value={1}>nein</option>
                      <option value={2}>ja</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.zahlungRgnr,
                      })}
                      placeholder="RGNR"
                      name="zahlungRgnr"
                      value={this.state.zahlungRgnr}
                      onChange={this.onChange}
                    />
                    {errors.zahlungRgnr && (
                      <div className="invalid-feedback">
                        {errors.zahlungRgnr}
                      </div>
                    )}

                    {this.state.rechnungnichtfillout && (
                      <div className="">
                        {this.state.rechnungnichtfilloutmessage}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.zahlungKomm,
                      })}
                      placeholder="Kommentar"
                      name="zahlungKomm"
                      value={this.state.zahlungKomm}
                      onChange={this.onChange}
                    />
                    {errors.zahlungKomm && (
                      <div className="invalid-feedback">
                        {errors.zahlungKomm}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="zahlungAbrechnung"
                      value={this.state.zahlungAbrechnung}
                      onChange={this.onChange}
                    >
                      <option value={0}>Select Abrechnung</option>
                      <option value={1}>Bar</option>
                      <option value={2}>Kredit</option>
                      <option value={3}>Rechnung</option>
                    </select>
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateZahlung.propTypes = {
  updateZahlung: PropTypes.func.isRequired,
  getStudent: PropTypes.func.isRequired,
  getZahlung: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  zahlung: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  student: state.student,
  zahlung: state.zahlung,
});

export default connect(mapStateToProps, {
  updateZahlung,
  getStudent,
  getZahlung,
})(UpdateZahlung);
