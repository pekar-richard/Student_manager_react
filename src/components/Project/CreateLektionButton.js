import React from "react";
import { Link } from "react-router-dom";

const CreateLektionButton = ({ student_index }) => {
  return (
    <React.Fragment>
      <Link to={`/addLektion/${student_index}`} className="btn btn-lg btn-info">
        Create a Lektion
      </Link>
    </React.Fragment>
  );
};

export default CreateLektionButton;
