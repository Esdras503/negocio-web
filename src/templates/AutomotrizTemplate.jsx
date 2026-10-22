import { Link } from 'react-router-dom';
import DemoBar from '../components/business/DemoBar';
import Icon from '../components/Icon';
import { useDisclosure } from '../hooks/useDisclosure';
import { buildMapUrl, buildPhoneHref, buildWhatsAppUrl } from '../utils/business';
import { resolveThemeStyles } from '../utils/theme';
import '../styles/automotriz.css';

const NAV_ITEMS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
];

export default function AutomotrizTemplate({ business }) {
  const { isOpen, close, toggle } = useDisclosure();
  const themeStyles = resolveThemeStyles(business.theme);
  const whatsappUrl = buildWhatsAppUrl(business);
  const mapUrl = buildMapUrl(business.contact.mapQuery || business.contact.address);
  const phoneHref = buildPhoneHref(business.contact.phone);
  const { hero, intro, services, specialties, gallery, process, cta, contact, footer } =
    business;

  const serviceMessage = (serviceName) =>
    buildWhatsAppUrl(
      business,
      `Hola, vi el sitio de ${business.name} y quiero consultar por el servicio de ${serviceName}.`,
    );

  return (
    <div className="auto-site" style={themeStyles}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <DemoBar />

      <header className="auto-header">
        <div className="auto-shell auto-header__inner">
          <a className="auto-brand" href="#inicio" aria-label={`${business.name}, inicio`}>
            <span className="auto-brand__mark" aria-hidden="true">
              {business.logo.text}
            </span>
            <span className="auto-brand__text">
              <strong>{business.name}</strong>
              <span>{business.sector}</span>
            </span>
          </a>

          <nav className="auto-nav" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="auto-header__cta" href="#contacto">
            Solicitar diagnóstico
            <Icon name="arrow-up-right" size={16} />
          </a>

          <button
            className="auto-menu-button"
            type="button"
            aria-expanded={isOpen}
            aria-controls="auto-mobile-nav"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={toggle}
          >
            <Icon name={isOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>

        {isOpen && (
          <div className="auto-mobile-nav" id="auto-mobile-nav">
            <nav aria-label="Navegación móvil">
              {NAV_ITEMS.map((item, index) => (
                <a key={item.href} href={item.href} onClick={close}>
                  <span>0{index + 1}</span>
                  {item.label}
                </a>
              ))}
            </nav>
            <a className="auto-btn auto-btn--solid auto-mobile-nav__cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={close}>
              <Icon name="whatsapp" size={18} />
              Escribir al taller
            </a>
          </div>
        )}
      </header>

      <main id="contenido">
        <section className="auto-hero" id="inicio" aria-labelledby="auto-hero-title">
          <img
            className="auto-hero__image"
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            fetchPriority="high"
          />
          <div className="auto-hero__shade" aria-hidden="true" />
          <div className="auto-hero__lines" aria-hidden="true" />
          <div className="auto-shell auto-hero__content">
            <p className="auto-kicker auto-kicker--light">{hero.eyebrow}</p>
            <h1 id="auto-hero-title">
              {hero.title}
              <span>{hero.titleAccent}</span>
            </h1>
            <p className="auto-hero__description">{hero.description}</p>

            <div className="auto-hero__actions">
              <a className="auto-btn auto-btn--solid" href="#contacto">
                {hero.primaryCta.label}
                <Icon name="arrow-right" size={18} />
              </a>
              <a
                className="auto-btn auto-btn--ghost"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={18} />
                Escribir por WhatsApp
              </a>
            </div>

            <ul className="auto-hero__features">
              {hero.features.map((feature) => (
                <li key={feature}>
                  <Icon name="check" size={15} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="auto-hero__rail" aria-hidden="true">
            <span>Diagnóstico</span>
            <span>Mecánica</span>
            <span>Frenos</span>
            <span>Mantenimiento</span>
            <span>Motor</span>
          </div>
        </section>

        <section className="auto-intro" aria-labelledby="auto-intro-title">
          <div className="auto-shell auto-intro__grid">
            <div className="auto-intro__label">
              <span className="auto-index">01</span>
              <p>{intro.eyebrow}</p>
            </div>
            <h2 id="auto-intro-title">{intro.title}</h2>
            <p>{intro.text}</p>
          </div>
        </section>

        <section className="auto-section auto-services" id="servicios" aria-labelledby="auto-services-title">
          <div className="auto-shell">
            <div className="auto-section__head">
              <div>
                <p className="auto-kicker">{services.eyebrow}</p>
                <h2 id="auto-services-title">{services.title}</h2>
              </div>
              <p className="auto-section__lead">{services.description}</p>
            </div>

            <div className="auto-services__grid">
              {services.items.map((service, index) => (
                <article className="auto-service" key={service.id}>
                  <div className="auto-service__top">
                    <span className="auto-service__number">0{index + 1}</span>
                    <span className="auto-service__icon" aria-hidden="true">
                      <Icon name={service.icon} size={24} />
                    </span>
                  </div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <a
                    href={serviceMessage(service.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Consultar por ${service.name} en WhatsApp`}
                  >
                    Consultar servicio
                    <Icon name="arrow-up-right" size={15} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="auto-specialties" id="especialidades" aria-labelledby="auto-specialties-title">
          <div className="auto-shell auto-specialties__grid">
            <figure className="auto-specialties__media">
              <img
                src={specialties.image.src}
                alt={specialties.image.alt}
                width={specialties.image.width}
                height={specialties.image.height}
                loading="lazy"
              />
              <figcaption>
                <span>Bahía de trabajo</span>
                <span>Torque Norte / Santa Ana</span>
              </figcaption>
            </figure>

            <div className="auto-specialties__content">
              <p className="auto-kicker auto-kicker--light">{specialties.eyebrow}</p>
              <h2 id="auto-specialties-title">{specialties.title}</h2>
              <p className="auto-specialties__lead">{specialties.description}</p>
              <ul>
                {specialties.items.map((item, index) => (
                  <li key={item.title}>
                    <span className="auto-specialties__index">0{index + 1}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="auto-section auto-gallery" id="trabajos" aria-labelledby="auto-gallery-title">
          <div className="auto-shell">
            <div className="auto-section__head auto-section__head--wide">
              <div>
                <p className="auto-kicker">{gallery.eyebrow}</p>
                <h2 id="auto-gallery-title">{gallery.title}</h2>
              </div>
              <p className="auto-section__lead">{gallery.description}</p>
            </div>

            <div className="auto-gallery__grid">
              {gallery.images.map((image, index) => (
                <figure className={`auto-gallery__item auto-gallery__item--${index + 1}`} key={image.src}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                  />
                  <figcaption>
                    <span>0{index + 1}</span>
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="auto-process" id="proceso" aria-labelledby="auto-process-title">
          <div className="auto-shell">
            <div className="auto-process__head">
              <p className="auto-kicker">{process.eyebrow}</p>
              <h2 id="auto-process-title">{process.title}</h2>
            </div>
            <ol className="auto-process__list">
              {process.steps.map((step, index) => (
                <li key={step.title}>
                  <span className="auto-process__number">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="auto-cta" aria-labelledby="auto-cta-title">
          <div className="auto-shell auto-cta__inner">
            <div>
              <p className="auto-kicker">{cta.eyebrow}</p>
              <h2 id="auto-cta-title">{cta.title}</h2>
              <p>{cta.description}</p>
            </div>
            <a className="auto-btn auto-btn--solid" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} />
              {cta.buttonLabel}
            </a>
          </div>
        </section>

        <section className="auto-contact" id="contacto" aria-labelledby="auto-contact-title">
          <div className="auto-shell auto-contact__grid">
            <div className="auto-contact__content">
              <p className="auto-kicker auto-kicker--light">Ubicación y horarios</p>
              <h2 id="auto-contact-title">Pasá por el taller o escribinos primero.</h2>
              <p className="auto-contact__lead">
                Coordinamos una cita para revisar tu vehículo y darte un diagnóstico claro.
              </p>

              <dl className="auto-contact__details">
                <div>
                  <dt>
                    <Icon name="pin" size={18} />
                    Dirección
                  </dt>
                  <dd>
                    {contact.address}
                    {contact.addressNote && <span>{contact.addressNote}</span>}
                  </dd>
                </div>
                <div>
                  <dt>
                    <Icon name="clock" size={18} />
                    Horarios
                  </dt>
                  <dd>
                    {contact.hours.map((entry) => (
                      <span className="auto-hours" key={entry.days}>
                        <span>{entry.days}</span>
                        <span>{entry.time}</span>
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="auto-contact__actions">
                <a className="auto-btn auto-btn--solid" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} />
                  {contact.whatsappLabel}
                </a>
                {phoneHref && (
                  <a className="auto-btn auto-btn--ghost" href={phoneHref}>
                    <Icon name="phone" size={18} />
                    Llamar
                  </a>
                )}
              </div>
            </div>

            <div className="auto-contact__aside">
              <div className="auto-contact__map">
                <div className="auto-contact__map-lines" aria-hidden="true" />
                <Icon name="pin" size={32} />
                <strong>{business.location}</strong>
                <span>Zona de demostración</span>
                {mapUrl && (
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                    Ver en Google Maps
                    <Icon name="arrow-up-right" size={14} />
                  </a>
                )}
              </div>
              <p className="auto-contact__note">{contact.note}</p>
              <div className="auto-contact__phone">
                <span>Llamadas de demostración</span>
                {phoneHref ? <a href={phoneHref}>{contact.phone}</a> : <strong>{contact.phone}</strong>}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="auto-footer">
        <div className="auto-shell auto-footer__top">
          <div className="auto-footer__brand">
            <span className="auto-brand__mark" aria-hidden="true">
              {business.logo.text}
            </span>
            <div>
              <strong>{business.name}</strong>
              <p>{footer.tagline}</p>
            </div>
          </div>
          <nav aria-label="Navegación del pie de página">
            {NAV_ITEMS.slice(0, 4).map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <Link to="/">Volver al catálogo</Link>
          </nav>
        </div>
        <div className="auto-shell auto-footer__bottom">
          <p>
            Sitio web de demostración creado por <Link to="/">Nexobyte</Link>. Los datos,
            nombres y precios mostrados son ilustrativos.
          </p>
          <span>© {new Date().getFullYear()} Torque Norte · Demo</span>
        </div>
      </footer>
    </div>
  );
}
