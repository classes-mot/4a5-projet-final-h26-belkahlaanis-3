import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import ComboBox from "./comboBox";

// tester le changement du comboBox --> de vide a samurai

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

describe("ComboBox", () => {
  it("change la valeur sélectionnée", () => {
    const mockSetChoix = vi.fn();

    render(
      <ComboBox choix="" estProprietaire={true} setChoix={mockSetChoix} />,
    );

    const select = screen.getByLabelText("build.comboClasses");

    fireEvent.change(select, {
      target: { value: "Samurai" },
    });

    expect(mockSetChoix).toHaveBeenCalledWith("Samurai");
  });
});
