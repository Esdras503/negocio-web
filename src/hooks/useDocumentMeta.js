import { useEffect } from 'react';

function setMeta(attribute, key, content) {
  if (!content) return;

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Mantiene el título y los metadatos básicos sincronizados con cada página.
 * Las demos se marcan como no indexables para que no compitan con los sitios
 * publicados de los clientes.
 */
export function useDocumentMeta({ title, description, robots = 'index,follow' }) {
  useEffect(() => {
    if (title) document.title = title;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
  }, [title, description, robots]);
}
