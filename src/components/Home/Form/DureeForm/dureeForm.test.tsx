import * as React from "react";
import { render, screen } from "@testing-library/react";
import { DureeForm } from "./dureeForm";
import { FormProvider, useForm } from "react-hook-form";

describe("DureeForm", () => {
  // Valeurs par defaut, c.f. <Form />
  const defaultValues = () => {
    return {
      duree: 3,
    };
  };

  const renderDureeForm = ({ defaultValues = {} } = {}) => {
    const Wrapper = () => {
      const methods = useForm({ defaultValues });
      return (
        <FormProvider {...methods}>
          <DureeForm />
        </FormProvider>
      );
    };

    return {
      ...render(<></>, { wrapper: Wrapper }),
    };
  };

  it("Doit avoir 3 mois comme valeur par défaut", async () => {
    // given
    renderDureeForm({
      defaultValues: defaultValues(),
    });

    // then
    expect(screen.getByText("3 mois")).toBeInTheDocument();
  });
});
