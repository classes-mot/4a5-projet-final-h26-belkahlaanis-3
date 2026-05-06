import "./buildCard.css";
import { useTranslation } from "react-i18next";
export default function BuildCard({ nomBuild, estPrivee, supprimer, acceder }) {
  const { t } = useTranslation();
  return (
    <div className="build-card">
      <p className="build-card-name">{nomBuild}</p>
      <div className="build-card-actions">
        {estPrivee && (
          <button className="btn" onClick={supprimer}>
            {t("menu.btnSupprimer")}
          </button>
        )}
        <button className="btn" onClick={acceder}>
          {t("menu.btnAcceder")}
        </button>
      </div>
    </div>
  );
}
