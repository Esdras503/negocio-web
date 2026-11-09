import { useCallback, useState } from 'react';
import Icon from '../Icon';
import PricingQuoteDialog from './PricingQuoteDialog';
import { agency } from '../../data/agency';
import {
  addOns,
  addOnsNote,
  comparisonRows,
  formatAddOnPrice,
  formatMaintenancePrice,
  formatPlanPrice,
  formatUsd,
  maintenanceNote,
  maintenancePlans,
  pricingFaqs,
  pricingNotes,
  pricingPlans,
} from '../../data/pricing';
import { buildAgencyWhatsAppUrl } from '../../utils/agency';
import {
  buildAddOnWhatsAppMessage,
  buildMaintenanceWhatsAppMessage,
  buildPlanWhatsAppMessage,
} from '../../utils/pricing';
import '../../styles/pricing.css';

const standardPlans = pricingPlans.filter((plan) => !plan.isCustom);
const customPlan = pricingPlans.find((plan) => plan.isCustom);

function PlanCard({ plan, onContract }) {
  const whatsappHref = buildAgencyWhatsAppUrl(
    agency,
    buildPlanWhatsAppMessage(plan),
  );

  return (
    <article
      className={`pricing-card ${plan.recommended ? 'pricing-card--featured' : ''}`.trim()}
      aria-labelledby={`pricing-plan-${plan.id}`}
    >
      {plan.badge && <span className="pricing-card__badge">{plan.badge}</span>}

      <span className="pricing-card__icon" aria-hidden="true">
        <Icon name={plan.icon} size={21} />
      </span>

      <div className="pricing-card__heading">
        <span className="pricing-card__label">Plan</span>
        <h3 id={`pricing-plan-${plan.id}`}>{plan.name}</h3>
        <p>{plan.tagline}</p>
      </div>

      <div className="pricing-card__price">
        {plan.pricePrefix && (
          <span className="pricing-card__price-prefix">
            {plan.pricePrefix}
          </span>
        )}
        <strong>{formatUsd(plan.price)}</strong>
      </div>
      <p className="pricing-card__payment">{plan.priceNote} · USD</p>

      <ul className="pricing-card__features">
        {plan.features.map((feature) => (
          <li key={feature}>
            <Icon name="check" size={15} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <p className="pricing-card__not-included">
        <strong>Importante:</strong> {plan.notIncluded.join(' ')}
      </p>

      <div className="pricing-card__actions">
        <button
          className="pricing-card__cta"
          type="button"
          onClick={() => onContract(plan.id)}
        >
          Contratar este plan
          <Icon name="arrow-right" size={16} />
        </button>

        {whatsappHref && (
          <a
            className="pricing-card__whatsapp"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar por WhatsApp el ${plan.fullName}`}
          >
            <Icon name="whatsapp" size={16} />
            Consultar por WhatsApp
          </a>
        )}
      </div>
    </article>
  );
}

function PlanComparison() {
  return (
    <div className="pricing-comparison" id="comparacion">
      <div className="pricing-subheading">
        <div>
          <span className="studio-eyebrow">Comparación</span>
          <h3>Compara los planes</h3>
          <p>
            Las diferencias principales, sin perder de vista qué incluye cada
            opción.
          </p>
        </div>
        <p className="pricing-comparison__hint">
          En el celular, desliza la tabla para ver todos los planes.
        </p>
      </div>

      <div className="pricing-table-wrap">
        <table className="pricing-table">
          <caption className="pricing-visually-hidden">
            Comparación de los planes Esencial, Profesional, Catálogo Digital y
            Tienda Online de Nexobyte.
          </caption>
          <thead>
            <tr>
              <th scope="col">Característica</th>
              {standardPlans.map((plan) => (
                <th
                  key={plan.id}
                  scope="col"
                  className={plan.recommended ? 'pricing-table__featured' : ''}
                >
                  <span>{plan.name}</span>
                  <strong>{formatPlanPrice(plan)}</strong>
                  <small>{plan.priceNote}</small>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.key}>
                <th scope="row">{row.label}</th>
                {standardPlans.map((plan) => (
                  <td
                    key={plan.id}
                    className={
                      plan.recommended ? 'pricing-table__featured' : ''
                    }
                  >
                    {plan.comparison?.[row.key] ?? '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="pricing-comparison__note">
        — significa que no está incluido. “No indicado” significa que no
        aparece en la lista publicada del plan y se confirma en la cotización.
      </p>
    </div>
  );
}

function MaintenanceSection() {
  return (
    <div className="pricing-maintenance" id="mantenimiento">
      <div className="pricing-subheading">
        <div>
          <span className="studio-eyebrow">Mantenimiento</span>
          <h3>Mantenimiento mensual</h3>
          <p>
            Un acompañamiento opcional para mantener tu sitio actualizado. No es
            obligatorio para contratar un plan de creación.
          </p>
        </div>
        <span className="pricing-optional">Opcional</span>
      </div>

      <div className="maintenance-grid">
        {maintenancePlans.map((plan) => {
          const whatsappHref = buildAgencyWhatsAppUrl(
            agency,
            buildMaintenanceWhatsAppMessage(plan),
          );

          return (
            <article className="maintenance-card" key={plan.id}>
              <h4>{plan.name}</h4>
              <p className="maintenance-card__price">
                <strong>{formatMaintenancePrice(plan)}</strong>
                <span>USD</span>
              </p>
              <p className="maintenance-card__tagline">{plan.tagline}</p>

              <ul className="maintenance-card__features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={15} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {whatsappHref && (
                <a
                  className="maintenance-card__cta"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={16} />
                  Consultar por WhatsApp
                </a>
              )}
            </article>
          );
        })}
      </div>

      <p className="pricing-note">{maintenanceNote}</p>
    </div>
  );
}

function AddOnsSection() {
  return (
    <div className="pricing-addons" id="servicios-adicionales">
      <div className="pricing-subheading">
        <div>
          <span className="studio-eyebrow">Extras</span>
          <h3>Servicios adicionales</h3>
          <p>
            Funcionalidades que puedes sumar a tu proyecto. Se cotizan según la
            complejidad.
          </p>
        </div>
      </div>

      <div className="addon-grid">
        {addOns.map((addOn) => {
          const whatsappHref = buildAgencyWhatsAppUrl(
            agency,
            buildAddOnWhatsAppMessage(addOn),
          );

          return (
            <article className="addon-item" key={addOn.id}>
              <span className="addon-item__icon" aria-hidden="true">
                <Icon name={addOn.icon} size={20} />
              </span>
              <div className="addon-item__body">
                <h4>{addOn.name}</h4>
                <strong>{formatAddOnPrice(addOn)}</strong>
              </div>
              {whatsappHref && (
                <a
                  className="addon-item__cta"
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Cotizar ${addOn.name} por WhatsApp`}
                >
                  Cotizar
                  <Icon name="arrow-up-right" size={15} />
                </a>
              )}
            </article>
          );
        })}
      </div>

      <p className="pricing-note">{addOnsNote}</p>
    </div>
  );
}

function PricingFaq({ onQuote }) {
  const whatsappHref = buildAgencyWhatsAppUrl(agency);

  return (
    <div className="pricing-faq" id="preguntas">
      <div className="pricing-faq__intro">
        <span className="studio-eyebrow">Transparencia</span>
        <h3>Preguntas frecuentes</h3>
        <p>
          Resolvemos las dudas comerciales más comunes antes de que solicites
          una cotización.
        </p>
        <button
          className="pricing-faq__cta"
          type="button"
          onClick={() => onQuote('')}
        >
          Solicitar cotización
          <Icon name="arrow-right" size={16} />
        </button>
        {whatsappHref && (
          <a
            className="pricing-faq__whatsapp"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="whatsapp" size={16} />
            Consultar por WhatsApp
          </a>
        )}
      </div>

      <div className="pricing-faq__list">
        {pricingFaqs.map((faq) => (
          <details className="pricing-faq__item" key={faq.id}>
            <summary>
              <span>{faq.question}</span>
              <Icon name="chevron-down" size={18} />
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [quotePlanId, setQuotePlanId] = useState('');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const openQuote = (planId = '') => {
    setQuotePlanId(planId);
    setIsQuoteOpen(true);
  };

  const closeQuote = useCallback(() => setIsQuoteOpen(false), []);
  const whatsappHref = buildAgencyWhatsAppUrl(agency);
  const customWhatsappHref = customPlan
    ? buildAgencyWhatsAppUrl(agency, buildPlanWhatsAppMessage(customPlan))
    : null;

  return (
    <section className="studio-pricing" id="planes" aria-labelledby="pricing-title">
      <div className="studio-container">
        <div className="studio-section-heading studio-section-heading--split pricing-heading">
          <div>
            <span className="studio-eyebrow">
              <span className="studio-eyebrow__dot" aria-hidden="true" />
              Servicios
            </span>
            <h2 id="pricing-title">Planes y precios</h2>
            <p>
              Soluciones web diseñadas para impulsar tu negocio. Elige el plan
              que mejor se adapte a tus necesidades.
            </p>
          </div>

          <div className="pricing-heading__actions">
            <button
              className="studio-button"
              type="button"
              onClick={() => openQuote('')}
            >
              Solicitar cotización
              <Icon name="arrow-right" size={17} />
            </button>
            {whatsappHref && (
              <a
                className="studio-button studio-button--ghost"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="whatsapp" size={17} />
                Consultar por WhatsApp
              </a>
            )}
          </div>
        </div>

        <div className="pricing-grid">
          {standardPlans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} onContract={openQuote} />
          ))}
        </div>

        {customPlan && (
          <div className="pricing-custom">
            <div className="pricing-custom__content">
              <span className="studio-eyebrow">A medida</span>
              <h3>{customPlan.fullName}</h3>
              <p>{customPlan.description}</p>
              <ul className="pricing-custom__features">
                {customPlan.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={15} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pricing-custom__aside">
              <div className="pricing-custom__price">
                <span>Desde</span>
                <strong>{formatUsd(customPlan.price)}</strong>
                <small>USD · {customPlan.priceNote}</small>
              </div>
              <button
                className="studio-button"
                type="button"
                onClick={() => openQuote(customPlan.id)}
              >
                Solicitar cotización
                <Icon name="arrow-right" size={17} />
              </button>
              {customWhatsappHref && (
                <a
                  className="pricing-custom__whatsapp"
                  href={customWhatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="whatsapp" size={16} />
                  Consultar por WhatsApp
                </a>
              )}
            </div>
          </div>
        )}

        <div className="pricing-disclaimer" role="note">
          <Icon name="shield" size={19} />
          <p>
            <strong>Precios de referencia.</strong> {pricingNotes.join(' ')}
          </p>
        </div>

        <PlanComparison />
        <MaintenanceSection />
        <AddOnsSection />
        <PricingFaq onQuote={openQuote} />
      </div>

      {isQuoteOpen && (
        <PricingQuoteDialog
          initialPlanId={quotePlanId}
          onClose={closeQuote}
        />
      )}
    </section>
  );
}
