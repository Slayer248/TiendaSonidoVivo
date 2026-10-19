import React, { useState } from 'react';
import { StoreTemplate } from '../components/templates/StoreTemplate';
import { NewsCard } from '../components/molecules/NewsCard';
import type { NewsArticle } from '../types';

const articles: NewsArticle[] = [
  {
    id: 1,
    titulo: 'Guía de Mantenimiento: Cómo Cuidar tus Guitarras en Invierno',
    categoria: 'Consejos y Tutoriales',
    fecha: '05 de Septiembre, 2026',
    autor: 'Equipo Técnico Sonido Vivo',
    imagen: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80',
    resumen: 'Los cambios drásticos de humedad y temperatura afectan seriamente la madera de las guitarras.',
    descripcionCompleta: 'Mantén tu instrumento afinado e hidratado durante los meses fríos con aceite de limón.'
  }
];

export const NovedadesPage: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <StoreTemplate>
      <div className="container my-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Novedades y Consejos de Audio</h1>
          <p className="text-muted">Las últimas tendencias e información para músicos</p>
        </div>

        <div className="row g-4">
          {articles.map((art) => (
            <div key={art.id} className="col-md-6 col-lg-4">
              <NewsCard article={art} onReadMore={(item) => setSelectedArticle(item)} />
            </div>
          ))}
        </div>

        {/* Modal para detalle */}
        {selectedArticle && (
          <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-dark text-white">
                  <h5 className="modal-title">{selectedArticle.titulo}</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedArticle(null)}></button>
                </div>
                <div className="modal-body p-4">
                  <p>{selectedArticle.descripcionCompleta}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </StoreTemplate>
  );
};