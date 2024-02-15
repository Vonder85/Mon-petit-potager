import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FormProvider, useForm } from "react-hook-form";
import { LocalisationForm } from "./localisationForm";

describe("localisationForm", () => {
  // Valeurs par defaut, c.f. <Form />
  const defaultValues = () => {
    return {};
  };

  const renderDureeForm = ({ defaultValues = {} } = {}) => {
    const Wrapper = () => {
      const methods = useForm({ defaultValues });
      return (
        <FormProvider {...methods}>
          <LocalisationForm />
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
