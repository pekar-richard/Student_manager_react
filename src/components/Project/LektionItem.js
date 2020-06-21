import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteLektion } from "../../actions/LektionActions";
import { formatDateTime, formatDateTimeLocal } from "../../tools";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";

class LektionItem extends Component {
  constructor() {
    super();

    this.state = {};
  }

  onDeleteClick = (id) => {
    this.props.deleteLektion(id);
  };

  render() {
    const { lektion } = this.props;
    const { increment } = this.props;

    let currentTime = new Date().getTime();
    let lektionTime = new Date(lektion.lektionDatum).getTime();

    return (
      <div className="container">
        <div
          className={`card card-body mb-3 ${
            currentTime > lektionTime ? "lektion-in-future" : "lektion-in-past"
          }`}
        >
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{increment}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h4>{formatDateTime(lektion.lektionDatum)}</h4>

              <p>
                Dauer: {lektion.lektionMin} min. <br /> Preis:{" "}
                {lektion.lektionPreis} euro <br />
              </p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link
                  className="linkButton"
                  to={`/updateLektion/${lektion.lektionIndex}/${lektion.studentIndex}`}
                >
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Lektion</i>
                  </li>
                </Link>
                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(this, lektion.lektionIndex)}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Lektion</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LektionItem.propTypes = {
  deleteLektion: PropTypes.func.isRequired,
};

export default connect(null, { deleteLektion })(LektionItem);
