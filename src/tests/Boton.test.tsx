// @vitest-environment jsdom  comando install -D @testing-library/react @testing-library/jest-dom jsdom
import {test, expect} from "vitest";
import {render, screen} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Boton from "../componentes/atomos/Boton";

test("el botón de muestra el texto Ver producto", () =>{
    render(
        <MemoryRouter>
            <Boton id={3} />
        </MemoryRouter>
    );

    const boton = screen.getByText("Ver Producto");

    expect(boton.textContent).toBe("Ver Producto");

});