import SectionIntro from './SectionIntro';

export default function BusinessGallery({ business }) {
  const { gallery } = business;

  return (
    <section id="galeria" className="site-section site-gallery">
      <div className="business-container">
        <SectionIntro
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          description={gallery.description}
        />

        <div className="site-gallery__grid">
          {gallery.images.map((image, index) => (
            <figure className="site-gallery__item" key={image.src}>
              <img
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
              {image.caption && (
                <figcaption>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
