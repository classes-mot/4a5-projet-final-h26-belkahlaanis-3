import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import UserBuild from "./userBuild";
import { Auth } from "../../context/auth-context";

//tester l'apparition du bouton Enregistrer

// Mock traduction
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock router
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useParams: () => ({
      userId: "123",
      buildId: "456",
    }),
  };
});

// Mock composants compliqués
vi.mock("../BuildCardConteneur/buildCardContenuer", () => ({
  default: () => <div>Conteneur</div>,
}));

vi.mock("../BuildCardInfo/buildCardInfo", () => ({
  default: () => <div>Item</div>,
}));

vi.mock("../comboBox/comboBox", () => ({
  default: () => <div>ComboBox</div>,
}));

beforeEach(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => ({
        Build: {
          titre: "Mage Build",
          isPublic: false,
          classe: "Samurai",
          description: "description",
          equipements: {},
          talismans: {},
          stats: {
            hp: 10,
            fp: 10,
            end: 10,
            str: 10,
            dex: 10,
            int: 10,
            faith: 10,
            arc: 10,
            lvl: 10,
          },
        },
        items: [],
      }),
    }),
  );
});

it("affiche les boutons propriétaire", async () => {
  render(
    <Auth.Provider
      value={{
        userId: "123",
        token: "fake-token",
      }}
    >
      <MemoryRouter>
        <UserBuild />
      </MemoryRouter>
    </Auth.Provider>,
  );

  expect(await screen.findByText("build.btnEnregistrer")).toBeInTheDocument();
});
