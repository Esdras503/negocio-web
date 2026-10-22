import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import DemoBar from '../components/business/DemoBar';
import DemoDialog from '../components/DemoDialog';
import Icon from '../components/Icon';
import { useDemoForm } from '../hooks/useDemoForm';
import { useDisclosure } from '../hooks/useDisclosure';
import { buildMapUrl, buildPhoneHref, buildWhatsAppUrl } from '../utils/business';
import { resolveThemeStyles } from '../utils/theme';
import '../styles/arquitectura.css';

const NAV_ITEMS = [
  { label: 'Estudio', href: '#estudio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Proceso', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
];

const INITIAL_FORM = {
  name: '',
  contact: '',
  projectType: '',
  message: '',
};

function validateConsultation(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Escribe tu nombre.';
  if (values.contact.trim().length < 5) {
    errors.contact = 'Escribe un teléfono o correo de contacto.';
  }
  if (!values.projectType) errors.projectType = 'Selecciona el tipo de proyecto.';
  return errors;
}

export default function ArquitecturaTemplate({ business }) {
  const { isOpen, close, toggle } = useDisclosure();
  const [selectedProject, setSelectedProject] = useState(null);
  const closeProject = useCallback(() => setSelectedProject(null), []);
  const themeStyles = resolveThemeStyles(business.theme);
  const whatsappUrl = buildWhatsAppUrl(business);
  const mapUrl = buildMapUrl(business.contact.mapQuery || business.contact.address);
  const phoneHref = buildPhoneHref(business.contact.phone);
  const { hero, about, services, projects, process, approach, faq, consultation, cta, contact, footer } =
    business;
  const { values, errors, status, handleChange, handleSubmit, reset } = useDemoForm({
    initialValues: INITIAL_FORM,
    validate: validateConsultation,
  });

  return (
    <div className="arq-site" style={themeStyles}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <DemoBar />

      <header className="arq-header">
        <div className="arq-shell arq-header__inner">
          <a className="arq-brand" href="#inicio" aria-label={`${business.name}, inicio`}>
            <span className="arq-brand__mark" aria-hidden="true">
              {business.logo.text}
            </span>
            <span>
              <strong>{business.name}</strong>
              <small>Arquitectura &amp; construcción</small>
            </span>
          </a>

          <nav className="arq-nav" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="arq-header__cta" href="#consulta">
            Solicitar consulta
            <Icon name="arrow-up-right" size={15} />
          </a>

          <button
            className="arq-menu-button"
            type="button"
            aria-expanded={isOpen}
            aria-controls="arq-mobile-nav"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={toggle}
          >
            <Icon name={isOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>

        {isOpen && (
          <div className="arq-mobile-nav" id="arq-mobile-nav">
            <nav aria-label="Navegación móvil">
              {NAV_ITEMS.map((item, index) => (
                <a key={item.href} href={item.href} onClick={close}>
                  <span>0{index + 1}</span>
                  {item.label}
                  <Icon name="arrow-up-right" size={16} />
                </a>
              ))}
            </nav>
            <a href="#consulta" className="arq-text-link" onClick={close}>
              Solicitar una consulta
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
        )}
      </header>

      <main id="contenido">
        <section className="arq-hero" id="inicio" aria-labelledby="arq-hero-title">
          <img
            className="arq-hero__image"
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            fetchPriority="high"
          />
          <div className="arq-hero__shade" aria-hidden="true" />

          <div className="arq-shell arq-hero__inner">
            <div className="arq-hero__panel">
              <p className="arq-kicker">{hero.eyebrow}</p>
              <h1 id="arq-hero-title">
                {hero.title}
                <em>{hero.titleAccent}</em>
              </h1>
              <p>{hero.description}</p>
              <div className="arq-hero__actions">
                <a className="arq-link-button" href="#consulta">
                  {hero.primaryCta.label}
                  <Icon name="arrow-right" size={17} />
                </a>
                <a className="arq-link-button arq-link-button--muted" href="#proyectos">
                  {hero.secondaryCta.label}
                </a>
              </div>
            </div>

            <p className="arq-hero__side">
              <span>Estudio Alba</span>
              <span>Santa Ana / El Salvador</span>
            </p>
          </div>

          <div className="arq-hero__foot">
            <span>Arquitectura residencial</span>
            <span>Interiorismo</span>
            <span>Construcción</span>
            <span>Remodelación</span>
          </div>
        </section>

        <section className="arq-about" id="estudio" aria-labelledby="arq-about-title">
          <div className="arq-shell arq-about__grid">
            <div className="arq-about__heading">
              <p className="arq-kicker">{about.eyebrow}</p>
              <span className="arq-number">01</span>
              <h2 id="arq-about-title">{about.title}</h2>
            </div>

            <div className="arq-about__copy">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <figure>
                <img
                  src={about.image.src}
                  alt={about.image.alt}
                  width={about.image.width}
                  height={about.image.height}
                  loading="lazy"
                />
                <figcaption>{about.note}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="arq-services" id="servicios" aria-labelledby="arq-services-title">
          <div className="arq-shell">
            <div className="arq-section-head">
              <div>
                <p className="arq-kicker">{services.eyebrow}</p>
                <h2 id="arq-services-title">{services.title}</h2>
              </div>
              <p>{services.description}</p>
            </div>

            <div className="arq-services__list">
              {services.items.map((service) => (
                <article className="arq-service" key={service.number}>
                  <span className="arq-service__number">{service.number}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>
                        <Icon name="check" size={13} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a href="#consulta" aria-label={`Consultar por ${service.title}`}>
                    <Icon name="arrow-up-right" size={19} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="arq-projects" id="proyectos" aria-labelledby="arq-projects-title">
          <div className="arq-shell">
            <div className="arq-section-head arq-section-head--split">
              <div>
                <p className="arq-kicker">{projects.eyebrow}</p>
                <h2 id="arq-projects-title">{projects.title}</h2>
              </div>
              <p>{projects.description}</p>
            </div>

            <div className="arq-projects__grid">
              {projects.items.map((project, index) => (
                <article className={`arq-project arq-project--${index + 1}`} key={project.id}>
                  <button
                    className="arq-project__media"
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    aria-label={`Ver ficha del proyecto ${project.title}`}
                  >
                    <img
                      src={project.image.src}
                      alt={project.image.alt}
                      width={project.image.width}
                      height={project.image.height}
                      loading="lazy"
                    />
                    <span className="arq-project__open">
                      Ver ficha
                      <Icon name="arrow-up-right" size={15} />
                    </span>
                  </button>
                  <div className="arq-project__caption">
                    <div>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                    </div>
                    <span>
                      {project.location} · {project.year}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="arq-process" id="proceso" aria-labelledby="arq-process-title">
          <div className="arq-shell arq-process__grid">
            <div className="arq-process__intro">
              <p className="arq-kicker arq-kicker--light">{process.eyebrow}</p>
              <h2 id="arq-process-title">{process.title}</h2>
            </div>
            <ol className="arq-process__list">
              {process.steps.map((step, index) => (
                <li key={step.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="arq-approach" aria-labelledby="arq-approach-title">
          <div className="arq-approach__visual">
            <img
              src={approach.image.src}
              alt={approach.image.alt}
              width={approach.image.width}
              height={approach.image.height}
              loading="lazy"
            />
            <div className="arq-approach__quote">
              <p className="arq-kicker arq-kicker--light">{approach.eyebrow}</p>
              <h2 id="arq-approach-title">{approach.title}</h2>
              <p>{approach.description}</p>
            </div>
          </div>
          <div className="arq-shell arq-approach__principles">
            {approach.principles.map((principle, index) => (
              <article key={principle.title}>
                <span>0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="arq-faq" aria-labelledby="arq-faq-title">
          <div className="arq-shell arq-faq__grid">
            <div>
              <p className="arq-kicker">{faq.eyebrow}</p>
              <h2 id="arq-faq-title">{faq.title}</h2>
            </div>
            <div className="arq-faq__list">
              {faq.items.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>
                    {item.question}
                    <Icon name="plus" size={17} />
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="arq-consultation" id="consulta" aria-labelledby="arq-consultation-title">
          <div className="arq-shell arq-consultation__grid">
            <div className="arq-consultation__intro">
              <p className="arq-kicker">{consultation.eyebrow}</p>
              <h2 id="arq-consultation-title">{consultation.title}</h2>
              <p>{consultation.description}</p>
              <div className="arq-consultation__contact">
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
              <p className="arq-consultation__note">{contact.note}</p>
            </div>

            <div className="arq-form-wrap">
              {status === 'success' ? (
                <div className="arq-form-success" role="status">
                  <span aria-hidden="true">
                    <Icon name="check" size={25} />
                  </span>
                  <h3>Consulta de demostración registrada.</h3>
                  <p>
                    En un sitio real, el estudio recibiría la información y coordinaría
                    una primera conversación.
                  </p>
                  <button type="button" className="arq-link-button" onClick={reset}>
                    Enviar otra consulta
                  </button>
                </div>
              ) : (
                <form className="arq-form" onSubmit={handleSubmit} noValidate>
                  <div className="arq-form__head">
                    <span>Formulario de demostración</span>
                    <strong>Cuéntanos sobre el espacio</strong>
                  </div>

                  {status === 'error' && (
                    <p className="arq-form__alert" role="alert">
                      Revisa los campos marcados para continuar.
                    </p>
                  )}

                  <div className="arq-field">
                    <label htmlFor="arq-name">Nombre</label>
                    <input
                      id="arq-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Tu nombre"
                      value={values.name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'arq-name-error' : undefined}
                    />
                    {errors.name && (
                      <span id="arq-name-error" className="arq-field__error">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="arq-field">
                    <label htmlFor="arq-contact">Teléfono o correo</label>
                    <input
                      id="arq-contact"
                      name="contact"
                      type="text"
                      autoComplete="tel"
                      placeholder="Cómo podemos contactarte"
                      value={values.contact}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.contact)}
                      aria-describedby={errors.contact ? 'arq-contact-error' : undefined}
                    />
                    {errors.contact && (
                      <span id="arq-contact-error" className="arq-field__error">
                        {errors.contact}
                      </span>
                    )}
                  </div>

                  <div className="arq-field">
                    <label htmlFor="arq-project-type">Tipo de proyecto</label>
                    <select
                      id="arq-project-type"
                      name="projectType"
                      value={values.projectType}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.projectType)}
                      aria-describedby={errors.projectType ? 'arq-project-type-error' : undefined}
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="vivienda">Vivienda nueva</option>
                      <option value="remodelacion">Remodelación o ampliación</option>
                      <option value="interiorismo">Interiorismo</option>
                      <option value="otro">Otro proyecto</option>
                    </select>
                    {errors.projectType && (
                      <span id="arq-project-type-error" className="arq-field__error">
                        {errors.projectType}
                      </span>
                    )}
                  </div>

                  <div className="arq-field">
                    <label htmlFor="arq-message">Cuéntanos un poco más</label>
                    <textarea
                      id="arq-message"
                      name="message"
                      rows="4"
                      placeholder="Tipo de espacio, etapa del proyecto o idea inicial"
                      value={values.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button className="arq-link-button arq-form__submit" type="submit">
                    Enviar consulta de demostración
                    <Icon name="arrow-right" size={17} />
                  </button>
                  <p className="arq-form__privacy">
                    Demostración: el formulario valida en tu navegador y no envía datos
                    a un servidor.
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="arq-cta" aria-labelledby="arq-cta-title">
          <div className="arq-shell arq-cta__inner">
            <div>
              <p className="arq-kicker arq-kicker--light">{cta.eyebrow}</p>
              <h2 id="arq-cta-title">{cta.title}</h2>
              <p>{cta.description}</p>
            </div>
            <a className="arq-link-button arq-link-button--light" href="#consulta">
              {cta.buttonLabel}
              <Icon name="arrow-up-right" size={17} />
            </a>
          </div>
        </section>

        <section className="arq-contact" id="contacto" aria-labelledby="arq-contact-title">
          <div className="arq-shell arq-contact__grid">
            <div>
              <p className="arq-kicker">Contacto</p>
              <h2 id="arq-contact-title">Visítanos con cita previa.</h2>
              <p>
                Estudio Alba atiende proyectos residenciales y de remodelación en Santa
                Ana y zonas cercanas. Esta dirección es parte de la demostración.
              </p>
              <address>
                <span>
                  <Icon name="pin" size={17} />
                  {contact.address}
                </span>
                <small>{contact.addressNote}</small>
              </address>
              <div className="arq-contact__actions">
                <a className="arq-link-button" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={17} />
                  {contact.whatsappLabel}
                </a>
                {mapUrl && (
                  <a className="arq-link-button arq-link-button--muted" href={mapUrl} target="_blank" rel="noopener noreferrer">
                    Ver mapa
                    <Icon name="arrow-up-right" size={15} />
                  </a>
                )}
              </div>
            </div>

            <div className="arq-contact__hours">
              <p className="arq-kicker">Horarios</p>
              {contact.hours.map((entry) => (
                <div key={entry.days}>
                  <span>{entry.days}</span>
                  <span>{entry.time}</span>
                </div>
              ))}
              <p>{contact.note}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="arq-footer">
        <div className="arq-shell arq-footer__top">
          <div>
            <strong>{business.name}</strong>
            <p>{footer.tagline}</p>
          </div>
          <nav aria-label="Navegación del pie de página">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <Link to="/">Volver al catálogo</Link>
          </nav>
        </div>
        <div className="arq-shell arq-footer__bottom">
          <p>
            Sitio web de demostración creado por <Link to="/">Nexobyte</Link>. Los
            proyectos, nombres y datos mostrados son ilustrativos.
          </p>
          <span>© {new Date().getFullYear()} Estudio Alba · Demo</span>
        </div>
      </footer>

      <DemoDialog
        open={Boolean(selectedProject)}
        onClose={closeProject}
        titleId="arq-project-dialog-title"
        className="arq-project-dialog"
      >
        {selectedProject && (
          <>
            <img
              className="arq-project-dialog__image"
              src={selectedProject.image.src}
              alt={selectedProject.image.alt}
              width={selectedProject.image.width}
              height={selectedProject.image.height}
            />
            <div className="arq-project-dialog__body">
              <p className="arq-kicker">Ficha de proyecto · Demostración</p>
              <h3 id="arq-project-dialog-title">{selectedProject.title}</h3>
              <dl className="arq-project-dialog__meta">
                <div>
                  <dt>Tipo</dt>
                  <dd>{selectedProject.type}</dd>
                </div>
                <div>
                  <dt>Ubicación</dt>
                  <dd>{selectedProject.location}</dd>
                </div>
                <div>
                  <dt>Año</dt>
                  <dd>{selectedProject.year}</dd>
                </div>
                <div>
                  <dt>Área</dt>
                  <dd>{selectedProject.area}</dd>
                </div>
              </dl>
              <p>{selectedProject.description}</p>
              <div className="arq-project-dialog__approach">
                <span>Enfoque</span>
                <p>{selectedProject.approach}</p>
              </div>
              <ul className="arq-project-dialog__details">
                {selectedProject.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <a className="arq-link-button" href="#consulta" onClick={closeProject}>
                Consultar sobre este proyecto
                <Icon name="arrow-right" size={17} />
              </a>
            </div>
          </>
        )}
      </DemoDialog>
    </div>
  );
}
