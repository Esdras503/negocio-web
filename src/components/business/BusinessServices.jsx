import Icon from '../Icon';
import SectionIntro from './SectionIntro';

export default function BusinessServices({ business }) {
  const { services } = business;

  return (
    <section id="servicios" className="site-section site-services">
      <div className="business-container">
        <SectionIntro
          eyebrow={services.eyebrow}
          title={services.title}
          description={services.description}
        />

        <ul className="service-list">
          {services.items.map((item) => (
            <li className="service-card" key={item.id}>
              <span className="service-card__icon">
                <Icon name={item.icon} size={22} />
              </span>

              <div className="service-card__head">
                <h3>{item.name}</h3>
                {item.price && <span className="service-card__price">{item.price}</span>}
              </div>

              <p>{item.description}</p>

              {item.tag && <span className="service-card__tag">{item.tag}</span>}
            </li>
          ))}
        </ul>

        {services.note && <p className="site-note">{services.note}</p>}
      </div>
    </section>
  );
}
