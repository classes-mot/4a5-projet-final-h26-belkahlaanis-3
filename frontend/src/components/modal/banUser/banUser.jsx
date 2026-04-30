import { useState } from "react";
import { createPortal } from "react-dom";
import "./banUser.css"
export default function ModalBanUser({ annuler, ban, nomUser }) {
  const [raison, setRaison] = useState("");
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box">
        <h1 className="modal-title">Voulez vous vraiment ban {nomUser}</h1>
        <input
          className="modal-input"
          type="text"
          placeholder="Raison du ban"
          value={raison}
          onChange={(e) => setRaison(e.target.value)}
        />
        <div className="modal-actions">
          <button className="btn" onClick={annuler}>
            Annuler
          </button>
          <button className="btn" onClick={() => ban(raison)}>
            Oui
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modalSup"),
  );
}
