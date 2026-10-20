import ContactButton from '../ContactButton';
import Icon from '../Icon';

export default function BusinessCta({ business }) {
  const { cta } = business;

  return (
    <section className="site-cta" aria-labelledby="site-cta-title">
      <img
        className="site-cta__image"
        src={cta.image.src}
        alt={cta.image.alt}
        width={cta.image.width}
        height={cta.image.height}
        loading="lazy"
        decoding="async"
      />
      <span className="site-cta__overlay" aria-hidden="true" />

      <div className="business-container site-cta__content">
        <span className="site-eyebrow site-eyebrow--light">{cta.eyebrow}</span>
        <h2 id="site-cta-title">{cta.title}</h2>
        <p>{cta.description}</p>

        <ContactButton
          business={business}
          label={cta.buttonLabel}
          className="site-btn site-btn--light"
        />

        <span className="site-cta__hint">
          <Icon name="clock" size={15} />
          Atención directa con el negocio
        </span>
      </div>
    </section>
  );
}
