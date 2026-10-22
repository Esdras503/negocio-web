import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DemoBar from '../components/business/DemoBar';
import DemoDialog from '../components/DemoDialog';
import Icon from '../components/Icon';
import { useDisclosure } from '../hooks/useDisclosure';
import { buildMapUrl, buildPhoneHref, buildWhatsAppUrl } from '../utils/business';
import { resolveThemeStyles } from '../utils/theme';
import '../styles/bienes-raices.css';

const NAV_ITEMS = [
  { label: 'Propiedades', href: '#propiedades' },
  { label: 'Categorías', href: '#categorias' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Propietarios', href: '#propietarios' },
  { label: 'Contacto', href: '#contacto' },
];

const OPERATIONS = [
  { value: 'todas', label: 'Todas' },
  { value: 'venta', label: 'Venta' },
  { value: 'alquiler', label: 'Alquiler' },
];

const TYPES = [
  { value: 'todos', label: 'Todos' },
  { value: 'casa', label: 'Casas' },
  { value: 'apartamento', label: 'Apartamentos' },
  { value: 'terreno', label: 'Terrenos' },
];

const TYPE_LABELS = {
  casa: 'Casa',
  apartamento: 'Apartamento',
  terreno: 'Terreno',
};

const OPERATION_LABELS = {
  venta: 'En venta',
  alquiler: 'En alquiler',
};

export default function BienesRaicesTemplate({ business }) {
  const { isOpen, close, toggle } = useDisclosure();
  const [operation, setOperation] = useState('todas');
  const [type, setType] = useState('todos');
  const [query, setQuery] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const closeProperty = useCallback(() => setSelectedProperty(null), []);
  const themeStyles = resolveThemeStyles(business.theme);
  const whatsappUrl = buildWhatsAppUrl(business);
  const mapUrl = buildMapUrl(business.contact.mapQuery || business.contact.address);
  const phoneHref = buildPhoneHref(business.contact.phone);
  const { hero, properties, categories, about, owners, contact, footer } = business;

  const filteredProperties = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return properties.items.filter((property) => {
      const matchesOperation =
        operation === 'todas' || property.operation === operation;
      const matchesType = type === 'todos' || property.type === type;
      const haystack = [
        property.title,
        property.location,
        property.zone,
        property.summary,
        TYPE_LABELS[property.type],
      ]
        .join(' ')
        .toLowerCase();
      const matchesQuery = normalizedQuery === '' || haystack.includes(normalizedQuery);

      return matchesOperation && matchesType && matchesQuery;
    });
  }, [operation, properties.items, query, type]);

  const scrollToProperties = () => {
    document.getElementById('propiedades')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const applyCategory = (category) => {
    setOperation(category.operation || 'todas');
    setType(category.type || 'todos');
    setQuery('');
    scrollToProperties();
  };

  const handleSearch = (event) => {
    event.preventDefault();
    scrollToProperties();
  };

  const clearFilters = () => {
    setOperation('todas');
    setType('todos');
    setQuery('');
  };

  return (
    <div className="hab-site" style={themeStyles}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <DemoBar />

      <header className="hab-header">
        <div className="hab-shell hab-header__inner">
          <a className="hab-brand" href="#inicio" aria-label={`${business.name}, inicio`}>
            <span className="hab-brand__mark" aria-hidden="true">
              {business.logo.text}
            </span>
            <span>
              <strong>{business.name}</strong>
              <small>Inmobiliaria</small>
            </span>
          </a>

          <nav className="hab-nav" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="hab-header__cta" href="#contacto">
            Hablar con un asesor
            <Icon name="arrow-up-right" size={15} />
          </a>

          <button
            className="hab-menu-button"
            type="button"
            aria-expanded={isOpen}
            aria-controls="hab-mobile-nav"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={toggle}
          >
            <Icon name={isOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>

        {isOpen && (
          <div className="hab-mobile-nav" id="hab-mobile-nav">
            <nav aria-label="Navegación móvil">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} onClick={close}>
                  {item.label}
                  <Icon name="arrow-up-right" size={16} />
                </a>
              ))}
            </nav>
            <a className="hab-btn hab-btn--primary" href="#contacto" onClick={close}>
              <Icon name="message" size={18} />
              Hablar con un asesor
            </a>
          </div>
        )}
      </header>

      <main id="contenido">
        <section className="hab-hero" id="inicio" aria-labelledby="hab-hero-title">
          <div className="hab-shell hab-hero__grid">
            <div className="hab-hero__content">
              <p className="hab-kicker">{hero.eyebrow}</p>
              <h1 id="hab-hero-title">
                {hero.title}
                <em>{hero.titleAccent}</em>
              </h1>
              <p className="hab-hero__description">{hero.description}</p>

              <div className="hab-hero__actions">
                <a className="hab-btn hab-btn--primary" href="#propiedades">
                  {hero.primaryCta.label}
                  <Icon name="arrow-right" size={18} />
                </a>
                <a className="hab-btn hab-btn--ghost" href="#contacto">
                  {hero.secondaryCta.label}
                </a>
              </div>

              <ul className="hab-hero__features">
                {hero.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={14} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="hab-hero__visual">
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                width={hero.image.width}
                height={hero.image.height}
                fetchPriority="high"
              />
              <span className="hab-hero__badge">
                <Icon name="home" size={18} />
                {properties.items.length} fichas de demostración
              </span>
              <div className="hab-hero__caption">
                <span>Explora con calma</span>
                <span>Datos ilustrativos</span>
              </div>
            </div>
          </div>

          <div className="hab-shell">
            <form className="hab-search" onSubmit={handleSearch}>
              <label htmlFor="hab-hero-search">{hero.search.label}</label>
              <div className="hab-search__field">
                <Icon name="search" size={19} />
                <input
                  id="hab-hero-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={hero.search.placeholder}
                />
                <button className="hab-btn hab-btn--primary" type="submit">
                  Buscar
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="hab-categories" id="categorias" aria-labelledby="hab-categories-title">
          <div className="hab-shell">
            <div className="hab-section-head">
              <div>
                <p className="hab-kicker">{categories.eyebrow}</p>
                <h2 id="hab-categories-title">{categories.title}</h2>
              </div>
            </div>

            <div className="hab-categories__grid">
              {categories.items.map((category) => (
                <button
                  className="hab-category"
                  type="button"
                  key={category.title}
                  onClick={() => applyCategory(category)}
                  aria-label={`Ver propiedades: ${category.title}`}
                >
                  <img
                    src={category.image.src}
                    alt={category.image.alt}
                    width={category.image.width}
                    height={category.image.height}
                    loading="lazy"
                  />
                  <span className="hab-category__overlay" aria-hidden="true" />
                  <span className="hab-category__body">
                    <strong>{category.title}</strong>
                    <span>{category.description}</span>
                    <span className="hab-category__link">
                      Explorar
                      <Icon name="arrow-up-right" size={15} />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="hab-properties" id="propiedades" aria-labelledby="hab-properties-title">
          <div className="hab-shell">
            <div className="hab-section-head hab-section-head--split">
              <div>
                <p className="hab-kicker">{properties.eyebrow}</p>
                <h2 id="hab-properties-title">{properties.title}</h2>
              </div>
              <p>{properties.description}</p>
            </div>

            <div className="hab-filters">
              <div className="hab-filters__group" role="group" aria-label="Filtrar por operación">
                <span className="hab-filters__label">Operación</span>
                <div className="hab-filters__buttons">
                  {OPERATIONS.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={operation === item.value ? 'is-active' : ''}
                      aria-pressed={operation === item.value}
                      onClick={() => setOperation(item.value)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hab-filters__group" role="group" aria-label="Filtrar por tipo de propiedad">
                <span className="hab-filters__label">Tipo</span>
                <div className="hab-filters__buttons">
                  {TYPES.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className={type === item.value ? 'is-active' : ''}
                      aria-pressed={type === item.value}
                      onClick={() => setType(item.value)}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hab-filters__search">
                <label htmlFor="hab-filter-search">Buscar</label>
                <div>
                  <Icon name="search" size={16} />
                  <input
                    id="hab-filter-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Zona o nombre"
                  />
                </div>
              </div>

              <button className="hab-filters__reset" type="button" onClick={clearFilters}>
                Limpiar filtros
              </button>
            </div>

            <div className="hab-results-meta" aria-live="polite">
              <span>
                {filteredProperties.length}{' '}
                {filteredProperties.length === 1 ? 'propiedad' : 'propiedades'} en la
                demostración
              </span>
              <span>{properties.priceNote}</span>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="hab-properties__grid">
                {filteredProperties.map((property, index) => (
                  <article className="hab-card" key={property.id}>
                    <button
                      className="hab-card__media"
                      type="button"
                      onClick={() => setSelectedProperty(property)}
                      aria-label={`Ver ficha de ${property.title}`}
                    >
                      <img
                        src={property.image.src}
                        alt={property.image.alt}
                        width={property.image.width}
                        height={property.image.height}
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                      <span className="hab-card__operation">
                        {OPERATION_LABELS[property.operation]}
                      </span>
                      <span className="hab-card__type">{TYPE_LABELS[property.type]}</span>
                      <span className="hab-card__open">
                        Ver ficha
                        <Icon name="arrow-up-right" size={14} />
                      </span>
                    </button>

                    <div className="hab-card__body">
                      <div className="hab-card__heading">
                        <h3>{property.title}</h3>
                        <strong>{property.price}</strong>
                      </div>
                      <p className="hab-card__location">
                        <Icon name="pin" size={14} />
                        {property.location} · {property.zone}
                      </p>
                      <p className="hab-card__summary">{property.summary}</p>
                      <ul className="hab-card__facts">
                        {property.beds && (
                          <li>
                            <Icon name="bed" size={15} />
                            {property.beds} hab.
                          </li>
                        )}
                        {property.baths && (
                          <li>
                            <Icon name="bath" size={15} />
                            {property.baths} baños
                          </li>
                        )}
                        {property.parking && (
                          <li>
                            <Icon name="car" size={15} />
                            {property.parking} parqueo
                          </li>
                        )}
                        <li>
                          <Icon name="ruler" size={15} />
                          {property.area}
                        </li>
                      </ul>
                    </div>
                  </article>
                ))}

                <article className="hab-card hab-card--advisor">
                  <span className="hab-card__advisor-icon" aria-hidden="true">
                    <Icon name="message" size={24} />
                  </span>
                  <h3>¿Buscas algo distinto?</h3>
                  <p>
                    Cuéntanos qué tipo de espacio tienes en mente y sigamos la
                    conversación con un asesor de demostración.
                  </p>
                  <a className="hab-btn hab-btn--light" href="#contacto">
                    Conversar con un asesor
                    <Icon name="arrow-right" size={16} />
                  </a>
                </article>
              </div>
            ) : (
              <div className="hab-empty" role="status">
                <Icon name="search" size={28} />
                <h3>No encontramos propiedades con esos filtros.</h3>
                <p>Prueba con otra operación, tipo de inmueble o zona.</p>
                <button className="hab-btn hab-btn--primary" type="button" onClick={clearFilters}>
                  Ver todas las propiedades
                </button>
              </div>
            )}

            <p className="hab-properties__note">
              Abre una ficha para comparar detalles y consultar por WhatsApp. Ninguna
              propiedad es real ni está disponible.
            </p>
          </div>
        </section>

        <section className="hab-about" id="nosotros" aria-labelledby="hab-about-title">
          <div className="hab-shell hab-about__grid">
            <div className="hab-about__media">
              <img
                src={about.image.src}
                alt={about.image.alt}
                width={about.image.width}
                height={about.image.height}
                loading="lazy"
              />
            </div>
            <div className="hab-about__content">
              <p className="hab-kicker">{about.eyebrow}</p>
              <h2 id="hab-about-title">{about.title}</h2>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul>
                {about.points.map((point) => (
                  <li key={point}>
                    <Icon name="check" size={15} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="hab-owners" id="propietarios" aria-labelledby="hab-owners-title">
          <div className="hab-shell hab-owners__grid">
            <div className="hab-owners__content">
              <p className="hab-kicker hab-kicker--light">{owners.eyebrow}</p>
              <h2 id="hab-owners-title">{owners.title}</h2>
              <p>{owners.description}</p>
              <ol>
                {owners.steps.map((step, index) => (
                  <li key={step}>
                    <span>0{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
              <a
                className="hab-btn hab-btn--light"
                href={buildWhatsAppUrl(
                  business,
                  'Hola, vi el sitio de Habita y quiero conversar sobre publicar una propiedad de demostración.',
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={18} />
                {owners.buttonLabel}
              </a>
            </div>

            <aside className="hab-owners__card">
              <span className="hab-owners__icon" aria-hidden="true">
                <Icon name="home" size={27} />
              </span>
              <h3>Una ficha clara desde el inicio.</h3>
              <p>
                En esta demostración puedes recorrer el flujo de contacto. Los datos que
                se muestran no corresponden a propiedades reales.
              </p>
              <dl>
                <div>
                  <dt>Paso inicial</dt>
                  <dd>Datos básicos y fotografías</dd>
                </div>
                <div>
                  <dt>Siguiente paso</dt>
                  <dd>Revisión y coordinación de visita</dd>
                </div>
              </dl>
              <span className="hab-owners__note">{contact.note}</span>
            </aside>
          </div>
        </section>

        <section className="hab-contact" id="contacto" aria-labelledby="hab-contact-title">
          <div className="hab-shell hab-contact__grid">
            <div>
              <p className="hab-kicker">{contact.eyebrow}</p>
              <h2 id="hab-contact-title">{contact.title}</h2>
              <p>{contact.description}</p>
              <div className="hab-contact__actions">
                <a
                  className="hab-btn hab-btn--primary"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={18} />
                  {contact.whatsappLabel}
                </a>
                {phoneHref && (
                  <a className="hab-btn hab-btn--ghost" href={phoneHref}>
                    <Icon name="phone" size={18} />
                    Llamar
                  </a>
                )}
              </div>
            </div>

            <div className="hab-contact__card">
              <div>
                <span>
                  <Icon name="pin" size={17} />
                  Oficina de demostración
                </span>
                <strong>{contact.address}</strong>
                <small>{contact.addressNote}</small>
                {mapUrl && (
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                    Ver en Google Maps
                    <Icon name="arrow-up-right" size={14} />
                  </a>
                )}
              </div>
              <div>
                <span>
                  <Icon name="clock" size={17} />
                  Horarios
                </span>
                {contact.hours.map((entry) => (
                  <p className="hab-hours" key={entry.days}>
                    <span>{entry.days}</span>
                    <span>{entry.time}</span>
                  </p>
                ))}
              </div>
              <p className="hab-contact__note">{contact.note}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="hab-footer">
        <div className="hab-shell hab-footer__top">
          <div className="hab-footer__brand">
            <span className="hab-brand__mark" aria-hidden="true">
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
        <div className="hab-shell hab-footer__bottom">
          <p>
            Sitio web de demostración creado por <Link to="/">Nexobyte</Link>. Propiedades,
            precios, nombres y datos de contacto son ilustrativos.
          </p>
          <span>© {new Date().getFullYear()} Habita · Demo</span>
        </div>
      </footer>

      <DemoDialog
        open={Boolean(selectedProperty)}
        onClose={closeProperty}
        titleId="hab-property-dialog-title"
        className="hab-property-dialog"
      >
        {selectedProperty && (
          <>
            <img
              className="hab-property-dialog__image"
              src={selectedProperty.image.src}
              alt={selectedProperty.image.alt}
              width={selectedProperty.image.width}
              height={selectedProperty.image.height}
            />
            <div className="hab-property-dialog__body">
              <div className="hab-property-dialog__tags">
                <span>{OPERATION_LABELS[selectedProperty.operation]}</span>
                <span>{TYPE_LABELS[selectedProperty.type]}</span>
              </div>
              <h3 id="hab-property-dialog-title">{selectedProperty.title}</h3>
              <p className="hab-property-dialog__location">
                <Icon name="pin" size={15} />
                {selectedProperty.location} · {selectedProperty.zone}
              </p>
              <strong className="hab-property-dialog__price">{selectedProperty.price}</strong>

              <dl className="hab-property-dialog__meta">
                {selectedProperty.beds && (
                  <div>
                    <dt>Habitaciones</dt>
                    <dd>{selectedProperty.beds}</dd>
                  </div>
                )}
                {selectedProperty.baths && (
                  <div>
                    <dt>Baños</dt>
                    <dd>{selectedProperty.baths}</dd>
                  </div>
                )}
                {selectedProperty.parking && (
                  <div>
                    <dt>Parqueo</dt>
                    <dd>{selectedProperty.parking}</dd>
                  </div>
                )}
                <div>
                  <dt>Área</dt>
                  <dd>{selectedProperty.area}</dd>
                </div>
              </dl>

              <p>{selectedProperty.description}</p>

              <ul className="hab-property-dialog__features">
                {selectedProperty.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={14} />
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="hab-property-dialog__note">
                Ficha ilustrativa de demostración. No representa una propiedad real disponible.
              </p>

              <div className="hab-property-dialog__actions">
                <a
                  className="hab-btn hab-btn--primary"
                  href={buildWhatsAppUrl(
                    business,
                    `Hola, vi la ficha de ${selectedProperty.title} en el sitio de Habita y quiero consultar sobre esta propiedad de demostración.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={17} />
                  Consultar por WhatsApp
                </a>
                <a className="hab-btn hab-btn--ghost" href="#contacto" onClick={closeProperty}>
                  Agendar una conversación
                </a>
              </div>
            </div>
          </>
        )}
      </DemoDialog>
    </div>
  );
}
