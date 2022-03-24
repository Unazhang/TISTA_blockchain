import React from "react";

function Vender({ children }) {
  console.log("vender imported");
  return (
    <>
      <h1>Welcome Vender</h1>
      {children}
    </>
  );
}

export default Vender;
