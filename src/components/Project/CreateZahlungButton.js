import React from "react";
import { Link } from "react-router-dom";

const CreateZahlungButton = ({ student_index }) => {
  return (
    <React.Fragment>
      <Link to={`/addZahlung/${student_index}`} className="btn btn-lg btn-info">
        Create a Zahlung
      </Link>
    </React.Fragment>
  );
};

export default CreateZahlungButton;
