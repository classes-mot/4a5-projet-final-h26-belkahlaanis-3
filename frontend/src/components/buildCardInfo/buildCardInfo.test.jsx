// BuildCardInfo.test.jsx

import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import BuildCardInfo from "./buildCardInfo";

//tester que la Card(le nom) est bien dans le UI 

// Mock react-dnd
vi.mock("react-dnd", () => ({
  useDrag: () => [
    {
      isDragging: false,
    },
    vi.fn(),
  ],
}));

describe("BuildCardInfo", () => {
  it("affiche le nom de l'objet", () => {
    render(
      <BuildCardInfo
        type="weapon"
        objet={{
          nom: "Moonveil",
          image: "moonveil.png",
        }}
      />,
    );

    expect(screen.getByText("Moonveil")).toBeInTheDocument();
  });
});
