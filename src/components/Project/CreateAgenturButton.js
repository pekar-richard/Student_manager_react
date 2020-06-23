import React from "react";
import { Link } from "react-router-dom";

const CreateAgenturButton = () => {
  return (
    <React.Fragment>
      <Link to="/addAgentur" className="btn btn-lg btn-info">
        Create a Agentur
      </Link>
    </React.Fragment>
  );
};

export default CreateAgenturButton;
