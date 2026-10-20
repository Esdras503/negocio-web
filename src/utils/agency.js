import { normalizePhone } from './business';

/**
 * Enlace de WhatsApp del estudio. Devuelve null si no hay un número válido
 * para evitar publicar botones que no lleven a ninguna parte.
 */
export function buildAgencyWhatsAppUrl(agency, message) {
  const number = normalizePhone(agency?.whatsapp);
  if (!number) return null;

  const text =
    message ||
    agency?.whatsappMessage ||
    'Hola, quiero información sobre una página web para mi negocio.';

  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
