import { useTranslation } from "react-i18next";
export default function ChangerLng() {
  const { i18n } = useTranslation();
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  return (
    <div className="language-switcher">
      <button className="btn" onClick={() => changeLanguage("fr")}>
        Français
      </button>

      <button className="btn" onClick={() => changeLanguage("en")}>
        English
      </button>
    </div>
  );
}
