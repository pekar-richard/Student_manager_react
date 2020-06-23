import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteAgentur } from "../../actions/AgenturActions";
import "../../App.css";

class AgenturItem extends Component {
  onDeleteClick = (id) => {
    this.props.deleteAgentur(id);
  };
  render() {
    const { increment } = this.props;
    const { agentur } = this.props;

    return (
      <div className="container">
        <div className="card card-body mb-3">
          <div className="row">
            <div className="col-2">
              <span className="mx-auto">{increment}</span>
            </div>
            <div className="col-lg-6 col-md-4 col-8">
              <h3>{agentur.agenturKurzname}</h3>
              <p>{agentur.agenturKomm}</p>
            </div>
            <div className="col-md-4 d-none d-lg-block">
              <ul className="list-group">
                <Link
                  className="linkButton"
                  to={`/updateAgentur/${agentur.agenturIndex}`}
                >
                  <li className="list-group-item update">
                    <i className="fa fa-edit pr-1"> Update Agentur</i>
                  </li>
                </Link>
                <li
                  className="list-group-item delete"
                  onClick={this.onDeleteClick.bind(this, agentur.agenturIndex)}
                >
                  <i className="fa fa-minus-circle pr-1"> Delete Agentur</i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AgenturItem.propTypes = {
  deleteAgentur: PropTypes.func.isRequired,
};

export default connect(null, { deleteAgentur })(AgenturItem);