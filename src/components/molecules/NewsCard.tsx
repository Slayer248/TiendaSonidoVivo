import React from 'react';
import type { NewsArticle } from '../../types';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';

interface NewsCardProps {
  article: NewsArticle;
  onReadMore: (article: NewsArticle) => void;
}

// Molécula: Tarjeta de artículo para la sección de novedades/blog
export const NewsCard: React.FC<NewsCardProps> = ({ article, onReadMore }) => {
  return (
    <div className="card h-100 shadow-sm border-0 overflow-hidden">
      <img
        src={article.imagen}
        className="card-img-top object-fit-cover"
        alt={article.titulo}
        style={{ height: '200px' }}
      />
      <div className="card-body d-flex flex-column p-4">
        <div className="d-flex align-items-center justify-content-between mb-2">
          <Badge variant="primary">{article.categoria}</Badge>
          <span className="text-muted small">
            <i className="bi bi-clock me-1"></i>
            {article.fecha}
          </span>
        </div>
        <h5 className="card-title fw-bold text-dark mb-2">{article.titulo}</h5>
        <p className="card-text text-secondary small flex-grow-1 mb-4">{article.resumen}</p>
        <Button variant="outline-primary" className="fw-bold w-100 mt-auto" icon="eye-fill" onClick={() => onReadMore(article)}>
          Leer Más
        </Button>
      </div>
    </div>
  );
};