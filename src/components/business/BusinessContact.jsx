import ContactButton from '../ContactButton';
import Icon from '../Icon';
import SectionIntro from './SectionIntro';
import {
  buildMapUrl,
  buildPhoneHref,
  buildWhatsAppUrl,
  normalizePhone,
} from '../../utils/business';

export default function BusinessContact({ business }) {
  const { contact, location } = business;
  const mapUrl = buildMapUrl(contact.mapQuery || contact.address);
  const phoneHref = buildPhoneHref(contact.phone);
  const whatsappUrl = buildWhatsAppUrl(business);
  const showWhatsAppRow =
    whatsappUrl && normalizePhone(contact.whatsapp) !== normalizePhone(contact.phone);

  return (
    <section id="contacto" className="site-section site-contact">
      <div className="business-container">
        <SectionIntro
          align="left"
          eyebrow={contact.eyebrow}
          title={contact.title}
          description={contact.description}
          className="site-contact__intro"
        />

        <div className="site-contact__grid">
          <div className="site-contact__details">
            <ul className="contact-list">
              <li className="contact-row">
                <span className="contact-row__icon">
                  <Icon name="pin" size={19} />
                </span>
                <div>
                  <span className="contact-row__label">Dirección</span>
                  {mapUrl ? (
                    <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                      {contact.address}
                      <Icon name="arrow-up-right" size={14} />
                    </a>
                  ) : (
                    <span>{contact.address}</span>
                  )}
                  {contact.addressNote && (
                    <small className="contact-row__note">{contact.addressNote}</small>
                  )}
                </div>
              </li>

              {contact.phone && (
                <li className="contact-row">
                  <span className="contact-row__icon">
                    <Icon name="phone" size={19} />
                  </span>
                  <div>
                    <span className="contact-row__label">Teléfono</span>
                    {phoneHref ? <a href={phoneHref}>{contact.phone}</a> : <span>{contact.phone}</span>}
                  </div>
                </li>
              )}

              {showWhatsAppRow && (
                <li className="contact-row">
                  <span className="contact-row__icon">
                    <Icon name="whatsapp" size={19} />
                  </span>
                  <div>
                    <span className="contact-row__label">WhatsApp</span>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      {contact.whatsapp}
                    </a>
                  </div>
                </li>
              )}

              {contact.email && (
                <li className="contact-row">
                  <span className="contact-row__icon">
                    <Icon name="mail" size={19} />
                  </span>
                  <div>
                    <span className="contact-row__label">Correo</span>
                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                  </div>
                </li>
              )}
            </ul>

            <ContactButton
              business={business}
              label={contact.whatsappLabel}
              className="site-btn site-btn--primary site-contact__cta"
            />
          </div>

          <div className="site-contact__side">
            <div className="hours-card">
              <span className="site-eyebrow">Horario</span>
              <h3>Horarios de atención</h3>
              <dl className="hours-list">
                {contact.hours.map((entry) => (
                  <div className="hours-list__row" key={`${entry.days}-${entry.time}`}>
                    <dt>{entry.days}</dt>
                    <dd>{entry.time}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="location-card">
              <span className="location-card__pin">
                <Icon name="pin" size={21} />
              </span>
              <span className="location-card__label">Ubicación</span>
              <h3>{location}</h3>
              <p>{contact.address}</p>
              {mapUrl && (
                <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                  Cómo llegar
                  <Icon name="arrow-up-right" size={15} />
                </a>
              )}
            </div>
          </div>
        </div>

        {contact.note && <p className="site-note site-contact__note">{contact.note}</p>}
      </div>
    </section>
  );
}
