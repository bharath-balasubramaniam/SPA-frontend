import React from "react";
import { useState } from "react";
import UserBackdrop from "./UserBackdrop";
import UserModal from "./UserModal";
import "./viewModal.css";
export const InfoButton = ({ info }) => {
  const [showModal, setShowModal] = useState();
  function showModalHandler() {
    setShowModal(true);
  }
  function closeModalHandler() {
    setShowModal(false);
  }
  return (
    <div>
      <button
        className="btn"
        onClick={showModalHandler}
        style={{
          backgroundColor: "#c3f0ca",
          color: "black",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        View
      </button>

      {showModal && <UserBackdrop onClick={closeModalHandler} />}
      {showModal && <UserModal info={info} onClose={closeModalHandler} />}
    </div>
  );
};
