import React from "react";

function Vendor({ children }) {
  console.log("Vendor imported");
  return (
    <>
      <h1>Welcome Vendor</h1>
      {children}
    </>
  );
}

export default Vendor;
