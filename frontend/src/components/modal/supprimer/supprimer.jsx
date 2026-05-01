import { createPortal } from "react-dom";
import "./supprimer.css";

export default function ModalSupprimer({ annuler, supprimer, nomBuild }) {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box">
        <h1 className="modal-title">
          Voulez-vous vraiment supprimer le build "{nomBuild}"
        </h1>
        <div className="modal-actions">
          <button className="btn" onClick={annuler}>
            non
          </button>
          <button className="btn" onClick={supprimer}>
            Supprimer
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modalSup"),
  );
}
