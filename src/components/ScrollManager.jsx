import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restaura el scroll al inicio al cambiar de ruta y respeta los enlaces con
 * ancla (por ejemplo /#demos) cuando se navega desde una demo.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.replace('#', ''));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
