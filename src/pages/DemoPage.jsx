import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import BusinessTemplate from '../templates/BusinessTemplate';
import ErrorPage from '../components/ErrorPage';
import { agency } from '../data/agency';
import { getDemoById } from '../data/demoBusinesses';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { validateBusinessData } from '../utils/validation';

export default function DemoPage() {
  const { slug } = useParams();
  const business = getDemoById(slug);
  const validation = useMemo(
    () => (business ? validateBusinessData(business) : { valid: false, errors: [] }),
    [business],
  );

  const isAvailable = Boolean(business && validation.valid);

  useDocumentMeta({
    title: isAvailable
      ? `Demo · ${business.name} — ${business.sector}`
      : `Demostración no encontrada · ${agency.name}`,
    description: isAvailable
      ? `Propuesta conceptual de sitio web para ${business.name}, ${business.sector} en ${business.location}.`
      : 'La demostración solicitada no existe o no está disponible.',
    robots: 'noindex,nofollow',
  });

  useEffect(() => {
    if (business && !validation.valid) {
      console.error(
        `La demo "${business.id}" tiene datos inválidos:`,
        validation.errors,
      );
    }
  }, [business, validation]);

  if (!isAvailable) {
    return (
      <ErrorPage
        code="Demo"
        title="Esta demostración no está disponible."
        message="El enlace puede haber cambiado o la propuesta todavía no está lista. Puedes volver al inicio y explorar las demostraciones disponibles."
      />
    );
  }

  return <BusinessTemplate business={business} mode="demo" />;
}
