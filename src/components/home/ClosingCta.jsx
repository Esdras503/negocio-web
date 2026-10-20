import Icon from '../Icon';
import { agency } from '../../data/agency';
import { buildAgencyWhatsAppUrl } from '../../utils/agency';

export default function ClosingCta() {
  const whatsappHref = buildAgencyWhatsAppUrl(agency);

  return (
    <section className="studio-closing">
      <div className="studio-container">
        <div className="studio-closing__panel">
          <span className="studio-eyebrow studio-eyebrow--light">Hablemos</span>
          <h2>¿Ya imaginaste tu negocio con este nivel de detalle?</h2>
          <p>
            Explora las demostraciones y elige la que más se parezca a lo que
            buscas. Desde ahí, el contenido y el diseño se adaptan a ti.
          </p>

          <div className="studio-closing__actions">
            <a className="studio-button studio-button--light" href="#demos">
              Ver las demostraciones
              <Icon name="arrow-right" size={18} />
            </a>
            {whatsappHref && (
              <a
                className="studio-button studio-button--outline-light"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={18} />
                Hablemos por WhatsApp
              </a>
            )}
            {!whatsappHref && agency.email && (
              <a
                className="studio-button studio-button--outline-light"
                href={`mailto:${agency.email}`}
              >
                <Icon name="mail" size={18} />
                Escribir un correo
              </a>
            )}
          </div>

          <small className="studio-closing__note">
            Los negocios y datos de las demostraciones son ficticios.
          </small>
        </div>
      </div>
    </section>
  );
}
