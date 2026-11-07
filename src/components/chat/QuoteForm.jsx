import { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon';
import { agency } from '../../data/agency';
import { buildAgencyWhatsAppUrl } from '../../utils/agency';

const BUSINESS_TYPES = [
  'Restaurante, pupusería o cafetería',
  'Barbería o salón de belleza',
  'Taller o servicio automotriz',
  'Servicios técnicos para el hogar',
  'Arquitectura, construcción o remodelación',
  'Inmobiliaria o bienes raíces',
  'Salud, bienestar o clínica',
  'Tienda, comercio o catálogo',
  'Gimnasio o entrenamiento',
  'Otro tipo de negocio',
];

const PAGE_TYPES = [
  'Página completa para mi negocio',
  'Catálogo de productos',
  'Página de servicios',
  'Landing page para una campaña',
  'Aún no estoy seguro',
];

const CONTACT_PREFERENCES = [
  'WhatsApp',
  'Llamada telefónica',
  'Correo electrónico',
  'No especificar',
];

const EMPTY_FORM = {
  name: '',
  businessName: '',
  businessType: '',
  pageType: '',
  description: '',
  contact: '',
  preferredContact: '',
};

function buildSummary(form) {
  const lines = [
    'Hola, quiero cotizar una página web con Nexobyte.',
  ];

  if (form.name.trim()) lines.push(`Nombre: ${form.name.trim()}`);
  if (form.businessName.trim()) {
    lines.push(`Negocio: ${form.businessName.trim()}`);
  }
  if (form.businessType) {
    lines.push(`Tipo de negocio: ${form.businessType}`);
  }
  if (form.pageType) lines.push(`Tipo de página: ${form.pageType}`);
  if (form.description.trim()) {
    lines.push(`Idea o necesidad: ${form.description.trim()}`);
  }
  if (form.contact.trim()) {
    lines.push(`Dato de contacto: ${form.contact.trim()}`);
  }
  if (form.preferredContact && form.preferredContact !== 'No especificar') {
    lines.push(`Medio preferido: ${form.preferredContact}`);
  }

  lines.push(
    '',
    'Este resumen fue preparado desde el sitio de Nexobyte para revisarlo antes de enviarlo.',
  );

  return lines.join('\n');
}

export default function QuoteForm({ onBack }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [step, setStep] = useState('form');
  const [error, setError] = useState('');
  const [opened, setOpened] = useState(false);
  const nameRef = useRef(null);

  const summary = useMemo(() => buildSummary(form), [form]);
  const whatsappHref = useMemo(
    () => buildAgencyWhatsAppUrl(agency, summary),
    [summary],
  );

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError('');
    if (opened) setOpened(false);
  };

  const handleReview = (event) => {
    event.preventDefault();
    const hasUsefulInfo = [
      'businessName',
      'businessType',
      'pageType',
      'description',
    ].some((field) => form[field].trim());

    if (!hasUsefulInfo) {
      setError(
        'Cuéntanos al menos el tipo de negocio o qué página necesitas para preparar el resumen.',
      );
      return;
    }

    setError('');
    setStep('review');
  };

  if (step === 'review') {
    return (
      <div className="chat-quote">
        <button
          className="chat-quote__back"
          type="button"
          onClick={() => setStep('form')}
        >
          <Icon name="arrow-left" size={16} />
          Editar datos
        </button>

        <div className="chat-quote__heading">
          <span className="chat-quote__eyebrow">Paso 2 de 2</span>
          <h3>Revisa tu solicitud</h3>
          <p>
            Este es el mensaje que se preparará para WhatsApp. Aún no se ha
            enviado nada.
          </p>
        </div>

        <pre className="chat-quote__summary">{summary}</pre>

        <p className="chat-quote__privacy">
          Tus datos no se guardan en este sitio. WhatsApp se abrirá con el
          mensaje listo para que tú decidas enviarlo.
        </p>

        <div className="chat-quote__actions">
          <button
            className="chat-quote__button chat-quote__button--secondary"
            type="button"
            onClick={() => setStep('form')}
          >
            Editar
          </button>

          {whatsappHref ? (
            <a
              className="chat-quote__button chat-quote__button--primary"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpened(true)}
            >
              <Icon name="whatsapp" size={17} />
              Abrir WhatsApp
            </a>
          ) : (
            <span className="chat-quote__pending">
              El canal de WhatsApp no está configurado todavía.
            </span>
          )}
        </div>

        {opened && (
          <p className="chat-quote__sent-note" role="status">
            Se abrió WhatsApp. Confirma allí el envío; la solicitud todavía no
            se considera recibida.
          </p>
        )}

        <button
          className="chat-quote__text-button"
          type="button"
          onClick={onBack}
        >
          Volver a la conversación
        </button>
      </div>
    );
  }

  return (
    <div className="chat-quote">
      <button
        className="chat-quote__back"
        type="button"
        onClick={onBack}
      >
        <Icon name="arrow-left" size={16} />
        Volver al chat
      </button>

      <div className="chat-quote__heading">
        <span className="chat-quote__eyebrow">Paso 1 de 2</span>
        <h3>Prepara tu cotización</h3>
        <p>
          Completa lo que quieras compartir. Revisarás el resumen antes de que
          se abra WhatsApp.
        </p>
      </div>

      <form className="chat-quote__form" onSubmit={handleReview} noValidate>
        <div className="chat-quote__field">
          <label htmlFor="chat-quote-name">Tu nombre (opcional)</label>
          <input
            ref={nameRef}
            id="chat-quote-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="Cómo te llamas"
          />
        </div>

        <div className="chat-quote__field">
          <label htmlFor="chat-quote-business">
            Nombre del negocio (opcional)
          </label>
          <input
            id="chat-quote-business"
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

        <div className="chat-quote__field">
          <label htmlFor="chat-quote-business-type">
            Tipo de negocio (opcional)
          </label>
          <select
            id="chat-quote-business-type"
            name="businessType"
            value={form.businessType}
            onChange={(event) =>
              updateField('businessType', event.target.value)
            }
          >
            <option value="">Selecciona una opción</option>
            {BUSINESS_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="chat-quote__field">
          <label htmlFor="chat-quote-page-type">
            Tipo de página (opcional)
          </label>
          <select
            id="chat-quote-page-type"
            name="pageType"
            value={form.pageType}
            onChange={(event) => updateField('pageType', event.target.value)}
          >
            <option value="">Selecciona una opción</option>
            {PAGE_TYPES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="chat-quote__field">
          <label htmlFor="chat-quote-description">
            Cuéntanos qué necesitas (opcional)
          </label>
          <textarea
            id="chat-quote-description"
            name="description"
            rows={3}
            maxLength={600}
            value={form.description}
            onChange={(event) =>
              updateField('description', event.target.value)
            }
            placeholder="Qué te gustaría mostrar, a quién quieres llegar o qué necesitas resolver."
          />
        </div>

        <div className="chat-quote__field">
          <label htmlFor="chat-quote-contact">
            Tu WhatsApp o correo (opcional)
          </label>
          <input
            id="chat-quote-contact"
            name="contact"
            type="text"
            autoComplete="off"
            maxLength={120}
            value={form.contact}
            onChange={(event) => updateField('contact', event.target.value)}
            placeholder="Para que puedan responderte"
          />
        </div>

        <div className="chat-quote__field">
          <label htmlFor="chat-quote-preferred">
            Medio de contacto preferido (opcional)
          </label>
          <select
            id="chat-quote-preferred"
            name="preferredContact"
            value={form.preferredContact}
            onChange={(event) =>
              updateField('preferredContact', event.target.value)
            }
          >
            <option value="">Selecciona una opción</option>
            {CONTACT_PREFERENCES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="chat-quote__error" role="alert">
            {error}
          </p>
        )}

        <p className="chat-quote__privacy">
          Todos los campos son opcionales. Para preparar el resumen, completa al
          menos el tipo de negocio o qué página necesitas. No guardamos esta
          información; solo se usa para preparar el mensaje que enviarás por
          WhatsApp.
        </p>

        <button
          className="chat-quote__button chat-quote__button--primary"
          type="submit"
        >
          Revisar solicitud
          <Icon name="arrow-right" size={17} />
        </button>
      </form>
    </div>
  );
}
