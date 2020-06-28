import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createRechnung } from "../../actions/RechnungActions";
import classnames from "classnames";
import { getAgenturs } from "../../actions/AgenturActions";
import { getStudents } from "../../actions/StudentActions";

class AddRechnung extends Component {
  constructor() {
    super();

    this.state = {
      studentundagenturnull: false,
      studentundagentursindnullmessage:
        "Sie müssen mindestens ein Student oder eine Agentur wählen!",
      rechnTyp: "",
      rechnName: "",
      rechnZusatz: "",
      rechnStr: "",
      rechnPlz: "",
      rechnOrt: "",
      rechnLand: "",
      rechnIco: "",
      rechnDic: "",
      createdAt: "",
      updatedAt: "",
      agenturIndex: "",
      studentIndex: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const newRechnung = {
      rechnTyp: this.state.rechnTyp,
      rechnName: this.state.rechnName,
      rechnZusatz: this.state.rechnZusatz,
      rechnStr: this.state.rechnStr,
      rechnPlz: this.state.rechnPlz,
      rechnOrt: this.state.rechnOrt,
      rechnLand: this.state.rechnLand,
      rechnIco: this.state.rechnIco,
      rechnDic: this.state.rechnDic,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
      agenturIndex: this.state.agenturIndex,
      studentIndex: this.state.studentIndex,
    };

    console.log(this.checkStudentundAgentur());
    if (this.checkStudentundAgentur() === true) {
      this.props.createRechnung(newRechnung, this.props.history);
    }
  }

  checkStudentundAgentur() {
    if (this.state.agenturIndex === "" && this.state.studentIndex === "") {
      if (this.state.studentundagenturnull === false) {
        this.setState({
          studentundagenturnull: true,
        });
      }
      return false;
    } else {
      if (this.state.studentundagenturnull === true) {
        this.setState({
          studentundagenturnull: false,
        });
      }
      return true;
    }
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.props.getAgenturs(this.props.history);
    this.props.getStudents(this.props.history);
  }

  render() {
    const { errors } = this.state;
    const { agenturs } = this.props.agentur;
    const { students } = this.props.student;
    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">
                  Create Rechnung Formular
                </h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="rechnTyp"
                      value={this.state.rechnTyp}
                      onChange={this.onChange}
                    >
                      <option value={0}>Select Rechnung Typ</option>
                      <option value={1}>Student</option>
                      <option value={2}>Agentur</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.rechnName,
                      })}
                      placeholder="Rechnung Name"
                      name="rechnName"
                      value={this.state.rechnName}
                      onChange={this.onChange}
                    />
                    {errors.rechnName && (
                      <div className="invalid-feedback">{errors.rechnName}</div>
                    )}
                  </div>
                  {this.state.studentundagenturnull && (
                    <div className="">
                      {this.state.studentundagentursindnullmessage}
                    </div>
                  )}
                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="agenturIndex"
                      value={this.state.agenturIndex}
                      onChange={this.onChange}
                    >
                      <option value="">Select Agentur</option>
                      {agenturs.map((agentur) => (
                        <option
                          key={agentur.agenturIndex}
                          value={agentur.agenturIndex}
                        >
                          {agentur.agenturKurzname}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="studentIndex"
                      value={this.state.studentIndex}
                      onChange={this.onChange}
                    >
                      <option value="">Select Student</option>

                      {students.map((student) => (
                        <option
                          key={student.studentIndex}
                          value={student.studentIndex}
                        >
                          {student.studentSortierung}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.rechnZusatz,
                      })}
                      placeholder="Rechnung Zusatz Zeile"
                      name="rechnZusatz"
                      value={this.state.rechnZusatz}
                      onChange={this.onChange}
                    />
                    {errors.rechnZusatz && (
                      <div className="invalid-feedback">
                        {errors.rechnZusatz}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.rechnStr,
                      })}
                      placeholder="Rechnung Straße"
                      name="rechnStr"
                      value={this.state.rechnStr}
                      onChange={this.onChange}
                    />
                    {errors.rechnStr && (
                      <div className="invalid-feedback">{errors.rechnStr}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.rechnPlz,
                      })}
                      placeholder="Rechnung Postleitzahl"
                      name="rechnPlz"
                      value={this.state.rechnPlz}
                      onChange={this.onChange}
                    />
                    {errors.rechnPlz && (
                      <div className="invalid-feedback">{errors.rechnPlz}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.rechnOrt,
                      })}
                      placeholder="Rechnung Ort"
                      name="rechnOrt"
                      value={this.state.rechnOrt}
                      onChange={this.onChange}
                    />
                    {errors.rechnOrt && (
                      <div className="invalid-feedback">{errors.rechnOrt}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.rechnLand,
                      })}
                      placeholder="Rechnung Land"
                      name="rechnLand"
                      value={this.state.rechnLand}
                      onChange={this.onChange}
                    />
                    {errors.rechnLand && (
                      <div className="invalid-feedback">{errors.rechnLand}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.rechnIco,
                      })}
                      placeholder="Rechnung ICO"
                      name="rechnIco"
                      value={this.state.rechnIco}
                      onChange={this.onChange}
                    />
                    {errors.rechnIco && (
                      <div className="invalid-feedback">{errors.rechnIco}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className={classnames("form-control form-control-lg ", {
                        "is-invalid": errors.rechnDic,
                      })}
                      placeholder="Rechnung DIC"
                      name="rechnDic"
                      value={this.state.rechnDic}
                      onChange={this.onChange}
                    />
                    {errors.rechnDic && (
                      <div className="invalid-feedback">{errors.rechnDic}</div>
                    )}
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

AddRechnung.propTypes = {
  createRechnung: PropTypes.func.isRequired,
  getAgenturs: PropTypes.func.isRequired,
  getStudents: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  agentur: state.agentur,
  student: state.student,
});

export default connect(mapStateToProps, {
  createRechnung,
  getAgenturs,
  getStudents,
})(AddRechnung);
