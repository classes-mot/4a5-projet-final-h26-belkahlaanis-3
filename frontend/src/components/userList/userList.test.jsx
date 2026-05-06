import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { it, expect, vi, beforeEach } from "vitest";
import { Auth } from "../../context/auth-context";
import UserList from "./userList";

// Mock traduction
vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

// Mock composants enfants
vi.mock("../userCard/userCard", () => ({
  default: ({ nomUser }) => <div>{nomUser}</div>,
}));

vi.mock("../modal/banUser/banUser", () => ({
  default: () => <div>Modal</div>,
}));

beforeEach(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: async () => ({
        Users: [
          {
            _id: "1",
            nom: "Anis",
          },
        ],
      }),
    })
  );
});

it("affiche les utilisateurs après fetch", async () => {
  render(
    <Auth.Provider
      value={{
        token: "fake-token",
        logout: vi.fn(),
      }}
    >
      <UserList />
    </Auth.Provider>
  );

  expect(
    await screen.findByText("Anis")
  ).toBeInTheDocument();
});