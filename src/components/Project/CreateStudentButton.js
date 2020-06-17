import React from "react";
import { Link } from "react-router-dom";

const CreateStudentButton = () => {
  return (
    <React.Fragment>
      <Link to="/addStudent" className="btn btn-lg btn-info">
        Create a Student
      </Link>
    </React.Fragment>
  );
};

export default CreateStudentButton;
