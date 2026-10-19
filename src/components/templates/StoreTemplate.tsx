import React, { useState } from 'react';
import { Navbar } from '../organisms/Navbar';
import { CartOffcanvas } from '../organisms/CartOffcanvas';

interface StoreTemplateProps {
  children: React.ReactNode;
}

export const StoreTemplate: React.FC<StoreTemplateProps> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      {/* Navbar principal */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Contenido principal de la página */}
      <main className="flex-grow-1 container my-4">
        {children}
      </main>

      {/* Offcanvas del carrito */}
      <CartOffcanvas isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Footer */}
      <footer className="bg-black text-center text-muted py-3 border-top border-secondary mt-auto">
        <small>&copy; 2026 Sonido Vivo. Todos los derechos reservados.</small>
      </footer>
    </div>
  );
};