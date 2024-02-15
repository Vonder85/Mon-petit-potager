import * as React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar", () => {
  it("doit afficher Mon Petit Potager", () => {
    render(<Navbar />);
    const title = screen.getByText(/Mon Petit Potager/i);
    expect(title).toBeInTheDocument();
  });
});
