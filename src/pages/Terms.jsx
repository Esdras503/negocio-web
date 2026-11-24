import { Link } from 'react-router-dom';
import BrandMark from '../components/BrandMark';
import Icon from '../components/Icon';
import { agency } from '../data/agency';
import {
  MEMBERSHIP_ACTIVATION_FEE,
  MEMBERSHIP_TERM_MONTHS,
  formatPlanPrice,
  formatUsd,
  membershipPlans,
  pricingPlans,
} from '../data/pricing';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import '../styles/legal.css';

const CURRENT_YEAR = new Date().getFullYear();
const EXAMPLE_MEMBERSHIP = membershipPlans[0];

export default function Terms() {
  useDocumentMeta({
    title: `Términos y condiciones — ${agency.name}`,
    description:
      'Condiciones comerciales de Nexobyte para compra única, membresías mensuales y membresías anuales de páginas web.',
  });

  return (
    <div className="legal-page">
      <a className="skip-link" href="#contenido-legal">
        Saltar al contenido
      </a>

      <header className="legal-header">
        <div className="studio-container legal-header__inner">
          <Link className="studio-brand" to="/">
            <BrandMark
              name={agency.name}
              image={agency.logo.src}
              imageAlt={agency.logo.alt}
              imageWidth={agency.logo.width}
              imageHeight={agency.logo.height}
              className="brand-mark--studio brand-mark--logo"
            />
            <span className="studio-brand__text">
              <strong>{agency.name}</strong>
              <small>Estudio web</small>
            </span>
          </Link>

          <Link className="studio-button studio-button--small studio-button--ghost" to="/">
            Volver al inicio
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </header>

      <main className="legal-page__main studio-container" id="contenido-legal">
        <div className="legal-hero">
          <span className="studio-eyebrow">Legal</span>
          <h1>Términos y condiciones</h1>
          <p>
            Condiciones comerciales para los servicios de diseño y desarrollo
            web de Nexobyte Estudio Web. Este documento distingue la compra
            única, la membresía mensual y la membresía anual.
          </p>

          <div className="legal-notice" role="note">
            <Icon name="shield" size={19} />
            <p>
              Revisa el alcance, los pagos y los servicios incluidos en tu
              cotización. Las condiciones específicas de cada proyecto se
              confirman por escrito antes de contratar.
            </p>
          </div>

          <p className="legal-updated">Última actualización: noviembre de 2026.</p>
        </div>

        <section className="legal-section" aria-labelledby="legal-identificacion">
          <h2 id="legal-identificacion">1. Identificación y alcance</h2>
          <p>
            Nexobyte Estudio Web es un estudio de diseño y desarrollo de páginas
            web con base en Santa Ana, El Salvador. El canal comercial publicado
            es el WhatsApp {agency.whatsapp}. No se publica una dirección
            comercial ni un correo electrónico de atención.
          </p>
          <p>
            Estos términos aplican a las cotizaciones, contrataciones y
            servicios acordados directamente con Nexobyte. Cada proyecto puede
            tener condiciones adicionales en su cotización, las cuales forman
            parte del acuerdo cuando el cliente las acepta.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="legal-modalidades">
          <h2 id="legal-modalidades">2. Modalidades comerciales</h2>
          <p>Nexobyte ofrece dos modalidades principales:</p>
          <ul>
            <li>
              <strong>Compra única:</strong> el cliente paga una vez por el
              diseño y desarrollo del sitio, según el alcance cotizado. El
              dominio, el alojamiento y los servicios externos se cobran por
              separado, salvo indicación escrita.
            </li>
            <li>
              <strong>Membresía Nexobyte Web:</strong> el cliente paga una cuota
              mensual anticipada o una anualidad anticipada por el servicio. La
              membresía incluye la infraestructura web administrada por Nexobyte
              según el plan y la cotización. El dominio se cobra por separado.
            </li>
          </ul>
          <p>
            La compra única y las membresías son modalidades distintas. La
            contratación de una no convierte automáticamente a la otra ni
            modifica los precios publicados.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="legal-compra-unica">
          <h2 id="legal-compra-unica">3. Compra única</h2>
          <p>
            Los planes de compra única conservan sus precios y características
            publicados. El pago corresponde al diseño y desarrollo del alcance
            acordado; no constituye una suscripción ni genera renovaciones
            automáticas.
          </p>
          <ul className="legal-price-list">
            {pricingPlans.map((plan) => (
              <li key={plan.id}>
                <span>{plan.fullName}</span>
                <strong>{formatPlanPrice(plan)}</strong>
                <small>{plan.priceNote}</small>
              </li>
            ))}
          </ul>
          <p>
            El alcance definitivo, las rondas de ajuste, los tiempos y las
            condiciones de entrega se confirman en la cotización. El dominio,
            el alojamiento y los servicios externos se cotizan aparte.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="legal-mensual">
          <h2 id="legal-mensual">4. Membresía mensual</h2>
          <p>
            La membresía mensual se paga por adelantado. El primer mes incluye
            una cuota única de activación de{' '}
            <strong>{formatUsd(MEMBERSHIP_ACTIVATION_FEE)}</strong> por cliente.
            Esa activación no se repite en las mensualidades posteriores.
          </p>
          <p>
            La mensualidad normal comienza desde el segundo mes. Por ejemplo, un
            plan cuyo precio recurrente es de{' '}
            {formatUsd(EXAMPLE_MEMBERSHIP.monthly.recurring)} se cobra a{' '}
            {formatUsd(EXAMPLE_MEMBERSHIP.monthly.firstMonth)} el primer mes y
            luego a {formatUsd(EXAMPLE_MEMBERSHIP.monthly.recurring)} por mes.
            Los precios vigentes de cada membresía son los publicados en la
            sección Planes y precios.
          </p>
          <div className="legal-table-wrap">
            <table className="legal-table">
              <caption>Precios mensuales oficiales de las membresías</caption>
              <thead>
                <tr>
                  <th scope="col">Plan</th>
                  <th scope="col">Primer mes</th>
                  <th scope="col">Desde el segundo mes</th>
                </tr>
              </thead>
              <tbody>
                {membershipPlans.map((plan) => (
                  <tr key={plan.id}>
                    <th scope="row">{plan.name}</th>
                    <td>{formatUsd(plan.monthly.firstMonth)}</td>
                    <td>{formatUsd(plan.monthly.recurring)}/mes</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="legal-note">
            El primer mes incluye {formatUsd(MEMBERSHIP_ACTIVATION_FEE)} de
            activación. Desde el segundo mes se paga únicamente la mensualidad
            normal del plan. La mensualidad no es una promoción temporal: se
            mantiene según las condiciones vigentes del servicio.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="legal-anual">
          <h2 id="legal-anual">5. Membresía anual</h2>
          <p>
            La membresía anual se paga por adelantado y cubre{' '}
            {MEMBERSHIP_TERM_MONTHS} meses de servicio. No tiene costo de
            activación. El precio anual ya incluye el descuento por pago
            anticipado y equivale aproximadamente a once mensualidades normales.
            Se compara favorablemente con el costo de {MEMBERSHIP_TERM_MONTHS}{' '}
            mensualidades normales.
          </p>
          <div className="legal-table-wrap">
            <table className="legal-table">
              <caption>Precios anuales oficiales y ahorro de referencia</caption>
              <thead>
                <tr>
                  <th scope="col">Plan</th>
                  <th scope="col">12 mensualidades</th>
                  <th scope="col">Precio anual</th>
                  <th scope="col">Ahorro</th>
                </tr>
              </thead>
              <tbody>
                {membershipPlans.map((plan) => (
                  <tr key={plan.id}>
                    <th scope="row">{plan.name}</th>
                    <td>{formatUsd(plan.annual.regularTotal)}</td>
                    <td>{formatUsd(plan.annual.price)}</td>
                    <td>{formatUsd(plan.annual.savings)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="legal-note">
            No se suma la activación a la anualidad. El ahorro mostrado compara
            el precio anual con doce mensualidades normales, sin incluir la
            activación del primer mes de la modalidad mensual.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="legal-pagos">
          <h2 id="legal-pagos">6. Condiciones generales de pago</h2>
          <ul>
            <li>
              Los precios se expresan en dólares estadounidenses (USD) y son de
              referencia. La cotización final puede variar según el alcance, el
              contenido y las funcionalidades adicionales.
            </li>
            <li>
              El pago mensual se realiza por adelantado. El pago anual también
              se realiza por adelantado y cubre {MEMBERSHIP_TERM_MONTHS} meses.
            </li>
            <li>
              La cuota de activación se cobra una sola vez por cliente en la
              modalidad mensual. No aplica a la modalidad anual.
            </li>
            <li>
              Los servicios externos, consumos extraordinarios, comisiones de
              pasarelas de pago y funcionalidades adicionales se cobran aparte
              cuando correspondan.
            </li>
            <li>
              No se implementan cobros automáticos ni una pasarela de
              suscripción desde este sitio. Cualquier pago se coordina por el
              canal acordado en la cotización.
            </li>
          </ul>
        </section>

        <section className="legal-section" aria-labelledby="legal-dominio">
          <h2 id="legal-dominio">7. Dominio, alojamiento e infraestructura</h2>
          <ul>
            <li>El dominio se cobra por separado en ambas modalidades.</li>
            <li>
              En la compra única, el alojamiento y los servicios de
              infraestructura se cotizan aparte, salvo indicación escrita.
            </li>
            <li>
              En las membresías, Nexobyte incluye el uso de la infraestructura
              web que administra, en las condiciones del plan y la cotización.
              Los servicios de infraestructura no incluidos o contratados con
              terceros se cobran aparte.
            </li>
            <li>
              El cliente debe mantener activos su dominio y los servicios
              externos que contrate. La suspensión o pérdida de esos servicios
              puede afectar el funcionamiento del sitio.
            </li>
            <li>
              El uso de la infraestructura debe ser lícito y razonable. No se
              permite usarla para spam, contenido ilegal, abuso de recursos,
              minado, ataques o actividades que afecten a terceros o al
              servicio.
            </li>
          </ul>
        </section>

        <section className="legal-section" aria-labelledby="legal-cancelacion">
          <h2 id="legal-cancelacion">8. Cancelación, suspensión y renovación</h2>
          <ul>
            <li>
              Para solicitar la cancelación o no renovar una membresía, escribe
              al WhatsApp de Nexobyte indicado en la sección de contacto. Incluye
              el nombre del titular, el negocio y el plan contratado. Nexobyte
              confirmará por escrito la recepción de la solicitud y la fecha en
              que termina el servicio.
            </li>
            <li>
              Las membresías no se renuevan automáticamente. Para continuar un
              nuevo período se requiere autorización expresa del cliente y un
              nuevo acuerdo de pago.
            </li>
            <li>
              El servicio mensual se mantiene hasta el final del período pagado.
              La membresía anual se mantiene hasta la fecha de vencimiento del
              período de 12 meses contratado, salvo que la cotización indique
              otra condición acordada por escrito.
            </li>
            <li>
              Solicitar la cancelación antes de terminar un período anual no
              implica por sí solo un reembolso. Toda solicitud de reembolso o
              ajuste se revisa según los servicios prestados, el acuerdo escrito
              y la legislación aplicable.
            </li>
            <li>
              Nexobyte puede suspender el servicio por falta de pago, uso
              indebido de la infraestructura, incumplimiento de estas
              condiciones o requerimiento legal. Cuando sea razonable, se
              avisará antes de la suspensión; en casos de riesgo de seguridad o
              uso ilícito, la suspensión puede ser inmediata.
            </li>
            <li>
              La reactivación después de una suspensión está sujeta a la
              regularización de la situación y a la disponibilidad del servicio.
            </li>
          </ul>
        </section>

        <section className="legal-section" aria-labelledby="legal-datos">
          <h2 id="legal-datos">9. Contenidos y recuperación de datos</h2>
          <p>
            El cliente es responsable de proporcionar contenidos lícitos y de
            contar con los derechos necesarios sobre textos, fotografías,
            logotipos y demás materiales que entregue. Nexobyte puede solicitar
            ajustes o retirar contenido que infrinja derechos de terceros o la
            ley.
          </p>
          <p>
            La recuperación de datos o contenidos eliminados, no resguardados o
            no incluidos en el respaldo contratado se evalúa según el caso, la
            disponibilidad técnica y las condiciones de la cotización. Puede
            generar un costo adicional. No se garantiza la recuperación de
            información que no haya sido respaldada.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="legal-reembolsos">
          <h2 id="legal-reembolsos">10. Reembolsos y ajustes</h2>
          <p>
            Para solicitar un reembolso o ajuste, escribe al WhatsApp de
            Nexobyte indicado en la sección de contacto e identifica el proyecto
            o la membresía. Cada solicitud se evalúa según los servicios
            prestados, las condiciones acordadas por escrito y la legislación
            aplicable. La respuesta y cualquier ajuste aprobado se comunicarán
            por escrito.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="legal-vigencia">
          <h2 id="legal-vigencia">11. Vigencia y cambios</h2>
          <p>
            Estos términos rigen desde su publicación y pueden actualizarse
            cuando cambien los servicios, los precios o las condiciones
            comerciales. La versión vigente será la publicada en esta página.
          </p>
          <p>
            Las condiciones específicas de cada proyecto se confirman por
            escrito en su cotización antes de contratar.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="legal-contacto">
          <h2 id="legal-contacto">12. Contacto</h2>
          <p>
            Para consultas sobre estos términos, planes o membresías, escribe al
            WhatsApp público de Nexobyte:{' '}
            <a
              href={`https://wa.me/${agency.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {agency.whatsapp}
            </a>
            .
          </p>
          <p>
            También puedes volver a la sección{' '}
            <Link to="/#planes">Planes y precios</Link> o solicitar una
            cotización desde la página principal.
          </p>
        </section>

      </main>

      <footer className="legal-footer">
        <div className="studio-container legal-footer__inner">
          <span>
            © {CURRENT_YEAR} {agency.name} · {agency.location}
          </span>
          <div>
            <Link to="/">Inicio</Link>
            <Link to="/#planes">Planes y precios</Link>
            <Link to="/terminos">Términos y condiciones</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
