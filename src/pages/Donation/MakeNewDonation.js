import React from "react";
import { useLocation } from "react-router-dom";

export default function MakeNewDonation() {
  // console.log(props);
  // const address = props;
  const location = useLocation();
  return <div>Vendor address: {location.state}</div>;
}
