import { useState } from 'react';
import { Link } from 'react-router-dom';
import BrandMark from '../components/BrandMark';
import ContactButton from '../components/ContactButton';
import DemoBar from '../components/business/DemoBar';
import Icon from '../components/Icon';
import { agency } from '../data/agency';
import { useDisclosure } from '../hooks/useDisclosure';
import {
  buildMapUrl,
  buildPhoneHref,
  buildWhatsAppUrl,
} from '../utils/business';
import { resolveThemeStyles } from '../utils/theme';
import '../styles/cafe.css';

export default function CafeTemplate({ business, mode = 'demo' }) {
  const {
    hero,
    about,
    services,
    experience,
    gallery,
    cta,
    contact,
    footer,
    location,
  } = business;
  const { isOpen, close, toggle } = useDisclosure();
  const themeStyles = resolveThemeStyles(business.theme);
  const mapUrl = buildMapUrl(contact.mapQuery || contact.address);
  const phoneHref = buildPhoneHref(contact.phone);
  const whatsappUrl = buildWhatsAppUrl(business);
  const year = new Date().getFullYear();

  const [activeCategory, setActiveCategory] = useState(
    () => services.categories[0]?.id ?? '',
  );

  const activeCategoryData =
    services.categories.find((category) => category.id === activeCategory) ??
    services.categories[0];
  const visibleItems = activeCategoryData
    ? services.items.filter((item) => item.category === activeCategoryData.id)
    : services.items;

  const preferredFeatures = ['cappuccino', 'espresso', 'dona-chocolate'];
  const featuredItems = preferredFeatures
    .map((id) => services.items.find((item) => item.id === id && item.image))
    .filter(Boolean);
  const fallbackFeatures = services.items.filter((item) => item.image).slice(0, 3);
  const featuresToShow =
    featuredItems.length >= 2 ? featuredItems : fallbackFeatures;

  const galleryDetail =
    gallery.images.find((image) => image.src.includes('beans')) ?? gallery.images[0];
  const contactImage = contact.image ?? gallery.images[0];

  const nav = [
    { label: business.nav.about, href: '#nosotros' },
    { label: business.nav.services, href: '#servicios' },
    { label: business.nav.gallery, href: '#galeria' },
    { label: business.nav.contact, href: '#contacto' },
  ];

  return (
    <div className="cafe-site" style={themeStyles}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      {mode === 'demo' && <DemoBar />}

      <header className="cafe-header">
        <div className="cafe-container cafe-header__inner">
          <a className="cafe-brand" href="#inicio" onClick={close}>
            <BrandMark
              name={business.name}
              text={business.logo.text}
              image={business.logo.image}
              imageAlt={business.logo.imageAlt}
              className="cafe-brand__mark"
            />
            <span className="cafe-brand__text">
              <strong>{business.name}</strong>
              <small>{business.sector}</small>
            </span>
          </a>

          <nav className="cafe-nav" aria-label="Navegación principal">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="cafe-header__actions">
            <a
              className="cafe-header__cta"
              href={whatsappUrl || '#contacto'}
              {...(whatsappUrl
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {contact.whatsappLabel}
              <Icon name="arrow-right" size={15} />
            </a>

            <button
              className="cafe-menu-button"
              type="button"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="cafe-mobile-nav"
              onClick={toggle}
            >
              <Icon name={isOpen ? 'close' : 'menu'} size={21} />
            </button>
          </div>
        </div>

        <nav
          id="cafe-mobile-nav"
          className="cafe-mobile-nav"
          aria-label="Navegación móvil"
          hidden={!isOpen}
        >
          {nav.map((item, index) => (
            <a key={item.href} href={item.href} onClick={close}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </a>
          ))}
          <ContactButton
            business={business}
            label={contact.whatsappLabel}
            className="cafe-btn cafe-btn--dark cafe-mobile-nav__cta"
            onClick={close}
          />
        </nav>
      </header>

      <main id="contenido">
        <section id="inicio" className="cafe-hero">
          <img
            className="cafe-hero__image"
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <span className="cafe-hero__shade" aria-hidden="true" />
          <span className="cafe-hero__rail" aria-hidden="true">
            Café de especialidad · {location}
          </span>

          <div className="cafe-container cafe-hero__inner">
            <span className="cafe-eyebrow cafe-eyebrow--light">{hero.eyebrow}</span>
            <h1>
              {hero.title}
              <em>{hero.titleAccent}</em>
            </h1>
            <p className="cafe-hero__lead">{hero.description}</p>

            <div className="cafe-hero__actions">
              <ContactButton
                business={business}
                label={hero.primaryCta.label}
                className="cafe-btn cafe-btn--cream"
              />
              <a className="cafe-text-link cafe-text-link--light" href="#servicios">
                {hero.secondaryCta.label}
                <Icon name="arrow-right" size={16} />
              </a>
            </div>

            <ul className="cafe-hero__features">
              {hero.features.map((feature, index) => (
                <li key={feature}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <span className="cafe-hero__place">
            <Icon name="pin" size={14} />
            {location}
          </span>
        </section>

        <section id="nosotros" className="cafe-story">
          <div className="cafe-container cafe-story__grid">
            <div className="cafe-story__content">
              <span className="cafe-section-label">
                <b>01</b>
                {about.eyebrow}
              </span>
              <h2>{about.title}</h2>

              <div className="cafe-story__paragraphs">
                {about.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <blockquote className="cafe-story__quote">
                <span aria-hidden="true">“</span>
                {about.quote}
                {about.quoteAuthor && <cite>{about.quoteAuthor}</cite>}
              </blockquote>

              {about.stats?.length > 0 && (
                <dl className="cafe-stats">
                  {about.stats.map((stat) => (
                    <div key={stat.label}>
                      <dt>{stat.value}</dt>
                      <dd>{stat.label}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className="cafe-story__visual">
              <figure className="cafe-story__image">
                <img
                  src={about.image.src}
                  alt={about.image.alt}
                  width={about.image.width}
                  height={about.image.height}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              {galleryDetail && (
                <figure className="cafe-story__detail">
                  <img
                    src={galleryDetail.src}
                    alt={galleryDetail.alt}
                    width={galleryDetail.width}
                    height={galleryDetail.height}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              )}
              <span className="cafe-story__caption">La barra · Santa Ana</span>
            </div>
          </div>
        </section>

        <section className="cafe-features">
          <div className="cafe-container">
            <div className="cafe-features__head">
              <div>
                <span className="cafe-section-label">
                  <b>02</b>
                  La selección de la casa
                </span>
                <h2>Tres favoritos para empezar.</h2>
              </div>
              <p>
                Una pequeña muestra de lo que sale de la barra y del horno cada
                día. La carta completa cambia con la temporada.
              </p>
            </div>

            <div className="cafe-features__grid">
              {featuresToShow.map((item, index) => (
                <article
                  className={`cafe-feature ${
                    index === 0 ? 'cafe-feature--lead' : 'cafe-feature--row'
                  }`}
                  key={item.id}
                >
                  <figure className="cafe-feature__media">
                    <img
                      src={item.image.src}
                      alt={item.image.alt}
                      width={item.image.width}
                      height={item.image.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <div className="cafe-feature__body">
                    <span className="cafe-feature__index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="cafe-feature__title">
                      <h3>{item.name}</h3>
                      <span>{item.price}</span>
                    </div>
                    <p>{item.description}</p>
                    {item.tag && <span className="cafe-feature__tag">{item.tag}</span>}
                  </div>
                </article>
              ))}
            </div>

            <a className="cafe-text-link cafe-features__link" href="#servicios">
              Ver la carta completa
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </section>

        <section id="servicios" className="cafe-menu">
          <div className="cafe-container">
            <div className="cafe-menu__head">
              <div>
                <span className="cafe-section-label">
                  <b>03</b>
                  {services.eyebrow}
                </span>
                <h2>{services.title}</h2>
              </div>
              <p>{services.description}</p>
            </div>

            <div className="cafe-menu__layout">
              <div className="cafe-menu__nav">
                <span className="cafe-menu__nav-label">Elegí una categoría</span>
                {services.categories.map((category) => {
                  const count = services.items.filter(
                    (item) => item.category === category.id,
                  ).length;

                  return (
                    <button
                      key={category.id}
                      className={`cafe-menu__tab ${
                        category.id === activeCategoryData?.id ? 'is-active' : ''
                      }`}
                      type="button"
                      aria-pressed={category.id === activeCategoryData?.id}
                      aria-controls="cafe-menu-panel"
                      onClick={() => setActiveCategory(category.id)}
                    >
                      <span>{category.label}</span>
                      <small>
                        {count} {count === 1 ? 'opción' : 'opciones'}
                      </small>
                    </button>
                  );
                })}

                {services.note && (
                  <p className="cafe-menu__nav-note">{services.note}</p>
                )}
              </div>

              <div
                className="cafe-menu__panel"
                id="cafe-menu-panel"
                aria-live="polite"
              >
                {activeCategoryData && (
                  <div className="cafe-menu__panel-head">
                    <h3>{activeCategoryData.label}</h3>
                    <p>{activeCategoryData.description}</p>
                  </div>
                )}

                <ul className="cafe-menu__list">
                  {visibleItems.map((item) => (
                    <li key={item.id}>
                      <div className="cafe-menu__item">
                        <div className="cafe-menu__item-name">
                          <h4>{item.name}</h4>
                          {item.tag && <span>{item.tag}</span>}
                        </div>
                        <p>{item.description}</p>
                      </div>
                      <span className="cafe-menu__price">{item.price}</span>
                    </li>
                  ))}
                </ul>

                {services.note && (
                  <p className="cafe-menu__note">{services.note}</p>
                )}
              </div>
            </div>
          </div>
        </section>

        {experience && (
          <section className="cafe-experience">
            <div className="cafe-container cafe-experience__grid">
              <div className="cafe-experience__intro">
                <span className="cafe-section-label cafe-section-label--light">
                  <b>04</b>
                  {experience.eyebrow}
                </span>
                <blockquote>
                  <span aria-hidden="true">“</span>
                  {experience.quote}
                </blockquote>
              </div>

              <div className="cafe-experience__content">
                <h2>{experience.title}</h2>
                <p>{experience.description}</p>

                <ol>
                  {experience.points.map((point, index) => (
                    <li key={point.title}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h3>{point.title}</h3>
                        <p>{point.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        )}

        <section id="galeria" className="cafe-gallery">
          <div className="cafe-container">
            <div className="cafe-gallery__head">
              <div>
                <span className="cafe-section-label">
                  <b>05</b>
                  {gallery.eyebrow}
                </span>
                <h2>{gallery.title}</h2>
              </div>
              <p>{gallery.description}</p>
            </div>

            <div className="cafe-gallery__grid">
              {gallery.images.map((image, index) => (
                <figure
                  className={`cafe-gallery__item cafe-gallery__item--${index + 1}`}
                  key={image.src}
                >
                  <div className="cafe-gallery__frame">
                    <img
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {image.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="cafe-visit">
          <div className="cafe-container">
            <div className="cafe-visit__head">
              <span className="cafe-section-label">
                <b>06</b>
                {contact.eyebrow}
              </span>
              <h2>{contact.title}</h2>
              <p>{contact.description}</p>
            </div>

            <div className="cafe-visit__grid">
              <div className="cafe-visit__content">
                <div className="cafe-visit__details">
                  <div className="cafe-visit__row">
                    <span className="cafe-visit__row-label">Dirección</span>
                    {mapUrl ? (
                      <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                        {contact.address}
                        <Icon name="arrow-up-right" size={15} />
                      </a>
                    ) : (
                      <span>{contact.address}</span>
                    )}
                    {contact.addressNote && (
                      <small>{contact.addressNote}</small>
                    )}
                  </div>

                  {phoneHref && (
                    <div className="cafe-visit__row">
                      <span className="cafe-visit__row-label">Teléfono</span>
                      <a href={phoneHref}>{contact.phone}</a>
                    </div>
                  )}

                  <div className="cafe-visit__row">
                    <span className="cafe-visit__row-label">Horario</span>
                    <dl className="cafe-hours">
                      {contact.hours.map((entry) => (
                        <div key={`${entry.days}-${entry.time}`}>
                          <dt>{entry.days}</dt>
                          <dd>{entry.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <ContactButton
                  business={business}
                  label={contact.whatsappLabel}
                  className="cafe-btn cafe-btn--dark cafe-visit__cta"
                />

                {contact.note && <p className="cafe-note">{contact.note}</p>}
              </div>

              {contactImage && (
                <figure className="cafe-visit__image">
                  <img
                    src={contactImage.src}
                    alt={contactImage.alt}
                    width={contactImage.width}
                    height={contactImage.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>La barra · {location}</figcaption>
                </figure>
              )}
            </div>
          </div>
        </section>

        <section className="cafe-cta">
          <img
            className="cafe-cta__image"
            src={cta.image.src}
            alt={cta.image.alt}
            width={cta.image.width}
            height={cta.image.height}
            loading="lazy"
            decoding="async"
          />
          <span className="cafe-cta__overlay" aria-hidden="true" />
          <div className="cafe-container cafe-cta__inner">
            <span className="cafe-section-label cafe-section-label--light">
              <b>07</b>
              {cta.eyebrow}
            </span>
            <h2>{cta.title}</h2>
            <p>{cta.description}</p>
            <ContactButton
              business={business}
              label={cta.buttonLabel}
              className="cafe-btn cafe-btn--cream"
            />
          </div>
        </section>
      </main>

      <footer className="cafe-footer">
        <div className="cafe-container">
          <div className="cafe-footer__top">
            <div className="cafe-footer__brand">
              <a className="cafe-footer__wordmark" href="#inicio">
                {business.name}
              </a>
              <p>{footer.tagline}</p>
              <span>
                <Icon name="pin" size={15} />
                {location}
              </span>
            </div>

            <nav className="cafe-footer__nav" aria-label="Navegación del pie de página">
              <span className="cafe-footer__label">Explorar</span>
              {nav.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="cafe-footer__contact">
              <span className="cafe-footer__label">Contacto</span>
              {whatsappUrl && (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={15} />
                  WhatsApp
                </a>
              )}
              {phoneHref && (
                <a href={phoneHref}>
                  <Icon name="phone" size={15} />
                  {contact.phone}
                </a>
              )}
              {mapUrl && (
                <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="pin" size={15} />
                  {contact.address}
                </a>
              )}
            </div>

            <div className="cafe-footer__hours">
              <span className="cafe-footer__label">Horario</span>
              {contact.hours.map((entry) => (
                <p key={`${entry.days}-${entry.time}`}>
                  <span>{entry.days}</span>
                  {entry.time}
                </p>
              ))}
            </div>
          </div>

          <div className="cafe-footer__bottom">
            <span>
              © {year} {business.name}.
            </span>
            <span className="cafe-footer__credit">
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
    </div>
  );
}
