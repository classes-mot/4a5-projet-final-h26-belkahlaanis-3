import { createPortal } from "react-dom";

export default function ModalSupprimer({ annuler, supprimer, nomBuild }) {
  return createPortal(
    <div>
      <div>
        <h1>VVoulez-vous vraiment supprimer le build "{nomBuild}"</h1>
        <div>
          <button onClick={annuler}>non</button>
          <button onClick={supprimer}>Supprimer</button>
        </div>
      </div>
    </div>,
    document.getElementById("modalSup"),
  );
}
