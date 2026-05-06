import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("notFound.code")}</h1>
      <p>{t("notFound.message")}</p>
      <button type="button" onClick={() => navigate("/")}>
        {t("notFound.retour")}
      </button>
    </div>
  );
}
