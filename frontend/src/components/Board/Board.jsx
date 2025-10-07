import React from "react";
import Column from "../Column/Column";

export default function Board() {
  const boardStyle = { display: "flex", gap: "10px", padding: "20px" };
  return (
    <div style={boardStyle}>
      <Column />
    </div>
  );
}
