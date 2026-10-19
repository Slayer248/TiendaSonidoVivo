import React, { useState } from 'react';
import { StoreTemplate } from '../components/templates/StoreTemplate';
import { SearchBar } from '../components/molecules/SearchBar';
import { ProductCard } from '../components/molecules/ProductCard';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

const initialProducts: Product[] = [
  { id: 1, nombre: 'Guitarra Eléctrica Fender Stratocaster', categoria: 'Guitarras', precio: 750000, stock: 5, img: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&w=400&q=80' },
  { id: 2, nombre: 'Teclado Roland XPS-10', categoria: 'Teclados', precio: 620000, stock: 2, img: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=400&q=80' },
  { id: 3, nombre: 'Batería Acústica Pearl Roadshow', categoria: 'Baterías', precio: 580000, stock: 0, img: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=400&q=80' },
  { id: 4, nombre: 'Pedal de Efectos Boss DS-1', categoria: 'Accesorios', precio: 85000, stock: 12, img: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?auto=format&fit=crop&w=400&q=80' }
];

export const HomePage: React.FC = () => {
  const [products] = useState<Product[]>(() => {
    const saved = localStorage.getItem('productos_sonidovivo');
    if (!saved) {
      localStorage.setItem('productos_sonidovivo', JSON.stringify(initialProducts));
      return initialProducts;
    }
    return JSON.parse(saved);
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const { addToCart } = useCart();

  const categories = Array.from(new Set(products.map((p) => p.categoria)));

  const filteredProducts = products.filter((p) => {
    const matchName = p.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory === 'todas' || p.categoria === selectedCategory;
    return matchName && matchCat;
  });

  return (
    <StoreTemplate>
      <div className="container my-5">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Catálogo de Instrumentos</h1>
          <p className="text-muted">Encuentra los mejores equipos de audio e instrumentos musicales</p>
        </div>

        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {filteredProducts.map((product) => (
            <div className="col" key={product.id}>
              <ProductCard product={product} onAddToCart={addToCart} />
            </div>
          ))}
        </div>
      </div>
    </StoreTemplate>
  );
};