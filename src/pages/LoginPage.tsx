import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreTemplate } from '../components/templates/StoreTemplate';
import { useAuth } from '../context/AuthContext';
import type { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Campos del formulario
  const [run, setRun] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rol, setRol] = useState<UserRole>('Cliente');

  const { login, register } = useAuth();
  const navigate = useNavigate();

  // Función para autocompletar credenciales de prueba
  const fillCredentials = (testEmail: string, testPass: string) => {
    setIsRegisterMode(false);
    setEmail(testEmail);
    setPass(testPass);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isRegisterMode) {
      if (!run.trim() || !nombre.trim()) {
        window.alert('Por favor ingresa tu RUN y Nombre completo.');
        return;
      }

      const success = register({
        run,
        nombre,
        apellidos,
        email,
        pass,
        rol
      });

      if (success) {
        window.alert(`¡Registro exitoso! Bienvenido/a ${nombre}.`);
        login(email, pass);
        navigate('/');
      } else {
        window.alert('Error: Ya existe un usuario registrado con este RUN o correo electrónico.');
      }
    } else {
      const success = login(email, pass);
      if (success) {
        window.alert('¡Inicio de sesión exitoso!');
        navigate('/');
      } else {
        window.alert('Error: Credenciales incorrectas. Verifica tu correo y contraseña.');
      }
    }
  };

  return (
    <StoreTemplate>
      <div className="container my-5 d-flex justify-content-center">
        <div className="card bg-dark text-white border-secondary shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
          
          {/* Tabs de Selección */}
          <div className="card-header border-secondary p-0">
            <div className="row g-0 text-center fw-bold">
              <div
                className={`col py-3 ${!isRegisterMode ? 'bg-warning text-dark' : 'text-white'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setIsRegisterMode(false)}
              >
                Iniciar Sesión
              </div>
              <div
                className={`col py-3 ${isRegisterMode ? 'bg-warning text-dark' : 'text-white'}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setIsRegisterMode(true)}
              >
                Registrarse
              </div>
            </div>
          </div>

          <div className="card-body p-4">
            <h3 className="card-title text-center mb-4 text-warning">
              {isRegisterMode ? 'Crear Nueva Cuenta' : 'Acceso a Sonido Vivo'}
            </h3>

            <form onSubmit={handleSubmit}>
              {isRegisterMode && (
                <>
                  <div className="mb-3">
                    <label className="form-label">RUN / RUT</label>
                    <input
                      type="text"
                      className="form-control bg-dark text-white border-secondary"
                      placeholder="12345678-K"
                      value={run}
                      onChange={(e) => setRun(e.target.value)}
                      required={isRegisterMode}
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Nombre</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="Ej. Juan"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required={isRegisterMode}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Apellidos</label>
                      <input
                        type="text"
                        className="form-control bg-dark text-white border-secondary"
                        placeholder="Ej. Pérez"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="ejemplo@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="••••••••"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
              </div>

              {isRegisterMode && (
                <div className="mb-3">
                  <label className="form-label">Rol de Usuario</label>
                  <select
                    className="form-select bg-dark text-white border-secondary"
                    value={rol}
                    onChange={(e) => setRol(e.target.value as UserRole)}
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Vendedor">Vendedor</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
              )}

              <button type="submit" className="btn btn-warning w-100 fw-bold mt-3 py-2">
                {isRegisterMode ? 'Registrar Cuenta' : 'Ingresar'}
              </button>
            </form>

            {/* Cuentas de Prueba */}
            {!isRegisterMode && (
              <div className="mt-4 pt-3 border-top border-secondary text-center">
                <p className="text-muted small mb-2">Haz clic abajo para autocompletar cuentas de prueba:</p>
                <div className="d-flex justify-content-center gap-2">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-info"
                    onClick={() => fillCredentials('admin@sonidovivo.cl', 'admin123')}
                  >
                    🔑 Admin Demo
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-light"
                    onClick={() => fillCredentials('cliente@sonidovivo.cl', 'user123')}
                  >
                    👤 Cliente Demo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StoreTemplate>
  );
};