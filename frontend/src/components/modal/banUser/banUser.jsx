import { useState } from "react";
import { createPortal } from "react-dom";
import "./banUser.css";
import { useTranslation } from "react-i18next";
export default function ModalBanUser({ annuler, ban, nomUser }) {
  const { t } = useTranslation();
  const [raison, setRaison] = useState("");
  return createPortal(
    <div className="modal-overlay">
      <div className="modal-box">
        <h1 className="modal-title">
          {t("admin.confirmationBan")} {nomUser}
        </h1>
        <input
          className="modal-input"
          type="text"
          placeholder={t("admin.placeHolder")}
          value={raison}
          onChange={(e) => setRaison(e.target.value)}
        />
        <div className="modal-actions">
          <button className="btn" onClick={annuler}>
            {t("admin.annuler")}
          </button>
          <button className="btn" onClick={() => ban(raison)}>
            {t("admin.accepter")}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modalSup"),
  );
}
