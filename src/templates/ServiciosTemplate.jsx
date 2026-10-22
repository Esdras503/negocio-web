import { Link } from 'react-router-dom';
import DemoBar from '../components/business/DemoBar';
import Icon from '../components/Icon';
import { useDemoForm } from '../hooks/useDemoForm';
import { useDisclosure } from '../hooks/useDisclosure';
import { buildMapUrl, buildPhoneHref, buildWhatsAppUrl } from '../utils/business';
import { resolveThemeStyles } from '../utils/theme';
import '../styles/servicios.css';

const NAV_ITEMS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Ventajas', href: '#ventajas' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Cobertura', href: '#cobertura' },
  { label: 'Contacto', href: '#contacto' },
];

const INITIAL_FORM = {
  name: '',
  phone: '',
  service: '',
  zone: '',
  message: '',
};

function validateQuote(values, services) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Escribe tu nombre.';
  }

  const digits = values.phone.replace(/\D/g, '');
  if (digits.length < 8) {
    errors.phone = 'Escribe un teléfono de al menos 8 dígitos.';
  }

  if (!services.some((service) => service.id === values.service)) {
    errors.service = 'Selecciona el servicio que necesitas.';
  }

  if (values.zone.trim().length < 2) {
    errors.zone = 'Indica tu zona o municipio.';
  }

  return errors;
}

export default function ServiciosTemplate({ business }) {
  const { isOpen, close, toggle } = useDisclosure();
  const themeStyles = resolveThemeStyles(business.theme);
  const whatsappUrl = buildWhatsAppUrl(business);
  const mapUrl = buildMapUrl(business.contact.mapQuery || business.contact.address);
  const phoneHref = buildPhoneHref(business.contact.phone);
  const { hero, trust, services, advantages, process, clients, quote, faq, coverage, cta, contact, footer } =
    business;
  const { values, errors, status, handleChange, handleSubmit, reset } = useDemoForm({
    initialValues: INITIAL_FORM,
    validate: (current) => validateQuote(current, services.items),
  });

  const serviceMessage = (serviceName) =>
    buildWhatsAppUrl(
      business,
      `Hola, vi el sitio de ${business.name} y quiero consultar por el servicio de ${serviceName}.`,
    );

  return (
    <div className="tec-site" style={themeStyles}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <DemoBar />

      <header className="tec-header">
        <div className="tec-shell tec-header__inner">
          <a className="tec-brand" href="#inicio" aria-label={`${business.name}, inicio`}>
            <span className="tec-brand__mark" aria-hidden="true">
              {business.logo.text}
            </span>
            <span className="tec-brand__text">
              <strong>{business.name}</strong>
              <span>Servicios técnicos</span>
            </span>
          </a>

          <nav className="tec-nav" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="tec-header__cta" href="#cotizar">
            Cotizar servicio
            <Icon name="arrow-right" size={16} />
          </a>

          <button
            className="tec-menu-button"
            type="button"
            aria-expanded={isOpen}
            aria-controls="tec-mobile-nav"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={toggle}
          >
            <Icon name={isOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>

        {isOpen && (
          <div className="tec-mobile-nav" id="tec-mobile-nav">
            <nav aria-label="Navegación móvil">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} onClick={close}>
                  {item.label}
                  <Icon name="arrow-right" size={17} />
                </a>
              ))}
            </nav>
            <a className="tec-btn tec-btn--primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={close}>
              <Icon name="whatsapp" size={18} />
              Escribir por WhatsApp
            </a>
          </div>
        )}
      </header>

      <main id="contenido">
        <section className="tec-hero" id="inicio" aria-labelledby="tec-hero-title">
          <div className="tec-shell tec-hero__grid">
            <div className="tec-hero__content">
              <p className="tec-kicker">{hero.eyebrow}</p>
              <h1 id="tec-hero-title">
                {hero.title}
                <span>{hero.titleAccent}</span>
              </h1>
              <p className="tec-hero__description">{hero.description}</p>

              <div className="tec-hero__actions">
                <a className="tec-btn tec-btn--primary" href="#cotizar">
                  {hero.primaryCta.label}
                  <Icon name="arrow-right" size={18} />
                </a>
                <a className="tec-btn tec-btn--outline" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} />
                  Consultar por WhatsApp
                </a>
              </div>

              <ul className="tec-hero__features">
                {hero.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={15} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="tec-hero__visual">
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                width={hero.image.width}
                height={hero.image.height}
                fetchPriority="high"
              />
              <div className="tec-hero__floating">
                <span>
                  <span className="tec-pulse" aria-hidden="true" />
                  Agenda coordinada
                </span>
                <strong>Contanos qué está pasando.</strong>
                <p>Revisamos el servicio y te decimos cómo seguir.</p>
                <a href="#cotizar">
                  Solicitar una visita
                  <Icon name="arrow-right" size={15} />
                </a>
              </div>
              <div className="tec-hero__tag">
                <Icon name="bolt" size={16} />
                Hogares y negocios
              </div>
            </div>
          </div>

          <div className="tec-shell">
            <ul className="tec-trust" aria-label="Ventajas del servicio">
              {trust.map((item) => (
                <li key={item.title}>
                  <span className="tec-trust__icon" aria-hidden="true">
                    <Icon name={item.icon} size={21} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="tec-section tec-services" id="servicios" aria-labelledby="tec-services-title">
          <div className="tec-shell">
            <div className="tec-head">
              <div>
                <p className="tec-kicker">{services.eyebrow}</p>
                <h2 id="tec-services-title">{services.title}</h2>
              </div>
              <p>{services.description}</p>
            </div>

            <div className="tec-services__grid">
              {services.items.map((service, index) => (
                <article className="tec-service" key={service.id}>
                  <div className="tec-service__top">
                    <span className="tec-service__icon" aria-hidden="true">
                      <Icon name={service.icon} size={24} />
                    </span>
                    <span className="tec-service__index">0{index + 1}</span>
                  </div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.includes.map((item) => (
                      <li key={item}>
                        <Icon name="check" size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={serviceMessage(service.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Consultar por ${service.name} por WhatsApp`}
                  >
                    Consultar servicio
                    <Icon name="arrow-up-right" size={15} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tec-advantages" id="ventajas" aria-labelledby="tec-advantages-title">
          <div className="tec-shell tec-advantages__grid">
            <div className="tec-advantages__media">
              <img
                src={advantages.image.src}
                alt={advantages.image.alt}
                width={advantages.image.width}
                height={advantages.image.height}
                loading="lazy"
              />
              <div className="tec-advantages__note">
                <Icon name="clipboard" size={24} />
                <span>Alcance conversado antes de comenzar</span>
              </div>
            </div>

            <div className="tec-advantages__content">
              <p className="tec-kicker tec-kicker--light">{advantages.eyebrow}</p>
              <h2 id="tec-advantages-title">{advantages.title}</h2>
              <p className="tec-advantages__lead">{advantages.description}</p>
              <ul>
                {advantages.items.map((item, index) => (
                  <li key={item.title}>
                    <span>0{index + 1}</span>
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

        <section className="tec-process" id="proceso" aria-labelledby="tec-process-title">
          <div className="tec-shell">
            <div className="tec-head tec-head--center">
              <div>
                <p className="tec-kicker">{process.eyebrow}</p>
                <h2 id="tec-process-title">{process.title}</h2>
              </div>
            </div>
            <ol className="tec-process__list">
              {process.steps.map((step, index) => (
                <li key={step.title}>
                  <span className="tec-process__number">0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="tec-clients" aria-labelledby="tec-clients-title">
          <div className="tec-shell">
            <div className="tec-clients__head">
              <p className="tec-kicker tec-kicker--light">{clients.eyebrow}</p>
              <h2 id="tec-clients-title">{clients.title}</h2>
            </div>
            <div className="tec-clients__grid">
              {clients.items.map((item) => (
                <article key={item.title}>
                  <span className="tec-clients__icon" aria-hidden="true">
                    <Icon name={item.icon} size={24} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tec-quote" id="cotizar" aria-labelledby="tec-quote-title">
          <div className="tec-shell tec-quote__grid">
            <div className="tec-quote__content">
              <p className="tec-kicker tec-kicker--light">{quote.eyebrow}</p>
              <h2 id="tec-quote-title">{quote.title}</h2>
              <p>{quote.description}</p>

              <div className="tec-quote__contact">
                <span>¿Prefieres escribir directamente?</span>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} />
                  {contact.whatsappLabel}
                </a>
                {phoneHref && (
                  <a href={phoneHref}>
                    <Icon name="phone" size={18} />
                    {contact.phone}
                  </a>
                )}
              </div>

              <p className="tec-quote__note">{contact.note}</p>
            </div>

            <div className="tec-form-card">
              {status === 'success' ? (
                <div className="tec-form-success" role="status">
                  <span className="tec-form-success__icon" aria-hidden="true">
                    <Icon name="check" size={28} />
                  </span>
                  <h3>Solicitud de demostración registrada.</h3>
                  <p>
                    En un sitio real, el equipo revisaría la información y se comunicaría
                    por teléfono o WhatsApp para coordinar la visita.
                  </p>
                  <button className="tec-btn tec-btn--primary" type="button" onClick={reset}>
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form className="tec-form" onSubmit={handleSubmit} noValidate>
                  <div className="tec-form__head">
                    <span>Solicitud de cotización</span>
                    <strong>Cuéntanos qué necesitas</strong>
                  </div>

                  {status === 'error' && (
                    <p className="tec-form__alert" role="alert">
                      Revisa los campos marcados para continuar.
                    </p>
                  )}

                  <div className="tec-form__row">
                    <div className="tec-field">
                      <label htmlFor="tec-name">Nombre</label>
                      <input
                        id="tec-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'tec-name-error' : undefined}
                        placeholder="Tu nombre"
                      />
                      {errors.name && (
                        <span className="tec-field__error" id="tec-name-error">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="tec-field">
                      <label htmlFor="tec-phone">Teléfono</label>
                      <input
                        id="tec-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'tec-phone-error' : undefined}
                        placeholder="0000 0000"
                      />
                      {errors.phone && (
                        <span className="tec-field__error" id="tec-phone-error">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="tec-form__row">
                    <div className="tec-field">
                      <label htmlFor="tec-service">Servicio</label>
                      <select
                        id="tec-service"
                        name="service"
                        value={values.service}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.service)}
                        aria-describedby={errors.service ? 'tec-service-error' : undefined}
                      >
                        <option value="">Selecciona una opción</option>
                        {services.items.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.name}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <span className="tec-field__error" id="tec-service-error">
                          {errors.service}
                        </span>
                      )}
                    </div>

                    <div className="tec-field">
                      <label htmlFor="tec-zone">Zona</label>
                      <select
                        id="tec-zone"
                        name="zone"
                        value={values.zone}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.zone)}
                        aria-describedby={errors.zone ? 'tec-zone-error' : undefined}
                      >
                        <option value="">Selecciona tu zona</option>
                        {coverage.zones.map((zone) => (
                          <option key={zone} value={zone}>
                            {zone}
                          </option>
                        ))}
                        <option value="Otra zona">Otra zona</option>
                      </select>
                      {errors.zone && (
                        <span className="tec-field__error" id="tec-zone-error">
                          {errors.zone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="tec-field">
                    <label htmlFor="tec-message">Cuéntanos un poco más</label>
                    <textarea
                      id="tec-message"
                      name="message"
                      rows="4"
                      value={values.message}
                      onChange={handleChange}
                      placeholder="Ej. un tomacorriente dejó de funcionar"
                    />
                  </div>

                  <button className="tec-btn tec-btn--primary tec-form__submit" type="submit">
                    Enviar solicitud de demostración
                    <Icon name="arrow-right" size={18} />
                  </button>
                  <p className="tec-form__privacy">
                    Demostración: el formulario valida en tu navegador y no envía datos a
                    un servidor. No escribas información sensible.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="tec-faq" aria-labelledby="tec-faq-title">
          <div className="tec-shell tec-faq__grid">
            <div className="tec-faq__intro">
              <p className="tec-kicker">{faq.eyebrow}</p>
              <h2 id="tec-faq-title">{faq.title}</h2>
              <p>
                Si tu pregunta no está aquí, puedes escribirnos y la conversación sigue
                por WhatsApp.
              </p>
              <a className="tec-btn tec-btn--outline" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={18} />
                Hacer una consulta
              </a>
            </div>
            <div className="tec-faq__list">
              {faq.items.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>
                    {item.question}
                    <span aria-hidden="true">
                      <Icon name="plus" size={18} />
                    </span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="tec-coverage" id="cobertura" aria-labelledby="tec-coverage-title">
          <div className="tec-shell tec-coverage__inner">
            <div>
              <p className="tec-kicker">{coverage.eyebrow}</p>
              <h2 id="tec-coverage-title">{coverage.title}</h2>
              <p>{coverage.description}</p>
            </div>
            <div className="tec-coverage__zones">
              {coverage.zones.map((zone) => (
                <span key={zone}>
                  <Icon name="pin" size={15} />
                  {zone}
                </span>
              ))}
              <p>{coverage.note}</p>
            </div>
          </div>
        </section>

        <section className="tec-cta" aria-labelledby="tec-cta-title">
          <div className="tec-shell tec-cta__inner">
            <div>
              <p className="tec-kicker tec-kicker--light">{cta.eyebrow}</p>
              <h2 id="tec-cta-title">{cta.title}</h2>
              <p>{cta.description}</p>
            </div>
            <a className="tec-btn tec-btn--light" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Icon name="whatsapp" size={18} />
              {cta.buttonLabel}
            </a>
          </div>
        </section>

        <section className="tec-contact" id="contacto" aria-labelledby="tec-contact-title">
          <div className="tec-shell tec-contact__grid">
            <div>
              <p className="tec-kicker">{contact.eyebrow}</p>
              <h2 id="tec-contact-title">{contact.title}</h2>
              <p>{contact.description}</p>
              <div className="tec-contact__actions">
                <a className="tec-btn tec-btn--primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} />
                  {contact.whatsappLabel}
                </a>
                {mapUrl && (
                  <a className="tec-btn tec-btn--outline" href={mapUrl} target="_blank" rel="noopener noreferrer">
                    <Icon name="pin" size={18} />
                    Ver ubicación
                  </a>
                )}
              </div>
            </div>

            <div className="tec-contact__card">
              <div>
                <span>
                  <Icon name="pin" size={17} />
                  Dirección
                </span>
                <strong>{contact.address}</strong>
                <small>{contact.addressNote}</small>
              </div>
              <div>
                <span>
                  <Icon name="clock" size={17} />
                  Horarios
                </span>
                {contact.hours.map((entry) => (
                  <p className="tec-hours" key={entry.days}>
                    <span>{entry.days}</span>
                    <span>{entry.time}</span>
                  </p>
                ))}
              </div>
              <p className="tec-contact__note">{contact.note}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="tec-footer">
        <div className="tec-shell tec-footer__top">
          <div className="tec-footer__brand">
            <span className="tec-brand__mark" aria-hidden="true">
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
        <div className="tec-shell tec-footer__bottom">
          <p>
            Sitio web de demostración creado por <Link to="/">Nexobyte</Link>. Los datos,
            nombres y precios mostrados son ilustrativos.
          </p>
          <span>© {new Date().getFullYear()} CasaLista · Demo</span>
        </div>
      </footer>
    </div>
  );
}
