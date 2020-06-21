import React from "react";
import { Link } from "react-router-dom";

const CreateLektionButton = ({ studentIndex }) => {
  return (
    <React.Fragment>
      <Link to={`/addLektion/${studentIndex}`} className="btn btn-lg btn-info">
        Create a Lektion
      </Link>
    </React.Fragment>
  );
};

export default CreateLektionButton;
