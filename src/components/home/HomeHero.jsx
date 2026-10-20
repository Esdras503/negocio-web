import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { agency } from '../../data/agency';
import { demoBusinesses } from '../../data/demoBusinesses';
import { buildAgencyWhatsAppUrl } from '../../utils/agency';
import { getContrastColor } from '../../utils/theme';

function DemoPreview({ business, className = '' }) {
  return (
    <Link
      to={`/demo/${business.id}`}
      className={`hero-mosaic__tile ${className}`.trim()}
    >
      <img src={business.hero.image.src} alt="" aria-hidden="true" />
      <span className="hero-mosaic__shade" aria-hidden="true" />
      <span
        className="hero-mosaic__logo"
        style={{
          backgroundColor: business.theme.primary,
          color: getContrastColor(business.theme.primary),
        }}
        aria-hidden="true"
      >
        {business.logo.text}
      </span>
      <span className="hero-mosaic__caption">
        <span className="hero-mosaic__sector">{business.sector}</span>
        <strong>{business.name}</strong>
        <span className="hero-mosaic__link">
          Ver demo
          <Icon name="arrow-up-right" size={14} />
        </span>
      </span>
    </Link>
  );
}

export default function HomeHero() {
  const [featured, second, third] = demoBusinesses;
  const whatsappHref = buildAgencyWhatsAppUrl(agency);

  return (
    <section className="studio-hero" id="inicio">
      <div className="studio-container studio-hero__inner">
        <div className="studio-hero__content">
          <span className="studio-eyebrow">
            <span className="studio-eyebrow__dot" aria-hidden="true" />
            Estudio web · Santa Ana, El Salvador
          </span>

          <h1>
            Tu negocio merece un sitio que se sienta <em>hecho para ti.</em>
          </h1>

          <p className="studio-hero__lead">
            Diseñamos páginas web para negocios de El Salvador. Una base
            profesional, adaptada a tu identidad, tus servicios y tu forma de
            atender.
          </p>

          <div className="studio-hero__actions">
            {whatsappHref && (
              <a
                className="studio-button"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={18} />
                Hablemos por WhatsApp
              </a>
            )}
            <a className="studio-button studio-button--ghost" href="#demos">
              Explorar las demos
              <Icon name="arrow-right" size={18} />
            </a>
          </div>

          <ul className="studio-hero__trust" aria-label="Características del proyecto">
            <li>
              <Icon name="check" size={16} />
              Diseño adaptable
            </li>
            <li>
              <Icon name="check" size={16} />
              WhatsApp integrado
            </li>
            <li>
              <Icon name="check" size={16} />
              Contenido por negocio
            </li>
          </ul>
        </div>

        <div className="studio-hero__visual">
          <div className="hero-mosaic">
            <DemoPreview business={featured} className="hero-mosaic__tile--main" />
            <DemoPreview business={second} className="hero-mosaic__tile--top" />
            <DemoPreview business={third} className="hero-mosaic__tile--bottom" />
          </div>

          <div className="studio-hero__badge">
            <span className="studio-hero__badge-mark" aria-hidden="true">
              <Icon name="sparkles" size={17} />
            </span>
            <span>
              <strong>Una base, tres identidades</strong>
              <small>Explora cada propuesta</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
