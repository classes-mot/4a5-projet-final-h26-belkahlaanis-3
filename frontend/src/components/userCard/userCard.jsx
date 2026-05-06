import "./userCard.css";
import { useTranslation } from "react-i18next";
export default function UserCard({ nomUser, ban }) {
  const { t } = useTranslation();
  return (
    <div className="user-card">
      <p className="user-card-name">{nomUser}</p>
      <div className="user-card-actions">
        <button className="btn" onClick={ban}>
          {t("admin.ban")}
        </button>
      </div>
    </div>
  );
}
