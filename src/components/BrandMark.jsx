import { getInitials } from '../utils/business';

/**
 * Monograma o logotipo del negocio. El monograma de texto se oculta a lectores
 * de pantalla porque el nombre visible aparece al lado; las imágenes reciben
 * su propio texto alternativo mediante `imageAlt`.
 */
export default function BrandMark({
  name = '',
  text,
  image,
  imageAlt = '',
  imageWidth = 48,
  imageHeight = 48,
  className = '',
}) {
  const mark = text?.trim() || getInitials(name).toUpperCase();

  return (
    <span
      className={`brand-mark ${className}`.trim()}
      aria-hidden={image ? undefined : 'true'}
    >
      {image ? (
        <img
          src={image}
          alt={imageAlt}
          width={imageWidth}
          height={imageHeight}
        />
      ) : (
        mark
      )}
    </span>
  );
}
