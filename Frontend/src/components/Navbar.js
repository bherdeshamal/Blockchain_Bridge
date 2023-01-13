import React from "react";
import Connect_Wallet from "./Connect_Wallet";
import OriginToken from "./origin";
import "./Title.css";

function Navbar() {
  return (
    <>
      <div className="Title">
        <h1>BlockBridge </h1>

        <Connect_Wallet />
      </div>

      <div>
        {" "}
        <OriginToken />
      </div>
    </>
  );
}

export default Navbar;
