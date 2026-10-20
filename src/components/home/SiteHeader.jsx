import BrandMark from '../BrandMark';
import Icon from '../Icon';
import { agency } from '../../data/agency';
import { useDisclosure } from '../../hooks/useDisclosure';
import { buildAgencyWhatsAppUrl } from '../../utils/agency';

const navigation = [
  { href: '#demos', label: 'Demos' },
  { href: '#proceso', label: 'Proceso' },
  { href: '#plantilla', label: 'La plantilla' },
];

export default function SiteHeader() {
  const { isOpen, close, toggle } = useDisclosure();
  const whatsappHref = buildAgencyWhatsAppUrl(agency);

  return (
    <header className="studio-header">
      <div className="studio-container studio-header__inner">
        <a className="studio-brand" href="#inicio" onClick={close}>
          <BrandMark
            name={agency.name}
            image={agency.logo.src}
            imageAlt={agency.logo.alt}
            imageWidth={agency.logo.width}
            imageHeight={agency.logo.height}
            className="brand-mark--studio brand-mark--logo"
          />
          <span className="studio-brand__text">
            <strong>{agency.name}</strong>
            <small>Estudio web</small>
          </span>
        </a>

        <nav className="studio-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="studio-header__actions">
          <a
            className="studio-button studio-button--small studio-button--ghost"
            href="#demos"
          >
            Ver demos
            <Icon name="arrow-right" size={16} />
          </a>

          {whatsappHref && (
            <a
              className="studio-button studio-button--small"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={16} />
              WhatsApp
            </a>
          )}

          <button
            className="studio-menu-button"
            type="button"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="studio-mobile-nav"
            onClick={toggle}
          >
            <Icon name={isOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <nav
        id="studio-mobile-nav"
        className="studio-mobile-nav"
        aria-label="Navegación móvil"
        hidden={!isOpen}
      >
        {navigation.map((item) => (
          <a key={item.href} href={item.href} onClick={close}>
            {item.label}
            <Icon name="arrow-up-right" size={16} />
          </a>
        ))}
        {whatsappHref ? (
          <a
            className="studio-mobile-nav__cta"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            <Icon name="whatsapp" size={17} />
            Hablemos por WhatsApp
          </a>
        ) : (
          <a className="studio-mobile-nav__cta" href="#demos" onClick={close}>
            Ver las demostraciones
            <Icon name="arrow-right" size={16} />
          </a>
        )}
      </nav>
    </header>
  );
}
