import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createLektion } from "../../actions/LektionActions";
import { getLektion } from "../../actions/LektionActions";
import { getStudent } from "../../actions/StudentActions";
import { getZahlungsByStudentID } from "../../actions/ZahlungActions";
import "bootstrap/dist/css/bootstrap.min.css";
import { formatDateTimeLocal, formatDateLocal } from "../../tools";

class UpdateLektion extends Component {
  constructor() {
    super();

    this.state = {
      nichtgenugkredit: false,
      nichtgenugkreditmessage: "Der Student hast nicht genug kredit!",
      //Zahlung daten
      zahlungsByStudentID: [],
      //Student daten
      studentKredit: "",
      studentPreis45: "",
      studentPreis60: "",
      studentPreis90: "",
      studentPreis120: "",
      studentSortierung: "",
      //Lektion daten
      lektionIndex: "",
      lektionDatum: "",
      lektionMin: "",
      lektionPreis: "",
      lektionArt: "",
      lektionStatus: "",
      lektionAbrechnung: "",
      lektionRgnr: "",
      lektionBezahlt: "",
      createdAt: "",
      updatedAt: "",
      studentIndex: "",
      agenturIndex: "",
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
      //Student daten
      studentKredit,
      studentPreis45,
      studentPreis60,
      studentPreis90,
      studentPreis120,
      studentSortierung,
    } = nextProps.student.student;

    const {
      //Zahlung daten
      zahlungsByStudentID,
    } = nextProps.zahlung;

    const {
      //Lektion daten
      lektionIndex,
      lektionDatum = "",
      lektionMin,
      lektionPreis,
      lektionArt,
      lektionStatus,
      lektionAbrechnung,
      lektionRgnr,
      lektionBezahlt,
      createdAt,
      updatedAt,
      studentIndex,
      agenturIndex,
    } = nextProps.lektion.lektion;

    this.setState({
      //Zahlung daten
      zahlungsByStudentID,
      //Student daten
      studentKredit,
      studentPreis45,
      studentPreis60,
      studentPreis90,
      studentPreis120,
      studentSortierung,
      //Lektion daten
      lektionDatum: formatDateTimeLocal(lektionDatum),
      lektionIndex,
      lektionMin,
      lektionPreis,
      lektionArt,
      lektionStatus,
      lektionAbrechnung,
      lektionRgnr: parseInt(lektionRgnr),
      lektionBezahlt,
      createdAt,
      updatedAt,
      studentIndex,
      agenturIndex,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newLektion = {
      lektionDatum: new Date(this.state.lektionDatum).toISOString(),
      lektionIndex: this.state.lektionIndex,
      lektionMin: this.state.lektionMin,
      lektionPreis: this.state.lektionPreis,
      lektionArt: this.state.lektionArt,
      lektionStatus: this.state.lektionStatus,
      lektionAbrechnung: this.state.lektionAbrechnung,
      lektionRgnr: parseInt(this.state.lektionRgnr),
      lektionBezahlt: this.state.lektionBezahlt,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
      studentIndex: this.state.studentIndex,
      agenturIndex: this.state.agenturIndex,
    };

    this.props.createLektion(
      newLektion,
      this.state.studentIndex,
      this.props.history
    );
  }

  componentDidMount() {
    const { lektionIndex, studentIndex } = this.props.match.params;

    this.props.getStudent(studentIndex, this.props.history);
    this.props.getLektion(lektionIndex, this.props.history);
    this.props.getZahlungsByStudentID(studentIndex, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "lektionMin") {
      this.lektionPrice(e.target.value);
    }

    if (e.target.name === "lektionAbrechnung") {
      this.lektionBezaltDatum(e.target.value);
    }
  }

  checkKredit() {
    debugger;
    console.log(this.state.lektionAbrechnung);

    if (
      this.state.lektionAbrechnung === 2 ||
      this.state.lektionAbrechnung === "2"
    ) {
      if (this.state.studentKredit >= this.state.lektionPreis) {
        if (this.state.nichtgenugkredit === true) {
          this.setState({
            nichtgenugkredit: false,
          });
          let zalungenLength = this.state.zahlungsByStudentID.length - 1;
          this.setState({
            lektionBezahlt: this.state.zahlungsByStudentID[zalungenLength]
              .zahlungDatum,
          });
        }
      } else {
        if (this.state.nichtgenugkredit === false) {
          this.setState({
            nichtgenugkredit: true,
          });
          this.setState({ lektionBezahlt: "" });
        }
      }
    } else {
      if (this.state.nichtgenugkredit === true) {
        this.setState({
          nichtgenugkredit: false,
        });
      }
    }
  }

  componentDidUpdate() {
    this.checkKredit();
  }

  lektionPrice = (lektionMin) => {
    if (lektionMin === "0") {
      this.setState({ lektionPreis: 0 });
    }

    if (lektionMin === "45") {
      this.setState({ lektionPreis: this.state.studentPreis45 });
    }

    if (lektionMin === "60") {
      this.setState({ lektionPreis: this.state.studentPreis60 });
    }

    if (lektionMin === "90") {
      this.setState({ lektionPreis: this.state.studentPreis90 });
    }

    if (lektionMin === "120") {
      this.setState({ lektionPreis: this.state.studentPreis120 });
    }
  };

  lektionBezaltDatum = (lektionAbrechnung) => {
    if (lektionAbrechnung === 0 || lektionAbrechnung === "0") {
      this.setState({ lektionBezahlt: "" });
    }

    if (lektionAbrechnung === 1 || lektionAbrechnung === "1") {
      this.setState({ lektionBezahlt: formatDateLocal(new Date()) });
    }

    if (lektionAbrechnung === 2 || lektionAbrechnung === "2") {
      if (this.state.studentKredit >= this.state.lektionPreis) {
        let zalungenLength = this.state.zahlungsByStudentID.length - 1;

        this.setState({
          lektionBezahlt: this.state.zahlungsByStudentID[zalungenLength]
            .zahlungDatum,
        });
      }
    }

    if (lektionAbrechnung === 3 || lektionAbrechnung === "3") {
      this.setState({ lektionBezahlt: "" });
    }
  };

  render() {
    const { errors } = this.state;
    const { student } = this.props.student;
    const { lektion } = this.props.lektion;

    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h3 className="display-4 text-center">
                  Create Lektion for Student {this.state.studentSortierung}
                </h3>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <h6>Lektion Datum</h6>
                  <div className="form-group">
                    <input
                      type="datetime-local"
                      className="form-control form-control-lg"
                      name="lektionDatum"
                      value={this.state.lektionDatum || ""}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="lektionMin"
                      value={this.state.lektionMin}
                      onChange={this.onChange}
                    >
                      <option value={0}>Select Lektion Dauer</option>
                      <option value={45}>45 min.</option>
                      <option value={60}>60 min.</option>
                      <option value={90}>90 min.</option>
                      <option value={120}>120 min.</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.lektionPreis,
                      })}
                      placeholder="Lektion Preis"
                      name="lektionPreis"
                      value={this.state.lektionPreis || ""}
                      onChange={this.onChange}
                    />
                    {errors.lektionPreis && (
                      <div className="invalid-feedback">
                        {errors.lektionPreis}
                      </div>
                    )}
                    {this.state.nichtgenugkredit && (
                      <div className="">
                        {this.state.nichtgenugkreditmessage}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="lektionArt"
                      value={this.state.lektionArt}
                      onChange={this.onChange}
                    >
                      <option value={0}>Select Lektion Art</option>
                      <option value={1}>Skype</option>
                      <option value={2}>Real</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="lektionStatus"
                      value={this.state.lektionStatus}
                      onChange={this.onChange}
                    >
                      <option value={0}>Select Lektion Status</option>
                      <option value={1}>gehalten</option>
                      <option value={2}>verpasst</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="lektionAbrechnung"
                      value={this.state.lektionAbrechnung}
                      onChange={this.onChange}
                    >
                      <option value={0}>Select Abrechnung</option>
                      <option value={1}>Bar</option>
                      <option value={2}>Kredit</option>
                      <option value={3}>Rehnung</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.lektionRgnr,
                      })}
                      placeholder="Lektion Rgnr"
                      name="lektionRgnr"
                      value={this.state.lektionRgnr || ""}
                      onChange={this.onChange}
                    />
                    {errors.lektionRgnr && (
                      <div className="invalid-feedback">
                        {errors.lektionRgnr}
                      </div>
                    )}
                  </div>

                  <h6>Lektion bezahlt</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="lektionBezahlt"
                      value={this.state.lektionBezahlt || ""}
                      onChange={this.onChange}
                    />
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

UpdateLektion.propTypes = {
  createLektion: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getLektion: PropTypes.func.isRequired,
  getStudent: PropTypes.func.isRequired,
  getZahlungsByStudentID: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  lektion: state.lektion,
  student: state.student,
  zahlung: state.zahlung,
});

export default connect(mapStateToProps, {
  createLektion,
  getLektion,
  getStudent,
  getZahlungsByStudentID,
})(UpdateLektion);
