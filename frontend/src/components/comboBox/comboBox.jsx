import { useTranslation } from "react-i18next";

export default function ComboBox({ choix, setChoix, estProprietaire }) {
  const { t } = useTranslation();
  return (
    <div>
      <label htmlFor="classe">{t("build.comboClasses")}</label>
      <select
        id="classe"
        value={choix}
        disabled={!estProprietaire}
        onChange={(e) => setChoix(e.target.value)}
      >
        <option value="" disabled>
          --
        </option>
        <option value="Hero">{t("build.classes.hero")}</option>
        <option value="Bandit">{t("build.classes.bandit")}</option>
        <option value="Astrologer">{t("build.classes.astrologer")}</option>
        <option value="Warrior">{t("build.classes.warrior")}</option>
        <option value="Prisoner">{t("build.classes.prisoner")}</option>
        <option value="Confessor">{t("build.classes.confessor")}</option>
        <option value="Wretch">{t("build.classes.wretch")}</option>
        <option value="Vagabond">{t("build.classes.vagabond")}</option>
        <option value="Prophet">{t("build.classes.prophet")}</option>
        <option value="Samurai">{t("build.classes.samurai")}</option>
        <option value="Heavy Knight">{t("build.classes.heavyKnight")}</option>
      </select>
    </div>
  );
}
