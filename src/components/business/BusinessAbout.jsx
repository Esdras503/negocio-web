import SectionIntro from './SectionIntro';

export default function BusinessAbout({ business }) {
  const { about } = business;

  return (
    <section id="nosotros" className="site-section site-about">
      <div className="business-container site-about__grid">
        <figure className="site-about__media">
          <div className="site-about__frame">
            <img
              src={about.image.src}
              alt={about.image.alt}
              width={about.image.width}
              height={about.image.height}
              loading="lazy"
              decoding="async"
            />
          </div>

          {about.quote && (
            <figcaption className="site-about__quote">
              <span className="site-about__quote-mark" aria-hidden="true">
                “
              </span>
              <p>{about.quote}</p>
              {about.quoteAuthor && <small>{about.quoteAuthor}</small>}
            </figcaption>
          )}
        </figure>

        <div className="site-about__content">
          <SectionIntro
            align="left"
            eyebrow={about.eyebrow}
            title={about.title}
          />

          {about.paragraphs.map((paragraph, index) => (
            <p key={index} className="site-about__paragraph">
              {paragraph}
            </p>
          ))}

          {about.stats?.length > 0 && (
            <dl className="site-stats">
              {about.stats.map((stat) => (
                <div className="site-stats__item" key={stat.label}>
                  <dt>{stat.value}</dt>
                  <dd>{stat.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
