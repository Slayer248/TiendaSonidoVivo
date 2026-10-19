import React, { useState } from 'react';
import { StoreTemplate } from '../components/templates/StoreTemplate';
import { Input } from '../components/atoms/Input';
import { Button } from '../components/atoms/Button';

export const ServiciosPage: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const consultas = JSON.parse(localStorage.getItem('consultas_contacto') || '[]');
    consultas.push({ nombre, email, mensaje, fecha: new Date().toLocaleString() });
    localStorage.setItem('consultas_contacto', JSON.stringify(consultas));

    setExito(true);
    setMensaje('');
    setTimeout(() => setExito(false), 4000);
  };

  return (
    <StoreTemplate>
      <div className="container my-5 col-md-8 col-lg-6">
        <div className="card border-0 shadow-sm p-4 p-md-5">
          <h2 className="fw-bold text-center mb-4">Nuestros Servicios y Contacto</h2>
          {exito && <div className="alert alert-success py-2">¡Mensaje enviado con éxito!</div>}
          <form onSubmit={handleSubmit}>
            <Input label="Nombre Completo" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            <Input label="Correo Electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className="mb-3">
              <label className="form-label fw-semibold">Comentario o Mensaje</label>
              <textarea
                className="form-control"
                rows={4}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-100 fw-bold" icon="send-fill">
              Enviar Consulta
            </Button>
          </form>
        </div>
      </div>
    </StoreTemplate>
  );
};