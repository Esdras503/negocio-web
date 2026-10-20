import { Link } from 'react-router-dom';
import BrandMark from '../BrandMark';
import Icon from '../Icon';
import { agency } from '../../data/agency';
import {
  buildMapUrl,
  buildPhoneHref,
  buildWhatsAppUrl,
  getNavigation,
} from '../../utils/business';

export default function BusinessFooter({ business, mode }) {
  const { contact, footer, location } = business;
  const mapUrl = buildMapUrl(contact.mapQuery || contact.address);
  const phoneHref = buildPhoneHref(contact.phone);
  const whatsappUrl = buildWhatsAppUrl(business);
  const navigation = getNavigation(business);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="business-container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <a className="site-brand site-brand--footer" href="#inicio">
              <BrandMark
                name={business.name}
                text={business.logo.text}
                image={business.logo.image}
                className="brand-mark--business"
              />
              <span className="site-brand__text">
                <strong>{business.name}</strong>
                <small>{business.sector}</small>
              </span>
            </a>
            <p>{footer.tagline}</p>
            <span className="site-footer__location">
              <Icon name="pin" size={16} />
              {location}
            </span>
          </div>

          <nav className="site-footer__nav" aria-label="Navegación del pie de página">
            <span className="site-footer__title">Explorar</span>
            {navigation.map((item) => (
              <a key={item.key} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="site-footer__contact">
            <span className="site-footer__title">Contacto</span>

            {mapUrl ? (
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="pin" size={16} />
                {contact.address}
              </a>
            ) : (
              <span className="site-footer__row">
                <Icon name="pin" size={16} />
                {contact.address}
              </span>
            )}

            {phoneHref && (
              <a href={phoneHref}>
                <Icon name="phone" size={16} />
                {contact.phone}
              </a>
            )}

            {whatsappUrl && (
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={16} />
                WhatsApp
              </a>
            )}

            {contact.email && (
              <a href={`mailto:${contact.email}`}>
                <Icon name="mail" size={16} />
                {contact.email}
              </a>
            )}
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>
            © {year} {business.name}. Todos los derechos reservados.
          </span>
          <span className="site-footer__credit">
            {mode === 'demo' ? (
              <>
                Demostración conceptual · Datos ficticios ·{' '}
                <Link to="/">Creada por {agency.name}</Link>
              </>
            ) : (
              <>
                Sitio creado por <Link to="/">{agency.name}</Link>
              </>
            )}
          </span>
        </div>
      </div>
    </footer>
  );
}
