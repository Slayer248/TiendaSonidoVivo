// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';

import Contacto from '../componentes/paginas/contacto'; 

// Agrupa todas las pruebas que le hagamos a la página de Contacto
describe('Componente Contacto', () => {
  
  // Define qué es lo que estamos comprobando en esta prueba en específico
  it('debe tener un contenedor con las clases responsivas col-12, col-md-8 y col-lg-6', () => {
    
    // 1. Dibuja el componente de forma virtual para poder revisarlo
    render(<Contacto />);

    // 2. Busca el título "Formulario de contacto" en la pantalla
    const titulo = screen.getByRole('heading', { name: /formulario de contacto/i });
    
    // 3. Sube dos niveles en el código HTML para llegar al cuadro que tiene las clases de Bootstrap
    const contenedorColumna = titulo.parentElement?.parentElement;

    // 4. Revisa que el cuadro de Bootstrap exista y que tenga las 3 clases de tamaño
    expect(contenedorColumna).toBeDefined();
    expect(contenedorColumna).toHaveClass('col-12');
    expect(contenedorColumna).toHaveClass('col-md-8');
    expect(contenedorColumna).toHaveClass('col-lg-6');
  });
});
