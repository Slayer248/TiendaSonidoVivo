import React from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  placeholder?: string;
  error?: string;
}

// Átomo: Menú desplegable para listas dinámicas (Regiones, Comunas, Categorías, Roles)
export const Select: React.FC<SelectProps> = ({ label, options, placeholder, error, className = '', id, ...props }) => {
  return (
    <div className="mb-3">
      {label && <label htmlFor={id} className="form-label fw-semibold">{label}</label>}
      <select id={id} className={`form-select ${error ? 'is-invalid' : ''} ${className}`} {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};