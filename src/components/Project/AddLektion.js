import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createLektion } from "../../actions/LektionActions";
import { getStudent } from "../../actions/StudentActions";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import es from "date-fns/locale/es";

registerLocale("es", es);

class AddLektion extends Component {
  constructor() {
    super();

    this.state = {
      lektion_datum: new Date(),
      lektion_min: "",
      lektion_preis: "",
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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      lektion_datum: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const newLektion = {
      lektion_datum: this.state.lektion_datum,
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

    this.props.createLektion(newLektion, this.props.history);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      student_abrechnung,
      student_index,
      agentur_index,
    } = nextProps.student.student;

    this.setState({
      lektion_abrechnung: student_abrechnung,
      student_index,
      agentur_index,
    });
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
  }

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
                    <DatePicker
                      selected={this.state.lektion_datum}
                      onChange={this.handleChange}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={20}
                      timeCaption="time"
                      dateFormat="yyyy-MM-dd HH:mm:ss"
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
});

export default connect(mapStateToProps, { createLektion, getStudent })(
  AddLektion
);
