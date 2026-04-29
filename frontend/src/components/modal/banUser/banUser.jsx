import { useState } from "react";
import { createPortal } from "react-dom";
export default function ModalBanUser({ annuler, ban, nomUser }) {
  const [raison, setRaison] = useState("");
  return createPortal(
    <div>
      <h1>Voulez vous vraiment ban {nomUser}</h1>
      <input
        type="text"
        placeholder="Raison du ban"
        value={raison}
        onChange={(e) => setRaison(e.target.value)}
      />
      <button onClick={annuler}>Annuler</button>
      <button onClick={() => ban(raison)}>Oui</button>
    </div>,
    document.getElementById("modalSup"),
  );
}
