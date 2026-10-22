import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { agency } from '../../data/agency';
import { demoCategories } from '../../data/demoCatalog';
import { getDemoById } from '../../data/demoBusinesses';
import { buildAgencyWhatsAppUrl } from '../../utils/agency';

const catalogItems = demoCategories.map((category) => ({
  ...category,
  demo: category.demoId ? getDemoById(category.demoId) : null,
}));

function DemoCategoryCard({ item, index }) {
  const { demo } = item;
  const image = demo?.hero.image ?? item.image;

  const cardContent = (
    <>
      <div className="catalog-card__media">
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
          style={item.imagePosition ? { objectPosition: item.imagePosition } : undefined}
        />
        <span
          className={`catalog-card__status ${
            demo
              ? 'catalog-card__status--available'
              : 'catalog-card__status--pending'
          }`}
        >
          <Icon name={demo ? 'check' : 'clock'} size={13} />
          {demo ? 'Demo disponible' : 'Próximamente'}
        </span>
      </div>

      <div className="catalog-card__body">
        <div className="catalog-card__title">
          <span className="catalog-card__index" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3>{item.name}</h3>
        </div>

        <p className="catalog-card__description">{item.description}</p>

        <ul
          className="catalog-card__examples"
          aria-label={`Ejemplos de negocios: ${item.name}`}
        >
          {item.examples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>

        <div className="catalog-card__footer">
          {demo ? (
            <>
              <span className="catalog-card__demo">{demo.name}</span>
              <span className="catalog-card__cta">
                Ver demo
                <Icon name="arrow-right" size={16} />
              </span>
            </>
          ) : (
            <span className="catalog-card__soon">
              <Icon name="clock" size={14} />
              En preparación
            </span>
          )}
        </div>
      </div>
    </>
  );

  return (
    <article
      className={`catalog-card ${
        demo ? 'catalog-card--available' : 'catalog-card--pending'
      }`}
      style={{ '--catalog-accent': demo?.theme.primary ?? 'var(--studio-green)' }}
    >
      {demo ? (
        <Link
          className="catalog-card__link"
          to={`/demo/${demo.id}`}
          aria-label={`Ver la demostración ${demo.name} para ${item.name}`}
        >
          {cardContent}
        </Link>
      ) : (
        <div className="catalog-card__link">{cardContent}</div>
      )}
    </article>
  );
}

export default function DemoShowcase() {
  const whatsappHref = buildAgencyWhatsAppUrl(agency);
  const availableCount = catalogItems.filter((item) => item.demo).length;
  const pendingCount = catalogItems.length - availableCount;

  return (
    <section className="studio-demos" id="demos">
      <div className="studio-container">
        <div className="studio-section-heading studio-section-heading--split">
          <div>
            <span className="studio-eyebrow">Catálogo de demos</span>
            <h2>Encuentra la página web ideal para tu negocio.</h2>
          </div>

          <div className="catalog-intro">
            <p>
              Explora nuestras demostraciones y descubre cómo podemos adaptar
              un sitio web a la imagen, los servicios y los objetivos de tu
              negocio.
            </p>
            <div className="catalog-summary" aria-label="Estado del catálogo">
              <span>
                <strong>{availableCount}</strong>{' '}
                {availableCount === 1 ? 'demo disponible' : 'demos disponibles'}
              </span>
              <span>
                <strong>{pendingCount}</strong>{' '}
                {pendingCount === 1
                  ? 'categoría próximamente'
                  : 'categorías próximamente'}
              </span>
            </div>
          </div>
        </div>

        <div className="catalog-grid">
          {catalogItems.map((item, index) => (
            <DemoCategoryCard
              item={item}
              index={index}
              key={item.id}
            />
          ))}
        </div>

        <div className="catalog-footer">
          <p className="catalog-note">
            <Icon name="shield" size={16} />
            <span>
              Las demos disponibles usan nombres, textos y datos ficticios. Las
              categorías marcadas como «Próximamente» aún no tienen una página
              publicada.
            </span>
          </p>

          {whatsappHref && (
            <a
              className="catalog-whatsapp"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" size={17} />
              ¿Tienes un negocio de otro sector? Hablemos
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
