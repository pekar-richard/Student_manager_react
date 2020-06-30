import React from "react";
import { Link } from "react-router-dom";

const ZahlungBoardButton = ({ studentIndex }) => {
  return (
    <React.Fragment>
      <Link
        to={`/ZahlungDashboard/${studentIndex}`}
        className="btn btn-lg btn-info"
      >
        Zahlung Board
      </Link>
    </React.Fragment>
  );
};

export default ZahlungBoardButton;
