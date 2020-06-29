import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { createLektion } from "../../actions/LektionActions";
import { getStudent } from "../../actions/StudentActions";
import "bootstrap/dist/css/bootstrap.min.css";
import { formatDateTimeLocal } from "../../tools";

class AddLektion extends Component {
  constructor() {
    super();

    this.state = {
      nichtgenugkredit: false,
      nichtgenugkreditmessage: "Der Student hast nicht genug Kredit!",
      //Student daten
      studentKredit: "",
      studentPreis45: "",
      studentPreis60: "",
      studentPreis90: "",
      studentPreis120: "",
      //Lektion daten
      lektionDatum: formatDateTimeLocal(new Date()),
      lektionMin: "",
      lektionPreis: 0,
      lektionArt: "",
      lektionStatus: "",
      createdAt: "",
      updatedAt: "",
      studentIndex: "",
      agenturIndex: "",
      zahlungIndex: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const newLektion = {
      lektionDatum: new Date(this.state.lektionDatum).toISOString(),
      lektionMin: this.state.lektionMin,
      lektionPreis: this.state.lektionPreis,
      lektionArt: this.state.lektionArt,
      lektionStatus: this.state.lektionStatus,
      createdAt: this.state.createdAt,
      updatedAt: this.state.updatedAt,
      studentIndex: this.state.studentIndex,
      agenturIndex: this.state.agenturIndex,
      zahlungIndex: this.state.zahlungIndex,
    };

    this.props.createLektion(
      newLektion,
      this.state.studentIndex,
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
      studentKredit,
      studentPreis45,
      studentPreis60,
      studentPreis90,
      studentPreis120,
      studentIndex,
      agenturIndex,
    } = nextProps.student.student;

    this.setState({
      //Student daten
      studentIndex,
      agenturIndex,
      studentPreis45,
      studentPreis60,
      studentPreis90,
      studentPreis120,
      studentKredit,
    });
  }

  componentDidMount() {
    const { studentIndex } = this.props.match.params;
    this.props.getStudent(studentIndex, this.props.history);

    this.setState({
      studentIndex,
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });

    if (e.target.name === "lektionMin") {
      this.lektionPrice(e.target.value);
    }
  }

  checkKredit() {
    if (this.state.studentKredit >= this.state.lektionPreis) {
      if (this.state.nichtgenugkredit === true) {
        this.setState({
          nichtgenugkredit: false,
        });
      }
    } else {
      if (this.state.nichtgenugkredit === false) {
        this.setState({
          nichtgenugkredit: true,
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
                  Create Lektion für den Student {student.studentSortierung}
                </h3>
                <br />
                <hr />
                <form onSubmit={this.onSubmit}>
                  <h6>Lektion Datum</h6>
                  <div className="form-group">
                    <input
                      type="datetime-local"
                      className="form-control form-control-lg"
                      name="lektionDatum"
                      value={this.state.lektionDatum}
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
                      value={this.state.lektionPreis}
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

export default connect(mapStateToProps, {
  createLektion,
  getStudent,
  getStudent,
})(AddLektion);
