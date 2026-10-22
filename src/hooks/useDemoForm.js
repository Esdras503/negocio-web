import { useState } from 'react';

/**
 * Estado local para formularios de demostración.
 *
 * No envía datos a ningún servidor: valida en el navegador y muestra una
 * confirmación. Cada plantilla decide qué campos y qué validación necesita.
 */
export function useDemoForm({ initialValues, validate }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
    if (status === 'success') setStatus('idle');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setStatus(Object.keys(nextErrors).length > 0 ? 'error' : 'success');
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStatus('idle');
  };

  return {
    values,
    errors,
    status,
    handleChange,
    handleSubmit,
    reset,
    setValues,
  };
}
