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
import '../styles/pupuseria.css';

function MenuPrice({ children }) {
  return <span className="pup-dish__price">{children}</span>;
}

export default function PupuseriaTemplate({ business, mode = 'demo' }) {
  const {
    hero,
    about,
    services,
    orderSteps,
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

  const pupusas = services.items.filter((item) => item.category === 'pupusas');
  const sides = services.items.filter((item) => item.category === 'acompanamientos');
  const drinks = services.items.filter((item) => item.category === 'bebidas');
  const sidesCategory = services.categories.find((category) => category.id === 'acompanamientos');
  const drinksCategory = services.categories.find((category) => category.id === 'bebidas');

  const nav = [
    { label: business.nav.services, href: '#servicios' },
    { label: business.nav.about, href: '#nosotros' },
    { label: business.nav.gallery, href: '#galeria' },
    { label: business.nav.contact, href: '#contacto' },
  ];

  const heroSmallImage = gallery.images[3] ?? gallery.images[0];
  const menuImage = gallery.images[0];
  const sideImage = gallery.images[1] ?? gallery.images[0];

  return (
    <div className="pup-site" style={themeStyles}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      {mode === 'demo' && <DemoBar />}

      <div className="pup-topline">
        <div className="pup-container pup-topline__inner">
          <span className="pup-topline__place">
            <Icon name="pin" size={14} />
            {location}
          </span>
          <span className="pup-topline__middle">
            Masa hecha a mano · Cocina de casa · Pedidos por WhatsApp
          </span>
          <a
            className="pup-topline__link"
            href={whatsappUrl || '#contacto'}
            {...(whatsappUrl ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            Pedir ahora
            <Icon name="arrow-up-right" size={13} />
          </a>
        </div>
      </div>

      <header className="pup-header">
        <div className="pup-container pup-header__inner">
          <a className="pup-brand" href="#inicio" onClick={close}>
            <BrandMark
              name={business.name}
              text={business.logo.text}
              image={business.logo.image}
              imageAlt={business.logo.imageAlt}
              className="pup-brand__mark"
            />
            <span className="pup-brand__text">
              <strong>{business.name}</strong>
              <small>{business.sector}</small>
            </span>
          </a>

          <nav className="pup-nav" aria-label="Navegación principal">
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="pup-header__actions">
            <ContactButton
              business={business}
              label={contact.whatsappLabel}
              className="pup-btn pup-btn--primary pup-header__cta"
            />
            <button
              className="pup-menu-button"
              type="button"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="pup-mobile-nav"
              onClick={toggle}
            >
              <Icon name={isOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>

        <nav
          id="pup-mobile-nav"
          className="pup-mobile-nav"
          aria-label="Navegación móvil"
          hidden={!isOpen}
        >
          {nav.map((item, index) => (
            <a key={item.href} href={item.href} onClick={close}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
              <Icon name="arrow-right" size={17} />
            </a>
          ))}
          <ContactButton
            business={business}
            label={contact.whatsappLabel}
            className="pup-btn pup-btn--primary pup-mobile-nav__cta"
            onClick={close}
          />
        </nav>
      </header>

      <main id="contenido">
        <section id="inicio" className="pup-hero">
          <div className="pup-container pup-hero__grid">
            <div className="pup-hero__copy">
              <span className="pup-kicker">{hero.eyebrow}</span>
              <h1>
                {hero.title}
                <em>{hero.titleAccent}</em>
              </h1>
              <p className="pup-hero__lead">{hero.description}</p>

              <div className="pup-hero__actions">
                <ContactButton
                  business={business}
                  label={hero.primaryCta.label}
                  className="pup-btn pup-btn--primary pup-btn--large"
                />
                <a className="pup-btn pup-btn--outline pup-btn--large" href="#servicios">
                  {hero.secondaryCta.label}
                  <Icon name="arrow-right" size={17} />
                </a>
              </div>

              <ul className="pup-hero__features">
                {hero.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={14} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pup-hero__visual">
              <span className="pup-hero__sun" aria-hidden="true" />
              <span className="pup-hero__ring" aria-hidden="true" />

              <figure className="pup-hero__photo">
                <img
                  src={hero.image.src}
                  alt={hero.image.alt}
                  width={hero.image.width}
                  height={hero.image.height}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </figure>

              <span className="pup-hero__stamp" aria-hidden="true">
                <b>100%</b>
                hecho a mano
              </span>

              {heroSmallImage && (
                <figure className="pup-hero__small">
                  <img
                    src={heroSmallImage.src}
                    alt={heroSmallImage.alt}
                    width={heroSmallImage.width}
                    height={heroSmallImage.height}
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              )}

              <div className="pup-hero__order">
                <span className="pup-hero__order-label">Hoy en el comal</span>
                <strong>Pupusas de queso y chicharrón</strong>
                <a href="#servicios">
                  Ver el menú
                  <Icon name="arrow-right" size={15} />
                </a>
              </div>
            </div>
          </div>

          <div className="pup-strip" aria-hidden="true">
            <div className="pup-strip__track">
              {[0, 1, 2, 3].map((group) => (
                <span className="pup-strip__group" key={group}>
                  <b>Maíz de la casa</b>
                  <i>✦</i>
                  <b>Curtido fermentado</b>
                  <i>✦</i>
                  <b>Hecho al momento</b>
                  <i>✦</i>
                  <b>Recetas de familia</b>
                  <i>✦</i>
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="servicios" className="pup-menu">
          <div className="pup-container">
            <div className="pup-section-head">
              <div>
                <span className="pup-kicker">{services.eyebrow}</span>
                <h2>{services.title}</h2>
              </div>
              <div className="pup-section-head__aside">
                <p>{services.description}</p>
                <a className="pup-inline-link" href="#contacto">
                  Hacer un pedido
                  <Icon name="arrow-up-right" size={15} />
                </a>
              </div>
            </div>

            <div className="pup-menu__layout">
              <aside className="pup-menu__aside">
                {menuImage && (
                  <figure className="pup-menu__photo">
                    <img
                      src={menuImage.src}
                      alt={menuImage.alt}
                      width={menuImage.width}
                      height={menuImage.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption>{menuImage.caption}</figcaption>
                  </figure>
                )}
                <div className="pup-menu__aside-note">
                  <Icon name="flame" size={20} />
                  <p>{about.quote}</p>
                </div>
              </aside>

              <div className="pup-menu__body">
                <div className="pup-menu__title">
                  <h3>Las pupusas</h3>
                  <span>Cada orden lleva dos unidades</span>
                </div>

                <ul className="pup-dishes">
                  {pupusas.map((item, index) => (
                    <li className="pup-dish" key={item.id}>
                      <span className="pup-dish__number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="pup-dish__content">
                        <div className="pup-dish__name">
                          <h4>{item.name}</h4>
                          {item.tag && <span className="pup-dish__tag">{item.tag}</span>}
                        </div>
                        <p>{item.description}</p>
                      </div>
                      <MenuPrice>{item.price}</MenuPrice>
                    </li>
                  ))}
                </ul>

                {services.note && <p className="pup-note">{services.note}</p>}
              </div>
            </div>
          </div>
        </section>

        <section className="pup-sides">
          <div className="pup-container pup-sides__grid">
            {sideImage && (
              <figure className="pup-sides__photo">
                <img
                  src={sideImage.src}
                  alt={sideImage.alt}
                  width={sideImage.width}
                  height={sideImage.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{sideImage.caption}</figcaption>
              </figure>
            )}

            <div className="pup-sides__content">
              <span className="pup-kicker">Para completar la mesa</span>
              <h2>
                Los acompañamientos
                <em>de la casa.</em>
              </h2>
              <p className="pup-sides__lead">
                Curtido fresco, salsa y bebidas para que la mesa se sienta como en
                casa. Todo se prepara aquí, todos los días.
              </p>

              <div className="pup-sides__columns">
                <div className="pup-sides__column">
                  <h3>{sidesCategory?.label ?? 'Para acompañar'}</h3>
                  {sidesCategory?.description && <p>{sidesCategory.description}</p>}
                  <ul>
                    {sides.map((item) => (
                      <li key={item.id}>
                        <span>
                          <strong>{item.name}</strong>
                          <small>{item.description}</small>
                        </span>
                        <b>{item.price}</b>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pup-sides__column">
                  <h3>{drinksCategory?.label ?? 'Para tomar'}</h3>
                  {drinksCategory?.description && <p>{drinksCategory.description}</p>}
                  <ul>
                    {drinks.map((item) => (
                      <li key={item.id}>
                        <span>
                          <strong>{item.name}</strong>
                          <small>{item.description}</small>
                        </span>
                        <b>{item.price}</b>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="nosotros" className="pup-story">
          <span className="pup-story__grain" aria-hidden="true" />
          <div className="pup-container pup-story__grid">
            <div className="pup-story__intro">
              <span className="pup-kicker pup-kicker--light">{about.eyebrow}</span>
              <h2>{about.title}</h2>
              <blockquote className="pup-story__quote">
                <span aria-hidden="true">“</span>
                {about.quote}
                {about.quoteAuthor && <cite>{about.quoteAuthor}</cite>}
              </blockquote>

              {about.stats?.length > 0 && (
                <dl className="pup-stats">
                  {about.stats.map((stat) => (
                    <div key={stat.label}>
                      <dt>{stat.value}</dt>
                      <dd>{stat.label}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className="pup-story__body">
              <figure className="pup-story__photo">
                <img
                  src={about.image.src}
                  alt={about.image.alt}
                  width={about.image.width}
                  height={about.image.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>La cocina de la casa</figcaption>
              </figure>

              <div className="pup-story__text">
                {about.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {orderSteps && (
          <section className="pup-process">
            <div className="pup-container">
              <div className="pup-process__head">
                <div>
                  <span className="pup-kicker">{orderSteps.eyebrow}</span>
                  <h2>{orderSteps.title}</h2>
                </div>
                <a className="pup-inline-link" href="#contacto">
                  Escribinos por WhatsApp
                  <Icon name="arrow-up-right" size={15} />
                </a>
              </div>

              <ol className="pup-steps">
                {orderSteps.steps.map((step, index) => (
                  <li key={step.title}>
                    <span className="pup-steps__number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        <section id="galeria" className="pup-gallery">
          <div className="pup-container">
            <div className="pup-gallery__head">
              <div>
                <span className="pup-kicker">{gallery.eyebrow}</span>
                <h2>{gallery.title}</h2>
              </div>
              <p>{gallery.description}</p>
            </div>

            <div className="pup-gallery__grid">
              {gallery.images.map((image, index) => (
                <figure
                  className={`pup-gallery__item pup-gallery__item--${index + 1}`}
                  key={image.src}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    decoding="async"
                  />
                  {image.caption && (
                    <figcaption>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="pup-cta">
          <figure className="pup-cta__media">
            <img
              src={cta.image.src}
              alt={cta.image.alt}
              width={cta.image.width}
              height={cta.image.height}
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div className="pup-cta__panel">
            <span className="pup-kicker pup-kicker--light">{cta.eyebrow}</span>
            <h2>{cta.title}</h2>
            <p>{cta.description}</p>
            <ContactButton
              business={business}
              label={cta.buttonLabel}
              className="pup-btn pup-btn--light pup-btn--large"
            />
            <span className="pup-cta__note">
              <Icon name="whatsapp" size={15} />
              Te respondemos por WhatsApp
            </span>
          </div>
        </section>

        <section id="contacto" className="pup-visit">
          <div className="pup-container">
            <div className="pup-visit__head">
              <span className="pup-kicker">{contact.eyebrow}</span>
              <h2>{contact.title}</h2>
              <p>{contact.description}</p>
            </div>

            <div className="pup-visit__grid">
              <div className="pup-visit__card">
                <span className="pup-visit__card-label">Visítanos</span>

                <address className="pup-visit__address">
                  <Icon name="pin" size={19} />
                  <span>
                    {contact.address}
                    {contact.addressNote && <small>{contact.addressNote}</small>}
                  </span>
                </address>

                <div className="pup-visit__rows">
                  {phoneHref && (
                    <a href={phoneHref}>
                      <span className="pup-visit__row-icon">
                        <Icon name="phone" size={18} />
                      </span>
                      <span>
                        <small>Teléfono</small>
                        {contact.phone}
                      </span>
                    </a>
                  )}

                  {mapUrl && (
                    <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                      <span className="pup-visit__row-icon">
                        <Icon name="pin" size={18} />
                      </span>
                      <span>
                        <small>Cómo llegar</small>
                        Abrir ubicación en el mapa
                      </span>
                      <Icon name="arrow-up-right" size={16} />
                    </a>
                  )}
                </div>

                <ContactButton
                  business={business}
                  label={contact.whatsappLabel}
                  className="pup-btn pup-btn--primary pup-visit__cta"
                />

                {contact.note && <p className="pup-note">{contact.note}</p>}
              </div>

              <div className="pup-hours">
                <div className="pup-hours__head">
                  <Icon name="clock" size={20} />
                  <span>Horario de atención</span>
                </div>
                <dl>
                  {contact.hours.map((entry) => (
                    <div key={`${entry.days}-${entry.time}`}>
                      <dt>{entry.days}</dt>
                      <dd>{entry.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="pup-hours__stamp">Comal encendido · Cocina abierta</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="pup-footer">
        <div className="pup-container">
          <div className="pup-footer__top">
            <div className="pup-footer__brand">
              <a href="#inicio" className="pup-footer__wordmark">
                {business.name}
              </a>
              <p>{footer.tagline}</p>
              <span className="pup-footer__location">
                <Icon name="pin" size={15} />
                {location}
              </span>
            </div>

            <nav className="pup-footer__nav" aria-label="Navegación del pie de página">
              <span className="pup-footer__label">Explorar</span>
              {nav.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="pup-footer__contact">
              <span className="pup-footer__label">Pedidos</span>
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={16} />
                  {contact.whatsapp}
                </a>
              ) : (
                <a href="#contacto">Ir a contacto</a>
              )}
              {mapUrl && (
                <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="pin" size={16} />
                  {contact.address}
                </a>
              )}
            </div>
          </div>

          <div className="pup-footer__bottom">
            <span>
              © {year} {business.name}.
            </span>
            <span className="pup-footer__credit">
              {mode === 'demo' ? (
                <>
                  Sitio de demostración · Datos ficticios ·{' '}
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
