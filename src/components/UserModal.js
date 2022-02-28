import React from "react";
function UserModal({ info, onClose }) {
  return (
    <div className="modal">
      <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
        User Information
      </h1>
      <div className="modal-wrapper">
        <p className="info-title">
          User Id : <span className="info"> {info._id}</span>
        </p>
        <p className="info-title">
          Name : <span className="info"> {info.name}</span>
        </p>
        <p className="info-title">
          E-mail : <span className="info"> {info.email}</span>
        </p>
        <p className="info-title">
          Mobile no : <span className="info"> {info.contact}</span>
        </p>
        <button className="btn btn--alt" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default UserModal;
