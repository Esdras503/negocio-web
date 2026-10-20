import { useCallback, useEffect, useState } from 'react';

/**
 * Estado compartido para menús móviles accesibles: alterna con el botón,
 * cierra con Escape y expone una función para cerrar al elegir un enlace.
 */
export function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((open) => !open), []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return { isOpen, close, toggle };
}
