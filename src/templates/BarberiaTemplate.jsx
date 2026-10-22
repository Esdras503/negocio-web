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
import '../styles/barberia.css';

export default function BarberiaTemplate({ business, mode = 'demo' }) {
  const {
    hero,
    about,
    services,
    team,
    booking,
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

  const serviceGroups = services.categories.map((category) => ({
    ...category,
    items: services.items.filter((item) => item.category === category.id),
  }));

  const nav = [
    { label: business.nav.services, href: '#servicios' },
    { label: business.nav.about, href: '#nosotros' },
    { label: 'Barberos', href: '#equipo' },
    { label: business.nav.gallery, href: '#galeria' },
    { label: business.nav.contact, href: '#contacto' },
  ];

  return (
    <div className="barber-site" style={themeStyles}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      {mode === 'demo' && <DemoBar />}

      <div className="barber-topline">
        <div className="barber-container barber-topline__inner">
          <span className="barber-topline__note">
            <span aria-hidden="true" />
            Solo con cita previa
          </span>

          {phoneHref ? (
            <a href={phoneHref}>
              <Icon name="phone" size={13} />
              {contact.phone}
            </a>
          ) : (
            <span>{contact.address}</span>
          )}

          {mapUrl && (
            <a
              className="barber-topline__map"
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="pin" size={13} />
              {location}
            </a>
          )}
        </div>
      </div>

      <header className="barber-header">
        <div className="barber-container barber-header__inner">
          <a className="barber-brand" href="#inicio" onClick={close}>
            <BrandMark
              name={business.name}
              text={business.logo.text}
              image={business.logo.image}
              imageAlt={business.logo.imageAlt}
              className="barber-brand__mark"
            />
            <span className="barber-brand__text">
              <strong>{business.name}</strong>
              <small>{business.sector} · {location}</small>
            </span>
          </a>

          <nav className="barber-nav" aria-label="Navegación principal">
            {nav.map((item, index) => (
              <a key={item.href} href={item.href}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="barber-header__actions">
            <ContactButton
              business={business}
              label="Reservar"
              className="barber-btn barber-btn--gold barber-header__cta"
            />
            <button
              className="barber-menu-button"
              type="button"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              aria-controls="barber-mobile-nav"
              onClick={toggle}
            >
              <Icon name={isOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>

        <nav
          id="barber-mobile-nav"
          className="barber-mobile-nav"
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
            className="barber-btn barber-btn--gold barber-mobile-nav__cta"
            onClick={close}
          />
        </nav>
      </header>

      <main id="contenido">
        <section id="inicio" className="barber-hero">
          <span className="barber-hero__ghost" aria-hidden="true">
            BARBER
          </span>

          <div className="barber-container barber-hero__grid">
            <div className="barber-hero__copy">
              <span className="barber-kicker">
                <b>01</b>
                {hero.eyebrow}
              </span>

              <h1>
                {hero.title}
                <em>{hero.titleAccent}</em>
              </h1>

              <p className="barber-hero__lead">{hero.description}</p>

              <div className="barber-hero__actions">
                <ContactButton
                  business={business}
                  label={hero.primaryCta.label}
                  className="barber-btn barber-btn--gold"
                />
                <a className="barber-btn barber-btn--ghost" href="#servicios">
                  {hero.secondaryCta.label}
                  <Icon name="arrow-right" size={17} />
                </a>
              </div>

              <ul className="barber-hero__features">
                {hero.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={14} />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="barber-hero__meta">
                {contact.hours?.[0] && (
                  <span>
                    <Icon name="clock" size={15} />
                    {contact.hours[0].days} · {contact.hours[0].time}
                  </span>
                )}
                <span>
                  <Icon name="pin" size={15} />
                  {location}
                </span>
              </div>
            </div>

            <figure className="barber-hero__media">
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                width={hero.image.width}
                height={hero.image.height}
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
              <figcaption className="barber-hero__stamp">
                <span>Reserva por WhatsApp</span>
                <strong>Tu silla te espera</strong>
                <a href={whatsappUrl || '#reservar'}>
                  Agendar ahora
                  <Icon name="arrow-up-right" size={14} />
                </a>
              </figcaption>
              <span className="barber-hero__corner" aria-hidden="true" />
            </figure>
          </div>

          <span className="barber-hero__rail" aria-hidden="true">
            Santa Ana · El Salvador · Barbería clásica
          </span>
        </section>

        <section id="servicios" className="barber-services">
          <div className="barber-container">
            <div className="barber-section-head">
              <div>
                <span className="barber-kicker">
                  <b>02</b>
                  {services.eyebrow}
                </span>
                <h2>{services.title}</h2>
              </div>
              <div className="barber-section-head__aside">
                <p>{services.description}</p>
                <a className="barber-text-link" href="#reservar">
                  Reservar un turno
                  <Icon name="arrow-right" size={16} />
                </a>
              </div>
            </div>

            <div className="barber-service-groups">
              {serviceGroups.map((group, groupIndex) => (
                <div className="barber-service-group" key={group.id}>
                  <div className="barber-service-group__head">
                    <span>{String(groupIndex + 1).padStart(2, '0')}</span>
                    <h3>{group.label}</h3>
                    <p>{group.description}</p>
                  </div>

                  <ul>
                    {group.items.map((item) => (
                      <li className="barber-service" key={item.id}>
                        <div className="barber-service__top">
                          <h4>{item.name}</h4>
                          <span className="barber-service__price">{item.price}</span>
                        </div>
                        <p>{item.description}</p>
                        <div className="barber-service__meta">
                          {item.duration && (
                            <span>
                              <Icon name="clock" size={13} />
                              {item.duration}
                            </span>
                          )}
                          {item.tag && <b>{item.tag}</b>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {services.note && <p className="barber-note">{services.note}</p>}
          </div>
        </section>

        <section id="nosotros" className="barber-craft">
          <div className="barber-container barber-craft__grid">
            <figure className="barber-craft__media">
              <img
                src={about.image.src}
                alt={about.image.alt}
                width={about.image.width}
                height={about.image.height}
                loading="lazy"
                decoding="async"
              />
              <figcaption>La barbería · {location}</figcaption>
              <span aria-hidden="true">DR</span>
            </figure>

            <div className="barber-craft__content">
              <span className="barber-kicker barber-kicker--dark">
                <b>03</b>
                {about.eyebrow}
              </span>
              <h2>{about.title}</h2>

              <div className="barber-craft__text">
                {about.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              <blockquote>
                <span aria-hidden="true">“</span>
                {about.quote}
                {about.quoteAuthor && <cite>{about.quoteAuthor}</cite>}
              </blockquote>

              {about.stats?.length > 0 && (
                <dl className="barber-stats">
                  {about.stats.map((stat) => (
                    <div key={stat.label}>
                      <dt>{stat.value}</dt>
                      <dd>{stat.label}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </section>

        {team && (
          <section id="equipo" className="barber-team">
            <div className="barber-container">
              <div className="barber-team__head">
                <div>
                  <span className="barber-kicker">
                    <b>04</b>
                    {team.eyebrow}
                  </span>
                  <h2>{team.title}</h2>
                </div>
                <p>{team.description}</p>
              </div>

              <div className="barber-team__grid">
                {team.members.map((member, index) => (
                  <article className="barber-barber" key={member.id}>
                    <figure>
                      <img
                        src={member.image.src}
                        alt={member.image.alt}
                        width={member.image.width}
                        height={member.image.height}
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="barber-barber__number">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </figure>
                    <div className="barber-barber__body">
                      <span className="barber-barber__role">{member.role}</span>
                      <h3>{member.name}</h3>
                      <p>{member.bio}</p>
                      <span className="barber-barber__specialty">
                        {member.specialty}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="galeria" className="barber-gallery">
          <div className="barber-container barber-gallery__head">
            <div>
              <span className="barber-kicker">
                <b>05</b>
                {gallery.eyebrow}
              </span>
              <h2>{gallery.title}</h2>
            </div>
            <p>{gallery.description}</p>
          </div>

          <div className="barber-gallery__grid">
            {gallery.images.map((image, index) => (
              <figure className="barber-gallery__item" key={image.src}>
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="reservar" className="barber-booking">
          <img
            className="barber-booking__image"
            src={cta.image.src}
            alt={cta.image.alt}
            width={cta.image.width}
            height={cta.image.height}
            loading="lazy"
            decoding="async"
          />
          <span className="barber-booking__overlay" aria-hidden="true" />

          <div className="barber-container barber-booking__grid">
            <div className="barber-booking__content">
              <span className="barber-kicker">
                <b>06</b>
                {cta.eyebrow}
              </span>
              <h2>{cta.title}</h2>
              <p>{cta.description}</p>

              <ContactButton
                business={business}
                label={cta.buttonLabel}
                className="barber-btn barber-btn--gold"
              />

              <span className="barber-booking__hint">
                <Icon name="whatsapp" size={15} />
                Conversación directa con la barbería
              </span>
            </div>

            {booking && (
              <div className="barber-booking__panel">
                <div className="barber-booking__panel-top">
                  <span>
                    <Icon name="whatsapp" size={18} />
                  </span>
                  <div>
                    <small>{booking.eyebrow}</small>
                    <strong>Sin pagos en línea</strong>
                  </div>
                </div>

                <h3>{booking.title}</h3>
                <p>{booking.description}</p>

                <ol>
                  {booking.steps.map((step, index) => (
                    <li key={step.title}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <div>
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                {booking.note && <p className="barber-booking__note">{booking.note}</p>}
              </div>
            )}
          </div>
        </section>

        <section id="contacto" className="barber-contact">
          <div className="barber-container">
            <div className="barber-contact__head">
              <span className="barber-kicker">
                <b>07</b>
                {contact.eyebrow}
              </span>
              <h2>{contact.title}</h2>
              <p>{contact.description}</p>
            </div>

            <div className="barber-contact__grid">
              <div className="barber-contact__column">
                <span className="barber-contact__label">Dirección</span>
                {mapUrl ? (
                  <a
                    className="barber-contact__address"
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contact.address}
                    <Icon name="arrow-up-right" size={15} />
                  </a>
                ) : (
                  <span className="barber-contact__address">{contact.address}</span>
                )}
                {contact.addressNote && (
                  <small className="barber-contact__small">{contact.addressNote}</small>
                )}
              </div>

              <div className="barber-contact__column">
                <span className="barber-contact__label">Horario</span>
                <dl className="barber-hours">
                  {contact.hours.map((entry) => (
                    <div key={`${entry.days}-${entry.time}`}>
                      <dt>{entry.days}</dt>
                      <dd>{entry.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="barber-contact__column">
                <span className="barber-contact__label">Contacto</span>
                <div className="barber-contact__links">
                  {phoneHref && (
                    <a href={phoneHref}>
                      <Icon name="phone" size={16} />
                      {contact.phone}
                    </a>
                  )}
                  {whatsappUrl && (
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <Icon name="whatsapp" size={16} />
                      {contact.whatsapp}
                    </a>
                  )}
                  {mapUrl && (
                    <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                      <Icon name="pin" size={16} />
                      Cómo llegar
                    </a>
                  )}
                </div>
              </div>
            </div>

            {contact.note && <p className="barber-contact__note">{contact.note}</p>}
          </div>
        </section>
      </main>

      <footer className="barber-footer">
        <div className="barber-container">
          <div className="barber-footer__top">
            <div className="barber-footer__brand">
              <a href="#inicio" className="barber-footer__wordmark">
                {business.name}
              </a>
              <p>{footer.tagline}</p>
              <span>
                <Icon name="pin" size={15} />
                {location}
              </span>
            </div>

            <nav className="barber-footer__nav" aria-label="Navegación del pie de página">
              <span className="barber-footer__label">Explorar</span>
              {nav.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="barber-footer__contact">
              <span className="barber-footer__label">Reservas</span>
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={16} />
                  {contact.whatsapp}
                </a>
              ) : (
                <a href="#contacto">Ir a contacto</a>
              )}
              {phoneHref && (
                <a href={phoneHref}>
                  <Icon name="phone" size={16} />
                  {contact.phone}
                </a>
              )}
            </div>

            <div className="barber-footer__hours">
              <span className="barber-footer__label">Horario</span>
              {contact.hours.map((entry) => (
                <p key={`${entry.days}-${entry.time}`}>
                  <span>{entry.days}</span>
                  {entry.time}
                </p>
              ))}
            </div>
          </div>

          <p className="barber-footer__watermark" aria-hidden="true">
            {business.name}
          </p>

          <div className="barber-footer__bottom">
            <span>
              © {year} {business.name}.
            </span>
            <span className="barber-footer__credit">
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
