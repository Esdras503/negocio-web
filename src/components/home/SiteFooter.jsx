import BrandMark from '../BrandMark';
import Icon from '../Icon';
import { agency } from '../../data/agency';
import { buildAgencyWhatsAppUrl } from '../../utils/agency';

export default function SiteFooter() {
  const whatsappHref = buildAgencyWhatsAppUrl(agency);

  return (
    <footer className="studio-footer">
      <div className="studio-container">
        <div className="studio-footer__grid">
          <div className="studio-footer__brand">
            <a className="studio-brand studio-brand--footer" href="#inicio">
              <BrandMark
                name={agency.name}
                image={agency.logo.src}
                imageAlt={agency.logo.alt}
                imageWidth={agency.logo.width}
                imageHeight={agency.logo.height}
                className="brand-mark--studio brand-mark--logo brand-mark--logo-footer"
              />
              <span className="studio-brand__text">
                <strong>{agency.name}</strong>
                <small>Estudio web</small>
              </span>
            </a>
            <p>{agency.tagline}</p>
            <span className="studio-footer__location">
              <Icon name="pin" size={16} />
              {agency.location}
            </span>
          </div>

          <nav className="studio-footer__nav" aria-label="Navegación del pie de página">
            <span className="studio-footer__title">Explorar</span>
            <a href="#demos">Demostraciones</a>
            <a href="#proceso">Proceso</a>
            <a href="#plantilla">La plantilla</a>
          </nav>

          <div className="studio-footer__contact">
            <span className="studio-footer__title">Contacto</span>
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={16} />
                WhatsApp · {agency.whatsapp}
              </a>
            )}
            {agency.email && (
              <a href={`mailto:${agency.email}`}>
                <Icon name="mail" size={16} />
                {agency.email}
              </a>
            )}
            {!whatsappHref && !agency.email && (
              <p className="studio-footer__pending">
                Los canales de contacto se habilitarán antes de publicar el
                sitio del estudio.
              </p>
            )}
          </div>
        </div>

        <div className="studio-footer__bottom">
          <span>
            © {new Date().getFullYear()} {agency.name}. Hecho en Santa Ana, El
            Salvador.
          </span>
          <span>Demostraciones conceptuales · Datos ficticios</span>
        </div>
      </div>
    </footer>
  );
}
