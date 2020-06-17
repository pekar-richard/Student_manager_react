import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStudent } from "../../actions/StudentActions";
import { getAgenturs } from "../../actions/AgenturActions";
import classnames from "classnames";

class AddStudent extends Component {
  constructor() {
    super();

    this.state = {
      student_nachname: "",
      student_vorname: "",
      student_sortierung: "",
      student_gebdat: "",
      student_ersttermin: "",
      student_letztermin: "",
      student_preis45: "",
      student_preis60: "",
      student_preis90: "",
      student_preis120: "",
      student_abrechnung: "",
      student_kredit: "",
      student_aktiv: "",
      student_quelle: "",
      student_komm: "",
      created_At: "",
      updated_At: "",
      agentur_index: null,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const newStudent = {
      student_nachname: this.state.student_nachname,
      student_vorname: this.state.student_vorname,
      student_sortierung: this.state.student_sortierung,
      student_gebdat: this.state.student_gebdat,
      student_ersttermin: this.state.student_ersttermin,
      student_letztermin: this.state.student_letztermin,
      student_preis45: this.state.student_preis45,
      student_preis60: this.state.student_preis60,
      student_preis90: this.state.student_preis90,
      student_preis120: this.state.student_preis120,
      student_abrechnung: this.state.student_abrechnung,
      student_kredit: this.state.student_kredit,
      student_aktiv: this.state.student_aktiv,
      student_quelle: this.state.student_quelle,
      student_komm: this.state.student_komm,
      created_At: this.state.created_At,
      updated_At: this.state.updated_At,
      agentur_index: this.state.agentur_index,
    };
    this.props.createStudent(newStudent, this.props.history);
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    const { agentur_index } = nextProps.agentur;
    this.setState({ agentur_index });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.props.getAgenturs(this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { agenturs } = this.props.agentur;

    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">Create Student form</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.student_nachname,
                      })}
                      placeholder="Student Nachname"
                      name="student_nachname"
                      value={this.state.student_nachname}
                      onChange={this.onChange}
                    />
                    {errors.student_nachname && (
                      <div className="invalid-feedback">
                        {errors.student_nachname}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.student_vorname,
                      })}
                      placeholder="Student Vorname"
                      name="student_vorname"
                      value={this.state.student_vorname}
                      onChange={this.onChange}
                    />
                    {errors.student_vorname && (
                      <div className="invalid-feedback">
                        {errors.student_vorname}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.student_preis45,
                      })}
                      placeholder="Student Preis 45"
                      name="student_preis45"
                      value={this.state.student_preis45}
                      onChange={this.onChange}
                    />
                    {errors.student_preis45 && (
                      <div className="invalid-feedback">
                        {errors.student_preis45}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.student_preis60,
                      })}
                      placeholder="Student Preis 60"
                      name="student_preis60"
                      value={this.state.student_preis60}
                      onChange={this.onChange}
                    />
                    {errors.student_preis60 && (
                      <div className="invalid-feedback">
                        {errors.student_preis60}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.student_preis90,
                      })}
                      placeholder="Student Preis 90"
                      name="student_preis90"
                      value={this.state.student_preis90}
                      onChange={this.onChange}
                    />
                    {errors.student_preis90 && (
                      <div className="invalid-feedback">
                        {errors.student_preis90}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.student_preis120,
                      })}
                      placeholder="Student Preis 120"
                      name="student_preis120"
                      value={this.state.student_preis120}
                      onChange={this.onChange}
                    />
                    {errors.student_preis120 && (
                      <div className="invalid-feedback">
                        {errors.student_preis120}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.student_kredit,
                      })}
                      placeholder="Student Kredit"
                      name="student_kredit"
                      value={this.state.student_kredit}
                      onChange={this.onChange}
                    />
                    {errors.student_kredit && (
                      <div className="invalid-feedback">
                        {errors.student_kredit}
                      </div>
                    )}
                  </div>

                  <h6>Geburst Datum</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      name="student_gebdat"
                      value={this.state.student_gebdat}
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.student_quelle,
                      })}
                      placeholder="Student Quelle"
                      name="student_quelle"
                      value={this.state.student_quelle}
                      onChange={this.onChange}
                    />
                    {errors.student_quelle && (
                      <div className="invalid-feedback">
                        {errors.student_quelle}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <textarea
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.student_komm,
                      })}
                      placeholder="Student Komentar"
                      name="student_komm"
                      value={this.state.student_komm}
                      onChange={this.onChange}
                    ></textarea>
                    {errors.student_komm && (
                      <div className="invalid-feedback">
                        {errors.student_komm}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="student_abrechnung"
                      value={this.state.student_abrechnung}
                      onChange={this.onChange}
                    >
                      <option value={""}>Select Abrechnung</option>
                      <option value={0}>Bar</option>
                      <option value={1}>Kredit</option>
                      <option value={2}>Rehnung</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="student_aktiv"
                      value={this.state.student_aktiv}
                      onChange={this.onChange}
                    >
                      <option value="">Select Status</option>
                      <option value={0}>aktiv</option>
                      <option value={1}>nicht aktiv</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="agentur_index"
                      value={this.state.agentur_index}
                      onChange={this.onChange}
                    >
                      <option value="">Select Agentur</option>
                      {agenturs.map((agentur) => (
                        <option
                          key={agentur.agentur_index}
                          value={agentur.agentur_index}
                        >
                          {agentur.agentur_kurzname}
                        </option>
                      ))}
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

AddStudent.propTypes = {
  getAgenturs: PropTypes.func.isRequired,
  createStudent: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  agentur: state.agentur,
  errors: state.errors,
});

export default connect(mapStateToProps, { getAgenturs, createStudent })(
  AddStudent
);
