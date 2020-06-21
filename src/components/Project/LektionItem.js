import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteLektion } from "../../actions/LektionActions";
import { formatDateTimeCompare, formatDateTime } from "../../tools";
import "bootstrap/dist/css/bootstrap.min.css";

class LektionItem extends Component {
  constructor() {
    super();

    this.state = {};
  }

  onDeleteClick = (id) => {
    this.props.deleteLektion(id);
  };
  now = formatDateTimeCompare(new Date());

  render() {
    const { lektion } = this.props;
    const { increment } = this.props;
    return (
      <div className="container">
        <div
          className={`card card-body mb-3 ${
            this.now > formatDateTimeCompare(lektion.lektionDatum)
              ? "bg-info"
              : "bg-warning"
          }`}
        >
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{increment}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{formatDateTime(lektion.lektionDatum)}</h3>
              <p>{lektion.lektionMin} min.</p>
              <p>{lektion.lektionPreis} euro</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link
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
