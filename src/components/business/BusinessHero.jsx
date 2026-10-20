import ContactButton from '../ContactButton';
import Icon from '../Icon';
import { getHeroSecondaryHref } from '../../utils/business';

export default function BusinessHero({ business }) {
  const { hero, theme, contact, location } = business;
  const secondaryHref = getHeroSecondaryHref(business);
  const heroImage = (
    <img
      src={hero.image.src}
      alt={hero.image.alt}
      width={hero.image.width}
      height={hero.image.height}
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );

  return (
    <section id="inicio" className={`site-hero site-hero--${theme.heroStyle}`}>
      {theme.heroStyle === 'overlay' && (
        <div className="site-hero__media">{heroImage}</div>
      )}

      <div className="business-container site-hero__inner">
        <div className="site-hero__content">
          <span className="site-eyebrow">{hero.eyebrow}</span>

          <h1 className="site-hero__title">
            {hero.title} <span className="site-hero__accent">{hero.titleAccent}</span>
          </h1>

          <p className="site-hero__lead">{hero.description}</p>

          <div className="site-hero__actions">
            <ContactButton business={business} label={hero.primaryCta.label} />
            <a className="site-btn site-btn--ghost" href={secondaryHref}>
              {hero.secondaryCta.label}
              <Icon name="arrow-right" size={17} />
            </a>
          </div>

          <ul className="site-hero__features">
            {hero.features.map((feature) => (
              <li key={feature}>
                <Icon name="check" size={15} />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {theme.heroStyle === 'split' && (
          <div className="site-hero__visual">
            <div className="site-hero__frame">{heroImage}</div>
            <div className="site-hero__card">
              <span className="site-hero__card-icon">
                <Icon name="pin" size={18} />
              </span>
              <span>
                <strong>{location}</strong>
                <small>{contact.addressNote || contact.address}</small>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
