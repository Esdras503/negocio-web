import Icon from './Icon';
import { getPrimaryContact } from '../utils/business';

/**
 * Enlace de contacto principal. Usa WhatsApp si está configurado y cae a
 * teléfono, correo o la sección de contacto. Nunca renderiza un enlace vacío.
 */
export default function ContactButton({
  business,
  label,
  className = 'site-btn site-btn--primary',
  showIcon = true,
  onClick,
}) {
  const contact = getPrimaryContact(business);
  const externalProps = contact.external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <a
      className={className}
      href={contact.href}
      onClick={onClick}
      data-contact-type={contact.type}
      {...externalProps}
    >
      {showIcon && <Icon name={contact.icon} size={18} />}
      <span>{label || business?.contact?.whatsappLabel || 'Contactar'}</span>
    </a>
  );
}
