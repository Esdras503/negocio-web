import { Link } from 'react-router-dom';
import DemoBar from '../components/business/DemoBar';
import Icon from '../components/Icon';
import { useDemoForm } from '../hooks/useDemoForm';
import { useDisclosure } from '../hooks/useDisclosure';
import { buildMapUrl, buildPhoneHref, buildWhatsAppUrl } from '../utils/business';
import { resolveThemeStyles } from '../utils/theme';
import '../styles/salud.css';

const NAV_ITEMS = [
  { label: 'Especialidades', href: '#especialidades' },
  { label: 'Equipo', href: '#equipo' },
  { label: 'Instalaciones', href: '#instalaciones' },
  { label: 'Horarios', href: '#horarios' },
  { label: 'Preguntas', href: '#preguntas' },
];

const INITIAL_FORM = {
  name: '',
  phone: '',
  area: '',
  date: '',
  time: '',
};

const TIME_OPTIONS = [
  { value: '', label: 'Selecciona un horario' },
  { value: 'manana', label: 'Mañana (8:00 a. m. – 12:00 m.)' },
  { value: 'tarde', label: 'Tarde (1:00 p. m. – 5:00 p. m.)' },
  { value: 'indiferente', label: 'Me adapto a la disponibilidad' },
];

function validateAppointment(values, areas) {
  const errors = {};
  const today = new Date().toISOString().slice(0, 10);

  if (values.name.trim().length < 2) {
    errors.name = 'Escribe tu nombre.';
  }

  const digits = values.phone.replace(/\D/g, '');
  if (digits.length < 8) {
    errors.phone = 'Escribe un teléfono de al menos 8 dígitos.';
  }

  if (!areas.some((area) => area.value && area.value === values.area)) {
    errors.area = 'Selecciona un área de atención.';
  }

  if (!values.date) {
    errors.date = 'Selecciona una fecha tentativa.';
  } else if (values.date < today) {
    errors.date = 'Elige una fecha de hoy en adelante.';
  }

  if (!values.time) {
    errors.time = 'Selecciona un horario de referencia.';
  }

  return errors;
}

export default function SaludTemplate({ business }) {
  const { isOpen, close, toggle } = useDisclosure();
  const themeStyles = resolveThemeStyles(business.theme);
  const whatsappUrl = buildWhatsAppUrl(business);
  const mapUrl = buildMapUrl(business.contact.mapQuery || business.contact.address);
  const phoneHref = buildPhoneHref(business.contact.phone);
  const { hero, intro, specialties, team, facilities, hours, faq, appointment, cta, contact, footer } =
    business;
  const today = new Date().toISOString().slice(0, 10);
  const { values, errors, status, handleChange, handleSubmit, reset } = useDemoForm({
    initialValues: INITIAL_FORM,
    validate: (current) => validateAppointment(current, appointment.areas),
  });

  return (
    <div className="bri-site" style={themeStyles}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <DemoBar />

      <header className="bri-header">
        <div className="bri-shell bri-header__inner">
          <a className="bri-brand" href="#inicio" aria-label={`${business.name}, inicio`}>
            <span className="bri-brand__mark" aria-hidden="true">
              {business.logo.text}
            </span>
            <span>
              <strong>{business.name}</strong>
              <small>Salud y bienestar</small>
            </span>
          </a>

          <nav className="bri-nav" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="bri-header__cta" href="#cita">
            Solicitar una cita
            <Icon name="arrow-right" size={16} />
          </a>

          <button
            className="bri-menu-button"
            type="button"
            aria-expanded={isOpen}
            aria-controls="bri-mobile-nav"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={toggle}
          >
            <Icon name={isOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>

        {isOpen && (
          <div className="bri-mobile-nav" id="bri-mobile-nav">
            <nav aria-label="Navegación móvil">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} onClick={close}>
                  {item.label}
                  <Icon name="arrow-right" size={16} />
                </a>
              ))}
            </nav>
            <a className="bri-btn bri-btn--primary" href="#cita" onClick={close}>
              <Icon name="calendar" size={18} />
              Solicitar una cita
            </a>
          </div>
        )}
      </header>

      <main id="contenido">
        <section className="bri-hero" id="inicio" aria-labelledby="bri-hero-title">
          <div className="bri-hero__shape bri-hero__shape--one" aria-hidden="true" />
          <div className="bri-hero__shape bri-hero__shape--two" aria-hidden="true" />
          <div className="bri-shell bri-hero__grid">
            <div className="bri-hero__content">
              <p className="bri-kicker">{hero.eyebrow}</p>
              <h1 id="bri-hero-title">
                {hero.title}
                <em>{hero.titleAccent}</em>
              </h1>
              <p className="bri-hero__description">{hero.description}</p>

              <div className="bri-hero__actions">
                <a className="bri-btn bri-btn--primary" href="#cita">
                  {hero.primaryCta.label}
                  <Icon name="arrow-right" size={18} />
                </a>
                <a className="bri-btn bri-btn--ghost" href="#especialidades">
                  {hero.secondaryCta.label}
                </a>
              </div>

              <ul className="bri-hero__features">
                {hero.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={14} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bri-hero__visual">
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                width={hero.image.width}
                height={hero.image.height}
                fetchPriority="high"
              />
              <div className="bri-hero__floating">
                <span className="bri-hero__floating-icon" aria-hidden="true">
                  <Icon name="calendar" size={20} />
                </span>
                <div>
                  <strong>Agenda con calma</strong>
                  <span>Elige un día y un horario de referencia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bri-shell">
            <div className="bri-hero__strip">
              <span>
                <Icon name="shield" size={17} />
                Sitio de demostración
              </span>
              <p>
                No brinda atención médica real. No incluyas síntomas, diagnósticos ni
                información clínica en los formularios.
              </p>
            </div>
          </div>
        </section>

        <section className="bri-intro" aria-labelledby="bri-intro-title">
          <div className="bri-shell bri-intro__grid">
            <div>
              <p className="bri-kicker">{intro.eyebrow}</p>
              <h2 id="bri-intro-title">{intro.title}</h2>
            </div>
            <div>
              <p>{intro.text}</p>
              <span className="bri-intro__note">
                <Icon name="leaf" size={17} />
                Información general de demostración
              </span>
            </div>
          </div>
        </section>

        <section className="bri-specialties" id="especialidades" aria-labelledby="bri-specialties-title">
          <div className="bri-shell">
            <div className="bri-section-head">
              <div>
                <p className="bri-kicker">{specialties.eyebrow}</p>
                <h2 id="bri-specialties-title">{specialties.title}</h2>
              </div>
              <p>{specialties.description}</p>
            </div>

            <div className="bri-specialties__grid">
              {specialties.items.map((item, index) => (
                <article className="bri-specialty" key={item.id}>
                  <div className="bri-specialty__top">
                    <span className="bri-specialty__icon" aria-hidden="true">
                      <Icon name={item.icon} size={24} />
                    </span>
                    <span className="bri-specialty__index">0{index + 1}</span>
                  </div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="bri-specialty__note">{item.note}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bri-team" id="equipo" aria-labelledby="bri-team-title">
          <div className="bri-shell">
            <div className="bri-section-head">
              <div>
                <p className="bri-kicker">{team.eyebrow}</p>
                <h2 id="bri-team-title">{team.title}</h2>
              </div>
              <p>{team.description}</p>
            </div>

            <div className="bri-team__grid">
              {team.members.map((member) => (
                <article className="bri-member" key={member.name}>
                  <div className="bri-member__media">
                    <img
                      src={member.image.src}
                      alt={member.image.alt}
                      width={member.image.width}
                      height={member.image.height}
                      loading="lazy"
                    />
                    <span>{member.note}</span>
                  </div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bri-facilities" id="instalaciones" aria-labelledby="bri-facilities-title">
          <div className="bri-shell bri-facilities__grid">
            <div className="bri-facilities__content">
              <p className="bri-kicker">{facilities.eyebrow}</p>
              <h2 id="bri-facilities-title">{facilities.title}</h2>
              <p>{facilities.description}</p>
              <div className="bri-facilities__note">
                <Icon name="sparkles" size={20} />
                <span>Imágenes ilustrativas de la propuesta visual.</span>
              </div>
            </div>

            <div className="bri-facilities__gallery">
              {facilities.images.map((image, index) => (
                <figure className={`bri-facility bri-facility--${index + 1}`} key={image.src}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                  />
                  <figcaption>{image.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="bri-hours" id="horarios" aria-labelledby="bri-hours-title">
          <div className="bri-shell bri-hours__grid">
            <div>
              <p className="bri-kicker">{hours.eyebrow}</p>
              <h2 id="bri-hours-title">{hours.title}</h2>
              <p>{hours.note}</p>
            </div>

            <div className="bri-hours__card">
              {contact.hours.map((entry) => (
                <div key={entry.days}>
                  <span>{entry.days}</span>
                  <span>{entry.time}</span>
                </div>
              ))}
              <div className="bri-hours__actions">
                <a className="bri-btn bri-btn--primary" href="#cita">
                  <Icon name="calendar" size={17} />
                  Solicitar una cita
                </a>
                <a className="bri-btn bri-btn--ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={17} />
                  Escribir a recepción
                </a>
              </div>
              <p className="bri-hours__note">
                Horarios de demostración. La disponibilidad real se confirma al solicitar
                la cita.
              </p>
            </div>
          </div>
        </section>

        <section className="bri-faq" id="preguntas" aria-labelledby="bri-faq-title">
          <div className="bri-shell bri-faq__grid">
            <div className="bri-faq__intro">
              <p className="bri-kicker">{faq.eyebrow}</p>
              <h2 id="bri-faq-title">{faq.title}</h2>
              <p>
                Esta sección reúne respuestas generales sobre el flujo de demostración.
                Para una necesidad médica real, contacta a un centro de salud autorizado.
              </p>
              <a className="bri-btn bri-btn--ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" size={18} />
                Hacer una consulta
              </a>
            </div>

            <div className="bri-faq__list">
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

        <section className="bri-appointment" id="cita" aria-labelledby="bri-appointment-title">
          <div className="bri-shell bri-appointment__grid">
            <div className="bri-appointment__intro">
              <p className="bri-kicker">{appointment.eyebrow}</p>
              <h2 id="bri-appointment-title">{appointment.title}</h2>
              <p>{appointment.description}</p>

              <div className="bri-appointment__safety">
                <Icon name="shield" size={21} />
                <div>
                  <strong>Sin información médica</strong>
                  <p>
                    El formulario solo solicita datos de contacto y preferencias de
                    horario. Es una demostración y no envía información a un servidor.
                  </p>
                </div>
              </div>

              <div className="bri-appointment__contact">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={17} />
                  {contact.whatsappLabel}
                </a>
                {phoneHref && (
                  <a href={phoneHref}>
                    <Icon name="phone" size={17} />
                    {contact.phone}
                  </a>
                )}
              </div>
            </div>

            <div className="bri-form-card">
              {status === 'success' ? (
                <div className="bri-form-success" role="status">
                  <span aria-hidden="true">
                    <Icon name="check" size={28} />
                  </span>
                  <h3>{appointment.successTitle}</h3>
                  <p>{appointment.successMessage}</p>
                  <button className="bri-btn bri-btn--primary" type="button" onClick={reset}>
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <form className="bri-form" onSubmit={handleSubmit} noValidate>
                  <div className="bri-form__head">
                    <span>Solicitud de cita · Demostración</span>
                    <strong>Datos de contacto y preferencia</strong>
                  </div>

                  {status === 'error' && (
                    <p className="bri-form__alert" role="alert">
                      Revisa los campos marcados para continuar.
                    </p>
                  )}

                  <div className="bri-form__row">
                    <div className="bri-field">
                      <label htmlFor="bri-name">Nombre</label>
                      <input
                        id="bri-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Tu nombre"
                        value={values.name}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? 'bri-name-error' : undefined}
                      />
                      {errors.name && (
                        <span id="bri-name-error" className="bri-field__error">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="bri-field">
                      <label htmlFor="bri-phone">Teléfono</label>
                      <input
                        id="bri-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="0000 0000"
                        value={values.phone}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'bri-phone-error' : undefined}
                      />
                      {errors.phone && (
                        <span id="bri-phone-error" className="bri-field__error">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bri-field">
                    <label htmlFor="bri-area">Área de atención</label>
                    <select
                      id="bri-area"
                      name="area"
                      value={values.area}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.area)}
                      aria-describedby={errors.area ? 'bri-area-error' : undefined}
                    >
                      {appointment.areas.map((area) => (
                        <option key={area.value || 'empty'} value={area.value}>
                          {area.label}
                        </option>
                      ))}
                    </select>
                    {errors.area && (
                      <span id="bri-area-error" className="bri-field__error">
                        {errors.area}
                      </span>
                    )}
                  </div>

                  <div className="bri-form__row">
                    <div className="bri-field">
                      <label htmlFor="bri-date">Fecha tentativa</label>
                      <input
                        id="bri-date"
                        name="date"
                        type="date"
                        min={today}
                        value={values.date}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.date)}
                        aria-describedby={errors.date ? 'bri-date-error' : undefined}
                      />
                      {errors.date && (
                        <span id="bri-date-error" className="bri-field__error">
                          {errors.date}
                        </span>
                      )}
                    </div>

                    <div className="bri-field">
                      <label htmlFor="bri-time">Horario de referencia</label>
                      <select
                        id="bri-time"
                        name="time"
                        value={values.time}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.time)}
                        aria-describedby={errors.time ? 'bri-time-error' : undefined}
                      >
                        {TIME_OPTIONS.map((option) => (
                          <option key={option.value || 'empty'} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.time && (
                        <span id="bri-time-error" className="bri-field__error">
                          {errors.time}
                        </span>
                      )}
                    </div>
                  </div>

                  <button className="bri-btn bri-btn--primary bri-form__submit" type="submit">
                    Enviar solicitud de demostración
                    <Icon name="arrow-right" size={18} />
                  </button>
                  <p className="bri-form__privacy">
                    No escribas síntomas, diagnósticos ni información médica sensible. El
                    formulario valida en tu navegador y no envía datos a un servidor.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="bri-cta" aria-labelledby="bri-cta-title">
          <div className="bri-shell bri-cta__inner">
            <div>
              <p className="bri-kicker bri-kicker--light">{cta.eyebrow}</p>
              <h2 id="bri-cta-title">{cta.title}</h2>
              <p>{cta.description}</p>
            </div>
            <a className="bri-btn bri-btn--light" href="#cita">
              <Icon name="calendar" size={18} />
              {cta.buttonLabel}
            </a>
          </div>
        </section>

        <section className="bri-contact" id="contacto" aria-labelledby="bri-contact-title">
          <div className="bri-shell bri-contact__grid">
            <div>
              <p className="bri-kicker">Ubicación y contacto</p>
              <h2 id="bri-contact-title">Un espacio fácil de encontrar.</h2>
              <p>
                Clínica Brisa es una clínica de demostración. La dirección y los datos de
                contacto son ficticios y se usan solo para mostrar la experiencia del sitio.
              </p>
              <address>
                <span>
                  <Icon name="pin" size={17} />
                  {contact.address}
                </span>
                <small>{contact.addressNote}</small>
              </address>
              <div className="bri-contact__actions">
                <a className="bri-btn bri-btn--primary" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} />
                  {contact.whatsappLabel}
                </a>
                {mapUrl && (
                  <a className="bri-btn bri-btn--ghost" href={mapUrl} target="_blank" rel="noopener noreferrer">
                    <Icon name="pin" size={18} />
                    Ver mapa
                  </a>
                )}
              </div>
            </div>

            <div className="bri-contact__card">
              <div className="bri-contact__card-head">
                <span aria-hidden="true">
                  <Icon name="clock" size={22} />
                </span>
                <div>
                  <strong>Horarios de atención</strong>
                  <span>Demostración</span>
                </div>
              </div>
              {contact.hours.map((entry) => (
                <div className="bri-contact__hours" key={entry.days}>
                  <span>{entry.days}</span>
                  <span>{entry.time}</span>
                </div>
              ))}
              <p>{contact.note}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bri-footer">
        <div className="bri-shell bri-footer__top">
          <div className="bri-footer__brand">
            <span className="bri-brand__mark" aria-hidden="true">
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
        <div className="bri-shell bri-footer__bottom">
          <p>
            Sitio web de demostración creado por <Link to="/">Nexobyte</Link>. Clínica,
            profesionales, dirección y datos de contacto son ficticios.
          </p>
          <span>© {new Date().getFullYear()} Clínica Brisa · Demo</span>
        </div>
      </footer>
    </div>
  );
}
