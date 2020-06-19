import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createLektion } from "../../actions/LektionActions";
import { getStudent } from "../../actions/StudentActions";
import "bootstrap/dist/css/bootstrap.min.css";
import { formatDateTimeLocal, formatDateLocal } from "../../tools";

class AddLektion extends Component {
  constructor() {
    super();

    this.state = {
      //Student daten
      student_kredit: "",
      student_preis45: "",
      student_preis60: "",
      student_preis90: "",
      student_preis120: "",
      //Lektion daten
      lektion_datum: formatDateTimeLocal(new Date()),
      lektion_min: "",
      lektion_preis: 0,
      lektion_art: "",
      lektion_status: "",
      lektion_abrechnung: "",
      lektion_rgnr: "",
      lektion_bezahlt: "",
      created_At: "",
      updated_At: "",
      student_index: "",
      agentur_index: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newLektion = {
      lektion_datum: new Date(this.state.lektion_datum).toISOString(),
      lektion_min: this.state.lektion_min,
      lektion_preis: this.state.lektion_preis,
      lektion_art: this.state.lektion_art,
      lektion_status: this.state.lektion_status,
      lektion_abrechnung: this.state.lektion_abrechnung,
      lektion_rgnr: this.state.lektion_rgnr,
      lektion_bezahlt: this.state.lektion_bezahlt,
      created_At: this.state.created_At,
      updated_At: this.state.updated_At,
      student_index: this.state.student_index,
      agentur_index: this.state.agentur_index,
    };

    this.props.createLektion(
      newLektion,
      this.state.student_index,
      this.props.history
    );
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      //Student daten
      student_preis45,
      student_preis60,
      student_preis90,
      student_preis120,
      student_abrechnung,
      student_index,
      agentur_index,
    } = nextProps.student.student;

    const {
      //Zahlungs daten
      zahlungsByStudentID,
    } = nextProps.zahlung;

    this.setState({
      lektion_abrechnung: student_abrechnung,
      student_index,
      agentur_index,
      student_preis45,
      student_preis60,
      student_preis90,
      student_preis120,
      zahlungsByStudentID,
    });

    this.lektionBezaltDatum(student_abrechnung);
  }

  componentDidMount() {
    const { student_index } = this.props.match.params;
    this.props.getStudent(student_index, this.props.history);

    this.setState({
      student_index,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "lektion_min") {
      this.lektionPrice(e.target.value);
    }

    if (e.target.name === "lektion_abrechnung") {
      this.lektionBezaltDatum(e.target.value);
    }
  }

  lektionPrice = (lektion_min) => {
    if (lektion_min === "0") {
      this.setState({ lektion_preis: this.state.student_preis45 });
    }

    if (lektion_min === "45") {
      this.setState({ lektion_preis: this.state.student_preis45 });
    }

    if (lektion_min === "60") {
      this.setState({ lektion_preis: this.state.student_preis60 });
    }

    if (lektion_min === "90") {
      this.setState({ lektion_preis: this.state.student_preis90 });
    }

    if (lektion_min === "120") {
      this.setState({ lektion_preis: this.state.student_preis120 });
    }
  };

  lektionBezaltDatum = (lektion_abrechnung) => {
    if (lektion_abrechnung === 0 || lektion_abrechnung === "0") {
      this.setState({ lektion_bezahlt: "" });
    }

    if (lektion_abrechnung === 1 || lektion_abrechnung === "1") {
      this.setState({ lektion_bezahlt: formatDateLocal(new Date()) });
    }

    if (lektion_abrechnung === 2 || lektion_abrechnung === "2") {
      this.setState({ lektion_bezahlt: "" });
    }

    if (lektion_abrechnung === 3 || lektion_abrechnung === "3") {
      this.setState({ lektion_bezahlt: "" });
    }
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
                  Create Lektion for Student {student.student_sortierung}
                </h3>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <h6>Lektion Datum</h6>
                  <div className="form-group">
                    <input
                      type="datetime-local"
                      className="form-control form-control-lg"
                      name="lektion_datum"
                      value={this.state.lektion_datum}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="lektion_min"
                      value={this.state.lektion_min}
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
                        "is-invalid": errors.lektion_preis,
                      })}
                      placeholder="Lektion Preis"
                      name="lektion_preis"
                      value={this.state.lektion_preis}
                      onChange={this.onChange}
                    />
                    {errors.lektion_preis && (
                      <div className="invalid-feedback">
                        {errors.lektion_preis}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="lektion_art"
                      value={this.state.lektion_art}
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
                      name="lektion_status"
                      value={this.state.lektion_status}
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
                      name="lektion_abrechnung"
                      value={this.state.lektion_abrechnung}
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
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.lektion_rgnr,
                      })}
                      placeholder="Lektion RGNR"
                      name="lektion_rgnr"
                      value={this.state.lektion_rgnr}
                      onChange={this.onChange}
                    />
                    {errors.lektion_rgnr && (
                      <div className="invalid-feedback">
                        {errors.lektion_rgnr}
                      </div>
                    )}
                  </div>

                  <h6>Lektion bezahlt</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="lektion_bezahlt"
                      value={this.state.lektion_bezahlt}
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

AddLektion.propTypes = {
  createLektion: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  getStudent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  student: state.student,
  zahlung: state.zahlung,
});

export default connect(mapStateToProps, {
  createLektion,
  getStudent,
})(AddLektion);
