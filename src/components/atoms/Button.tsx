import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline-light' | 'outline-danger' | 'outline-primary' | 'outline-secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: string;
}

// Átomo: Botón estilizado reutilizable con soporte para íconos de Bootstrap
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  className = '',
  ...props
}) => {
  const sizeClass = size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : '';

  return (
    <button className={`btn btn-${variant} ${sizeClass} ${className}`} {...props}>
      {icon && <i className={`bi bi-${icon} me-1`}></i>}
      {children}
    </button>
  );
};