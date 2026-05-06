import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import BuildCardConteneur from "./buildCardContenuer";

// affiche un item charge par le build et non rajoute

vi.mock("react-dnd", () => ({
  useDrop: () => [
    {
      isOver: false,
      canDrop: false,
    },
    vi.fn(),
  ],
}));

describe("BuildCardConteneur", () => {
  it("affiche un item initial", () => {
    render(
      <BuildCardConteneur
        type="weapon"
        ajouterItem={vi.fn()}
        enlverItem={vi.fn()}
        itemInitial={{
          _id: "1",
          nom: "Moonveil",
        }}
      />,
    );

    expect(screen.getByText("Moonveil")).toBeInTheDocument();
  });
});
