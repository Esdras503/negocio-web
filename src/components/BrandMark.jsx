import { getInitials } from '../utils/business';

/**
 * Monograma o logotipo del negocio. El nombre siempre se muestra al lado,
 * por eso la marca se oculta a lectores de pantalla y no duplica el texto.
 */
export default function BrandMark({ name = '', text, image, className = '' }) {
  const mark = text?.trim() || getInitials(name).toUpperCase();

  return (
    <span className={`brand-mark ${className}`.trim()} aria-hidden="true">
      {image ? <img src={image} alt="" width="48" height="48" /> : mark}
    </span>
  );
}
