// @vitest-environment jsdom

import {test, expect, vi} from "vitest";

import {render, screen, fireEvent} from "@testing-library/react";

import FomularioContacto from "../componentes/organismos/FormularioContacto";

test("muestra una alerta cuando el nombre esta vacio", () => {
//simlamos la función alert del navegador
const alerta = vi.spyOn(window, "alert").mockImplementation(()=>{});

//mostramos el formulario
render(<FomularioContacto/>);

//simulamos que el usuario presioan enviar
fireEvent.click(
    screen.getByRole("button", {name: "enviar mensaje"})
);

//Comprobamos el mensjae de validación
expect(alerta).toHaveBeenCalledWith("debe ingresar su nombre");

//Restauramos la función alert
alerta.mockRestore();

})