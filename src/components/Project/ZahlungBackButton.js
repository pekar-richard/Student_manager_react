import React from "react";
import { Link } from "react-router-dom";

const ZahlungBackButton = ({ student_index }) => {
  return (
    <React.Fragment>
      <Link
        to={`/StudentLektionDashboard/${student_index}`}
        className="btn btn-lg btn-info"
      >
        Back
      </Link>
    </React.Fragment>
  );
};

export default ZahlungBackButton;
