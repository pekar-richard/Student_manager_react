import React from "react";
import { Link } from "react-router-dom";

const RechnungBoardButton = () => {
  //debugger;
  return (
    <React.Fragment>
      <Link to="/RechnungDashboard/" className="btn btn-lg btn-info">
        Rechnung Board
      </Link>
    </React.Fragment>
  );
};

export default RechnungBoardButton;
