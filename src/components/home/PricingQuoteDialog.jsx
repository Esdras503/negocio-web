import { useMemo, useState } from 'react';
import DemoDialog from '../DemoDialog';
import Icon from '../Icon';
import { agency } from '../../data/agency';
import {
  formatPlanPrice,
  getPlanById,
  pricingPlans,
} from '../../data/pricing';
import {
  quoteBusinessTypes,
  quoteContactPreferences,
} from '../../data/quoteOptions';
import { buildAgencyWhatsAppUrl } from '../../utils/agency';

const EMPTY_FORM = {
  planId: '',
  name: '',
  businessName: '',
  businessType: '',
  description: '',
  contact: '',
  preferredContact: 'WhatsApp',
};

function makeInitialForm(initialPlanId) {
  return {
    ...EMPTY_FORM,
    planId: getPlanById(initialPlanId)?.id ?? '',
  };
}

function buildSummaryRows(form, selectedPlan) {
  const rows = [];

  if (selectedPlan) {
    rows.push({
      label: 'Plan de interés',
      value: `${selectedPlan.fullName} — ${formatPlanPrice(selectedPlan)} (${selectedPlan.priceNote})`,
    });
  }
  if (form.name.trim()) rows.push({ label: 'Nombre', value: form.name.trim() });
  if (form.businessName.trim()) {
    rows.push({ label: 'Negocio', value: form.businessName.trim() });
  }
  if (form.businessType) {
    rows.push({ label: 'Tipo de negocio', value: form.businessType });
  }
  if (form.description.trim()) {
    rows.push({ label: 'Proyecto', value: form.description.trim() });
  }
  if (form.contact.trim()) {
    rows.push({ label: 'Dato de contacto', value: form.contact.trim() });
  }
  if (form.preferredContact && form.preferredContact !== 'No especificar') {
    rows.push({ label: 'Medio preferido', value: form.preferredContact });
  }

  return rows;
}

export default function PricingQuoteDialog({ initialPlanId = '', onClose }) {
  const [form, setForm] = useState(() => makeInitialForm(initialPlanId));
  const [step, setStep] = useState('form');
  const [error, setError] = useState('');
  const [opened, setOpened] = useState(false);

  const selectedPlan = getPlanById(form.planId);
  const summaryRows = useMemo(
    () => buildSummaryRows(form, selectedPlan),
    [form, selectedPlan],
  );
  const summaryText = useMemo(() => {
    const lines = ['Hola, quiero solicitar una cotización con Nexobyte.'];

    for (const row of summaryRows) {
      lines.push(`${row.label}: ${row.value}`);
    }

    lines.push(
      '',
      'Este resumen fue preparado desde el sitio de Nexobyte para revisarlo antes de enviarlo.',
    );

    return lines.join('\n');
  }, [summaryRows]);
  const whatsappHref = useMemo(
    () => buildAgencyWhatsAppUrl(agency, summaryText),
    [summaryText],
  );

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError('');
    if (opened) setOpened(false);
  };

  const handleReview = (event) => {
    event.preventDefault();

    if (!selectedPlan) {
      setError('Selecciona un plan para preparar la solicitud.');
      return;
    }

    const hasUsefulInfo = [
      'businessName',
      'businessType',
      'description',
    ].some((field) => form[field].trim());

    if (!hasUsefulInfo) {
      setError(
        'Cuéntanos al menos el tipo de negocio o qué necesitas para preparar el resumen.',
      );
      return;
    }

    setError('');
    setStep('review');
  };

  if (step === 'review') {
    return (
      <DemoDialog
        open
        onClose={onClose}
        titleId="pricing-quote-title"
        className="pricing-quote-panel"
      >
        <div className="pricing-quote">
          <button
            className="pricing-quote__back"
            type="button"
            onClick={() => setStep('form')}
          >
            <Icon name="arrow-left" size={16} />
            Editar datos
          </button>

          <div className="pricing-quote__heading">
            <span className="pricing-quote__eyebrow">Paso 2 de 2</span>
            <h3 id="pricing-quote-title">Revisa tu solicitud</h3>
            <p>
              Este es el mensaje que se preparará para WhatsApp. Aún no se ha
              enviado nada.
            </p>
          </div>

          <pre className="pricing-quote__summary">{summaryText}</pre>

          <p className="pricing-quote__privacy">
            Tus datos no se guardan en este sitio. WhatsApp se abrirá con el
            mensaje listo para que tú decidas enviarlo.
          </p>

          <div className="pricing-quote__actions">
            <button
              className="pricing-quote__button pricing-quote__button--secondary"
              type="button"
              onClick={() => setStep('form')}
            >
              Editar
            </button>

            {whatsappHref ? (
              <a
                className="pricing-quote__button pricing-quote__button--primary"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpened(true)}
              >
                <Icon name="whatsapp" size={17} />
                Abrir WhatsApp
              </a>
            ) : (
              <span className="pricing-quote__pending">
                El canal de WhatsApp no está configurado todavía.
              </span>
            )}
          </div>

          {opened && (
            <p className="pricing-quote__sent-note" role="status">
              Se abrió WhatsApp. Confirma allí el envío; la solicitud todavía no
              se considera recibida.
            </p>
          )}
        </div>
      </DemoDialog>
    );
  }

  return (
    <DemoDialog
      open
      onClose={onClose}
      titleId="pricing-quote-title"
      className="pricing-quote-panel"
    >
      <div className="pricing-quote">
        <div className="pricing-quote__heading">
          <span className="pricing-quote__eyebrow">Paso 1 de 2</span>
          <h3 id="pricing-quote-title">Solicita tu cotización</h3>
          <p>
            Elige el plan y completa lo que quieras compartir. Revisarás el
            resumen antes de abrir WhatsApp.
          </p>
        </div>

        <form className="pricing-quote__form" onSubmit={handleReview} noValidate>
          <div className="pricing-quote__field pricing-quote__field--full">
            <label htmlFor="pricing-quote-plan">Plan seleccionado</label>
            <select
              id="pricing-quote-plan"
              name="plan"
              value={form.planId}
              onChange={(event) => updateField('planId', event.target.value)}
              required
            >
              <option value="">Selecciona un plan</option>
              {pricingPlans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.fullName} — {formatPlanPrice(plan)}
                </option>
              ))}
            </select>
            {selectedPlan && (
              <small className="pricing-quote__helper">
                {selectedPlan.priceNote}. {selectedPlan.description}
              </small>
            )}
          </div>

          <div className="pricing-quote__field">
            <label htmlFor="pricing-quote-name">Tu nombre</label>
            <input
              id="pricing-quote-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={80}
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="Cómo te llamas"
            />
          </div>

          <div className="pricing-quote__field">
            <label htmlFor="pricing-quote-business">Nombre del negocio</label>
            <input
              id="pricing-quote-business"
              name="businessName"
              type="text"
              autoComplete="organization"
              maxLength={120}
              value={form.businessName}
              onChange={(event) =>
                updateField('businessName', event.target.value)
              }
              placeholder="Nombre de tu negocio"
            />
          </div>

          <div className="pricing-quote__field">
            <label htmlFor="pricing-quote-business-type">
              Tipo de negocio
            </label>
            <select
              id="pricing-quote-business-type"
              name="businessType"
              value={form.businessType}
              onChange={(event) =>
                updateField('businessType', event.target.value)
              }
            >
              <option value="">Selecciona una opción</option>
              {quoteBusinessTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="pricing-quote__field">
            <label htmlFor="pricing-quote-contact-preference">
              Medio de contacto
            </label>
            <select
              id="pricing-quote-contact-preference"
              name="preferredContact"
              value={form.preferredContact}
              onChange={(event) =>
                updateField('preferredContact', event.target.value)
              }
            >
              {quoteContactPreferences.map((preference) => (
                <option key={preference} value={preference}>
                  {preference}
                </option>
              ))}
            </select>
          </div>

          <div className="pricing-quote__field pricing-quote__field--full">
            <label htmlFor="pricing-quote-contact">
              Tu WhatsApp o correo (opcional)
            </label>
            <input
              id="pricing-quote-contact"
              name="contact"
              type="text"
              autoComplete="tel"
              maxLength={120}
              value={form.contact}
              onChange={(event) => updateField('contact', event.target.value)}
              placeholder="Para que podamos ubicarte"
            />
          </div>

          <div className="pricing-quote__field pricing-quote__field--full">
            <label htmlFor="pricing-quote-description">
              Descripción del proyecto
            </label>
            <textarea
              id="pricing-quote-description"
              name="description"
              rows={4}
              maxLength={600}
              value={form.description}
              onChange={(event) =>
                updateField('description', event.target.value)
              }
              placeholder="Cuéntanos qué necesitas, qué productos o servicios ofreces y cualquier detalle que ayude a preparar la cotización."
            />
          </div>

          {error && (
            <p className="pricing-quote__error" role="alert">
              {error}
            </p>
          )}

          <div className="pricing-quote__actions pricing-quote__actions--full">
            <button
              className="pricing-quote__button pricing-quote__button--secondary"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="pricing-quote__button pricing-quote__button--primary"
              type="submit"
            >
              Revisar solicitud
              <Icon name="arrow-right" size={17} />
            </button>
          </div>
        </form>

        <p className="pricing-quote__privacy">
          No se guarda nada en este sitio. Al continuar verás un resumen y
          podrás abrir WhatsApp para enviarlo tú mismo.
        </p>
      </div>
    </DemoDialog>
  );
}
