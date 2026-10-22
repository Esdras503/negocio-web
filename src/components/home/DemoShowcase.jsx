import { Link } from 'react-router-dom';
import Icon from '../Icon';
import { demoBusinesses } from '../../data/demoBusinesses';

export default function DemoShowcase() {
  return (
    <section className="studio-demos" id="demos">
      <div className="studio-container">
        <div className="studio-section-heading studio-section-heading--split">
          <div>
            <span className="studio-eyebrow">Demostraciones</span>
            <h2>Una base sólida. Tres identidades distintas.</h2>
          </div>
          <p>
            Tres sitios completos, cada uno con su propia identidad visual,
            su menú y su forma de contar el negocio. Entra, navega y revisa
            cada detalle.
          </p>
        </div>

        <div className="demo-grid">
          {demoBusinesses.map((business) => (
            <article
              className="demo-card"
              key={business.id}
              style={{ '--demo-accent': business.theme.primary }}
            >
              <Link
                to={`/demo/${business.id}`}
                className="demo-card__link"
              >
                <div className="demo-card__media">
                  <img
                    src={business.hero.image.src}
                    alt={business.hero.image.alt}
                    width={business.hero.image.width}
                    height={business.hero.image.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="demo-card__badge">Demo</span>
                </div>

                <div className="demo-card__body">
                  <span className="demo-card__sector">{business.sector}</span>
                  <h3>{business.name}</h3>
                  <p>{business.hero.description}</p>

                  <div className="demo-card__footer">
                    <span className="demo-card__swatches" aria-hidden="true">
                      <span style={{ backgroundColor: business.theme.primary }} />
                      <span style={{ backgroundColor: business.theme.accent }} />
                      <span
                        className="demo-card__swatch--light"
                        style={{ backgroundColor: business.theme.background }}
                      />
                    </span>
                    <span className="demo-card__open">
                      Ver demostración
                      <Icon name="arrow-right" size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <p className="demo-grid__note">
          <Icon name="shield" size={16} />
          Los nombres, textos, precios y datos de contacto de estas demos son
          ficticios y sirven como propuesta visual.
        </p>
      </div>
    </section>
  );
}
