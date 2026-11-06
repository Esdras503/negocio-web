import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DemoBar from '../components/business/DemoBar';
import DemoDialog from '../components/DemoDialog';
import Icon from '../components/Icon';
import { useDemoForm } from '../hooks/useDemoForm';
import { useDisclosure } from '../hooks/useDisclosure';
import { buildPhoneHref, buildWhatsAppUrl } from '../utils/business';
import { resolveThemeStyles } from '../utils/theme';
import '../styles/gimnasio.css';

const NAV_ITEMS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Planes', href: '#planes' },
  { label: 'Entrenadores', href: '#entrenadores' },
  { label: 'Contacto', href: '#contacto' },
];

const INITIAL_FORM = {
  name: '',
  phone: '',
  goal: '',
  schedule: '',
  note: '',
};

function validateVisit(values) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Escribe tu nombre.';
  }

  const digits = values.phone.replace(/\D/g, '');
  if (digits.length < 8) {
    errors.phone = 'Escribe un teléfono de al menos 8 dígitos.';
  }

  if (!values.goal) {
    errors.goal = 'Selecciona un objetivo.';
  }

  if (!values.schedule) {
    errors.schedule = 'Selecciona un horario de referencia.';
  }

  return errors;
}

export default function GimnasioTemplate({ business }) {
  const { isOpen, close, toggle } = useDisclosure();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(null);
  const themeStyles = resolveThemeStyles(business.theme);
  const whatsappUrl = buildWhatsAppUrl(business);
  const phoneHref = buildPhoneHref(business.contact.phone);
  const { hero, about, services, plans, trainers, gallery, cta, contact, footer } = business;
  const form = contact.form;
  const { values, errors, status, handleChange, handleSubmit, reset } = useDemoForm({
    initialValues: INITIAL_FORM,
    validate: validateVisit,
  });

  const closePlan = useCallback(() => setSelectedPlan(null), []);
  const closeGallery = useCallback(() => setGalleryIndex(null), []);

  useEffect(() => {
    const root = document.documentElement;
    const revealNodes = Array.from(document.querySelectorAll('.gym-site .gym-reveal'));
    root.classList.add('gym-motion-ready', 'gym-scroll-smooth');

    if (!('IntersectionObserver' in window)) {
      revealNodes.forEach((node) => node.classList.add('is-visible'));
      return () => root.classList.remove('gym-motion-ready', 'gym-scroll-smooth');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px' },
    );

    revealNodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      root.classList.remove('gym-motion-ready', 'gym-scroll-smooth');
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const galleryCount = gallery.images.length;
  const activeGalleryImage =
    galleryIndex === null ? null : gallery.images[galleryIndex];
  const galleryPosition =
    galleryIndex === null ? '00' : String(galleryIndex + 1).padStart(2, '0');

  const moveGallery = (direction) => {
    setGalleryIndex((current) => {
      if (current === null) return current;
      return (current + direction + galleryCount) % galleryCount;
    });
  };

  const tickerWords = [...hero.ticker, ...hero.ticker, ...hero.ticker];
  const year = new Date().getFullYear();

  return (
    <div className="gym-site" style={themeStyles}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <DemoBar />

      <header className="gym-header">
        <div className="gym-shell gym-header__inner">
          <a className="gym-brand" href="#inicio" aria-label={`${business.name}, inicio`}>
            <span className="gym-brand__mark" aria-hidden="true">
              {business.logo.text}
            </span>
            <span className="gym-brand__copy">
              <strong>{business.name}</strong>
              <small>Fitness Club · Santa Ana</small>
            </span>
          </a>

          <nav className="gym-nav" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="gym-button gym-button--primary gym-button--small gym-header__cta" href="#contacto">
            Prueba una clase
          </a>

          <button
            className="gym-menu-button"
            type="button"
            aria-expanded={isOpen}
            aria-controls="gym-mobile-nav"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={toggle}
          >
            <Icon name={isOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>

        {isOpen && (
          <div className="gym-mobile" id="gym-mobile-nav">
            <nav aria-label="Navegación móvil">
              {NAV_ITEMS.map((item, index) => (
                <a key={item.href} href={item.href} onClick={close}>
                  <span aria-hidden="true">0{index + 1}</span>
                  {item.label}
                  <Icon name="arrow-right" size={18} />
                </a>
              ))}
            </nav>
            <a
              className="gym-button gym-button--primary"
              href="#contacto"
              onClick={close}
            >
              Agenda una visita
              <Icon name="arrow-right" size={17} />
            </a>
            <p className="gym-mobile__note">Demostración · Datos ficticios</p>
          </div>
        )}
      </header>

      <main id="contenido">
        <section className="gym-hero" id="inicio" aria-labelledby="gym-hero-title">
          <img
            className="gym-hero__image"
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            fetchPriority="high"
            decoding="async"
          />
          <div className="gym-hero__shade" aria-hidden="true" />

          <div className="gym-shell gym-hero__inner">
            <div className="gym-hero__copy">
              <p className="gym-kicker gym-kicker--light">{hero.eyebrow}</p>
              <h1 id="gym-hero-title">
                <span>{hero.title}</span>
                <span className="gym-hero__accent">{hero.titleAccent}</span>
              </h1>
              <p className="gym-hero__description">{hero.description}</p>

              <div className="gym-hero__actions">
                <a className="gym-button gym-button--primary" href="#planes">
                  {hero.primaryCta.label}
                  <Icon name="arrow-right" size={17} />
                </a>
                <a className="gym-button gym-button--outline" href="#contacto">
                  {hero.secondaryCta.label}
                  <Icon name="arrow-up-right" size={17} />
                </a>
              </div>

              <ul className="gym-hero__features" aria-label="Características del gimnasio">
                {hero.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={14} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="gym-hero__aside">
              <span className="gym-hero__status">
                <span aria-hidden="true" />
                {hero.status}
              </span>
              <span className="gym-hero__vertical">Santa Ana · El Salvador</span>
            </div>
          </div>

          <div className="gym-shell gym-hero__stats">
            {hero.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="gym-ticker" aria-hidden="true">
          <div className="gym-ticker__track">
            {[0, 1].map((group) => (
              <div className="gym-ticker__group" key={group}>
                {tickerWords.map((word, index) => (
                  <span className="gym-ticker__item" key={`${group}-${index}-${word}`}>
                    {word}
                    <i>+</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="gym-section gym-about" id="nosotros" aria-labelledby="gym-about-title">
          <div className="gym-shell gym-about__grid">
            <div className="gym-about__media gym-reveal">
              <img
                src={about.image.src}
                alt={about.image.alt}
                width={about.image.width}
                height={about.image.height}
                loading="lazy"
                decoding="async"
              />
              <p className="gym-about__caption">{about.imageCaption}</p>
              <div className="gym-about__numbers">
                {about.stats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="gym-about__copy gym-reveal">
              <p className="gym-kicker">{about.eyebrow}</p>
              <h2 id="gym-about-title">{about.title}</h2>
              <p className="gym-about__lead">{about.lead}</p>
              {about.paragraphs.map((paragraph) => (
                <p className="gym-about__paragraph" key={paragraph}>
                  {paragraph}
                </p>
              ))}

              <ul className="gym-about__points">
                {about.points.map((point, index) => (
                  <li key={point.title}>
                    <span aria-hidden="true">0{index + 1}</span>
                    <div>
                      <h3>{point.title}</h3>
                      <p>{point.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="gym-services" id="servicios" aria-labelledby="gym-services-title">
          <div className="gym-shell">
            <header className="gym-section-head gym-section-head--split gym-reveal">
              <div>
                <p className="gym-kicker">{services.eyebrow}</p>
                <h2 id="gym-services-title">{services.title}</h2>
              </div>
              <p className="gym-section-head__copy">{services.description}</p>
            </header>

            <ol className="gym-services__list">
              {services.items.map((service, index) => (
                <li className="gym-service gym-reveal" key={service.id}>
                  <span className="gym-service__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="gym-service__icon" aria-hidden="true">
                    <Icon name={service.icon} size={25} />
                  </span>
                  <div className="gym-service__body">
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
                  <ul className="gym-service__tags" aria-label={`Enfoques de ${service.name}`}>
                    {service.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>

            <p className="gym-note gym-reveal">
              <Icon name="shield" size={15} />
              {services.note}
            </p>
          </div>
        </section>

        <section className="gym-plans" id="planes" aria-labelledby="gym-plans-title">
          <div className="gym-shell">
            <header className="gym-section-head gym-section-head--center gym-reveal">
              <p className="gym-kicker">{plans.eyebrow}</p>
              <h2 id="gym-plans-title">{plans.title}</h2>
              <p className="gym-section-head__copy">{plans.description}</p>
            </header>

            <div className="gym-plans__grid">
              {plans.items.map((plan, index) => (
                <article
                  className={`gym-plan gym-reveal ${plan.featured ? 'gym-plan--featured' : ''}`}
                  key={plan.id}
                >
                  <div className="gym-plan__top">
                    <span className="gym-plan__index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {plan.badge && <span className="gym-plan__badge">{plan.badge}</span>}
                  </div>
                  <h3>{plan.name}</h3>
                  <p className="gym-plan__price">
                    <strong>{plan.price}</strong>
                    <span>{plan.period}</span>
                  </p>
                  <p className="gym-plan__summary">{plan.summary}</p>
                  <ul className="gym-plan__features">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Icon name="check" size={14} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="gym-button gym-plan__button"
                    type="button"
                    onClick={() => setSelectedPlan(plan)}
                    aria-haspopup="dialog"
                  >
                    {plan.ctaLabel}
                    <Icon name="arrow-right" size={16} />
                  </button>
                </article>
              ))}
            </div>

            <p className="gym-note gym-note--center gym-reveal">
              <Icon name="shield" size={15} />
              {plans.note}
            </p>
          </div>
        </section>

        <section className="gym-trainers" id="entrenadores" aria-labelledby="gym-trainers-title">
          <div className="gym-shell">
            <header className="gym-section-head gym-section-head--split gym-reveal">
              <div>
                <p className="gym-kicker">{trainers.eyebrow}</p>
                <h2 id="gym-trainers-title">{trainers.title}</h2>
              </div>
              <p className="gym-section-head__copy">{trainers.description}</p>
            </header>

            <div className="gym-trainers__grid">
              {trainers.items.map((trainer, index) => (
                <article className="gym-trainer gym-reveal" key={trainer.name}>
                  <div className="gym-trainer__media">
                    <img
                      src={trainer.image.src}
                      alt={trainer.image.alt}
                      width={trainer.image.width}
                      height={trainer.image.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="gym-trainer__index" aria-hidden="true">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="gym-trainer__body">
                    <p className="gym-trainer__specialty">{trainer.specialty}</p>
                    <h3>{trainer.name}</h3>
                    <p>{trainer.bio}</p>
                    <ul className="gym-trainer__tags">
                      {trainer.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <p className="gym-note gym-reveal">
              <Icon name="shield" size={15} />
              {trainers.note}
            </p>
          </div>
        </section>

        <section className="gym-gallery" id="galeria" aria-labelledby="gym-gallery-title">
          <div className="gym-shell">
            <header className="gym-section-head gym-section-head--split gym-reveal">
              <div>
                <p className="gym-kicker">{gallery.eyebrow}</p>
                <h2 id="gym-gallery-title">{gallery.title}</h2>
              </div>
              <p className="gym-section-head__copy">{gallery.description}</p>
            </header>

            <div className="gym-gallery__grid">
              {gallery.images.map((image, index) => (
                <button
                  className="gym-gallery__item gym-reveal"
                  type="button"
                  key={image.id}
                  onClick={() => setGalleryIndex(index)}
                  aria-haspopup="dialog"
                  aria-label={`Ampliar imagen: ${image.caption}`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="gym-gallery__veil" aria-hidden="true" />
                  <span className="gym-gallery__meta">{image.meta}</span>
                  <span className="gym-gallery__caption">{image.caption}</span>
                  <span className="gym-gallery__open" aria-hidden="true">
                    <Icon name="plus" size={18} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="gym-cta" aria-labelledby="gym-cta-title">
          <img
            className="gym-cta__image"
            src={hero.image.src}
            alt=""
            width={hero.image.width}
            height={hero.image.height}
            loading="lazy"
            decoding="async"
            aria-hidden="true"
          />
          <div className="gym-cta__shade" aria-hidden="true" />
          <div className="gym-shell gym-cta__inner gym-reveal">
            <p className="gym-kicker gym-kicker--light">{cta.eyebrow}</p>
            <h2 id="gym-cta-title">{cta.title}</h2>
            <p className="gym-cta__description">{cta.description}</p>
            <div className="gym-cta__actions">
              <a className="gym-button gym-button--light" href="#contacto">
                {cta.buttonLabel}
                <Icon name="arrow-right" size={17} />
              </a>
              {whatsappUrl && (
                <a
                  className="gym-button gym-button--ghost-light"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={17} />
                  {cta.secondaryLabel}
                </a>
              )}
            </div>
            <p className="gym-cta__note">{cta.note}</p>
          </div>
        </section>

        <section className="gym-contact" id="contacto" aria-labelledby="gym-contact-title">
          <div className="gym-shell gym-contact__grid">
            <div className="gym-contact__info gym-reveal">
              <p className="gym-kicker">{contact.eyebrow}</p>
              <h2 id="gym-contact-title">{contact.title}</h2>
              <p className="gym-contact__description">{contact.description}</p>

              <ul className="gym-contact__details">
                <li>
                  <span className="gym-contact__icon" aria-hidden="true">
                    <Icon name="phone" size={20} />
                  </span>
                  <div>
                    <span className="gym-contact__label">Teléfono y WhatsApp</span>
                    {phoneHref ? (
                      <a href={phoneHref}>{contact.phone}</a>
                    ) : (
                      <span>{contact.phone}</span>
                    )}
                  </div>
                </li>
                <li>
                  <span className="gym-contact__icon" aria-hidden="true">
                    <Icon name="pin" size={20} />
                  </span>
                  <div>
                    <span className="gym-contact__label">Dirección de demostración</span>
                    <p>{contact.address}</p>
                    <small>{contact.addressNote}</small>
                  </div>
                </li>
                <li>
                  <span className="gym-contact__icon" aria-hidden="true">
                    <Icon name="clock" size={20} />
                  </span>
                  <div>
                    <span className="gym-contact__label">Horario de ejemplo</span>
                    <dl className="gym-hours">
                      {contact.hours.map((entry) => (
                        <div key={entry.days}>
                          <dt>{entry.days}</dt>
                          <dd>{entry.time}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </li>
              </ul>

              {whatsappUrl && (
                <a
                  className="gym-button gym-button--outline"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={17} />
                  {contact.whatsappLabel}
                </a>
              )}

              <p className="gym-contact__note">
                <Icon name="shield" size={15} />
                {contact.note}
              </p>
            </div>

            <div className="gym-contact__form gym-reveal" id="visita">
              <div className="gym-form__head">
                <p className="gym-kicker">{form.eyebrow}</p>
                <h3>{form.title}</h3>
                <p>{form.description}</p>
              </div>

              <form className="gym-form" onSubmit={handleSubmit} noValidate>
                <div className="gym-field-row">
                  <div className="gym-field">
                    <label htmlFor="gym-name">Nombre</label>
                    <input
                      id="gym-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Tu nombre"
                      value={values.name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'gym-name-error' : undefined}
                    />
                    {errors.name && (
                      <p className="gym-field__error" id="gym-name-error">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="gym-field">
                    <label htmlFor="gym-phone">Teléfono</label>
                    <input
                      id="gym-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="0000 0000"
                      value={values.phone}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'gym-phone-error' : undefined}
                    />
                    {errors.phone && (
                      <p className="gym-field__error" id="gym-phone-error">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="gym-field-row">
                  <div className="gym-field">
                    <label htmlFor="gym-goal">Objetivo</label>
                    <select
                      id="gym-goal"
                      name="goal"
                      value={values.goal}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.goal)}
                      aria-describedby={errors.goal ? 'gym-goal-error' : undefined}
                    >
                      {form.goals.map((goal) => (
                        <option value={goal.value} key={goal.value || 'empty'}>
                          {goal.label}
                        </option>
                      ))}
                    </select>
                    {errors.goal && (
                      <p className="gym-field__error" id="gym-goal-error">
                        {errors.goal}
                      </p>
                    )}
                  </div>

                  <div className="gym-field">
                    <label htmlFor="gym-schedule">Horario</label>
                    <select
                      id="gym-schedule"
                      name="schedule"
                      value={values.schedule}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.schedule)}
                      aria-describedby={errors.schedule ? 'gym-schedule-error' : undefined}
                    >
                      {form.schedules.map((schedule) => (
                        <option value={schedule.value} key={schedule.value || 'empty'}>
                          {schedule.label}
                        </option>
                      ))}
                    </select>
                    {errors.schedule && (
                      <p className="gym-field__error" id="gym-schedule-error">
                        {errors.schedule}
                      </p>
                    )}
                  </div>
                </div>

                <div className="gym-field">
                  <label htmlFor="gym-note">
                    ¿Algo que quieras contarnos? <span>(opcional)</span>
                  </label>
                  <textarea
                    id="gym-note"
                    name="note"
                    rows="3"
                    maxLength="280"
                    placeholder="Cuéntanos qué te gustaría trabajar"
                    value={values.note}
                    onChange={handleChange}
                  />
                </div>

                {status === 'error' && (
                  <p className="gym-form__alert" role="alert">
                    Revisa los campos marcados para continuar.
                  </p>
                )}

                {status === 'success' && (
                  <div className="gym-form__success" role="status">
                    <Icon name="check" size={20} />
                    <div>
                      <strong>Gracias, {values.name.trim()}.</strong>
                      <p>{form.success}</p>
                    </div>
                  </div>
                )}

                <button className="gym-button gym-button--primary gym-form__submit" type="submit">
                  {form.submitLabel}
                  <Icon name="send" size={17} />
                </button>

                {status === 'success' && (
                  <button className="gym-form__reset" type="button" onClick={reset}>
                    Limpiar y enviar otra solicitud
                  </button>
                )}

                <p className="gym-form__note">{form.note}</p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="gym-footer">
        <div className="gym-shell gym-footer__top">
          <div className="gym-footer__brand">
            <a className="gym-brand" href="#inicio" aria-label={`${business.name}, inicio`}>
              <span className="gym-brand__mark" aria-hidden="true">
                {business.logo.text}
              </span>
              <span className="gym-brand__copy">
                <strong>{business.name}</strong>
                <small>Fitness Club · Santa Ana</small>
              </span>
            </a>
            <p>{footer.tagline}</p>
            <span className="gym-footer__location">{business.location}</span>
          </div>

          <nav className="gym-footer__nav" aria-label="Navegación del pie">
            <p className="gym-footer__label">Explorar</p>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="gym-footer__social">
            <p className="gym-footer__label">Redes de demostración</p>
            <div className="gym-footer__social-links">
              {footer.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.label} (enlace de demostración)`}
                >
                  <Icon name={social.icon} size={18} />
                </a>
              ))}
            </div>
            <p className="gym-footer__social-note">{footer.socialNote}</p>
          </div>
        </div>

        <div className="gym-shell gym-footer__bottom">
          <p className="gym-footer__note">{footer.note}</p>
          <div className="gym-footer__legal">
            <span>Demostración · {year}</span>
            <Link to="/">
              Volver a Nexobyte
              <Icon name="arrow-up-right" size={14} />
            </Link>
          </div>
        </div>
      </footer>

      <DemoDialog
        open={Boolean(selectedPlan)}
        onClose={closePlan}
        titleId="gym-plan-dialog-title"
        className="gym-plan-dialog"
      >
        {selectedPlan && (
          <>
            <p className="gym-kicker gym-kicker--light">
              {selectedPlan.badge ?? 'Plan de demostración'}
            </p>
            <h2 id="gym-plan-dialog-title">Plan {selectedPlan.name}</h2>
            <p className="gym-plan-dialog__price">
              <strong>{selectedPlan.price}</strong>
              <span>{selectedPlan.period}</span>
            </p>
            <p className="gym-plan-dialog__summary">{selectedPlan.summary}</p>
            <ul className="gym-plan-dialog__features">
              {selectedPlan.features.map((feature) => (
                <li key={feature}>
                  <Icon name="check" size={15} />
                  {feature}
                </li>
              ))}
            </ul>
            <p className="gym-plan-dialog__notice">
              <Icon name="shield" size={15} />
              {plans.note}
            </p>
            <div className="gym-plan-dialog__actions">
              <a
                className="gym-button gym-button--primary"
                href="#contacto"
                onClick={closePlan}
              >
                Agenda una visita
                <Icon name="arrow-right" size={16} />
              </a>
              <button className="gym-button gym-button--ghost-light" type="button" onClick={closePlan}>
                Seguir explorando
              </button>
            </div>
          </>
        )}
      </DemoDialog>

      <DemoDialog
        open={Boolean(activeGalleryImage)}
        onClose={closeGallery}
        titleId="gym-gallery-dialog-title"
        className="gym-lightbox"
      >
        {activeGalleryImage && (
          <div className="gym-lightbox__layout">
            <div className="gym-lightbox__media">
              <img
                src={activeGalleryImage.src}
                alt={activeGalleryImage.alt}
                width={activeGalleryImage.width}
                height={activeGalleryImage.height}
              />
            </div>
            <div className="gym-lightbox__info">
              <p className="gym-kicker gym-kicker--light">{activeGalleryImage.meta}</p>
              <h2 id="gym-gallery-dialog-title">{activeGalleryImage.caption}</h2>
              <p>{gallery.description}</p>
              <div className="gym-lightbox__nav">
                <button
                  type="button"
                  onClick={() => moveGallery(-1)}
                  aria-label="Imagen anterior"
                >
                  <Icon name="arrow-left" size={18} />
                </button>
                <span aria-live="polite">
                  {galleryPosition} / {String(galleryCount).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={() => moveGallery(1)}
                  aria-label="Imagen siguiente"
                >
                  <Icon name="arrow-right" size={18} />
                </button>
              </div>
            </div>
          </div>
        )}
      </DemoDialog>
    </div>
  );
}
