import React from "react";

function Message({ msg, bgColor, className }) {
  let styles = {
      padding: "1vh",
      textAlign: "center",
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
      backgroundColor: bgColor,
  };
  return (
    <div style={styles} className={className}>
      <p className="m-0">{msg}</p>
    </div>
  );
}

export default Message;
