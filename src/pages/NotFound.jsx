import ErrorPage from '../components/ErrorPage';
import { agency } from '../data/agency';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function NotFound() {
  useDocumentMeta({
    title: `Página no encontrada · ${agency.name}`,
    description: 'La página que buscas no existe o cambió de dirección.',
    robots: 'noindex,nofollow',
  });

  return (
    <ErrorPage
      code="404"
      title="Esta página no existe."
      message="Puede que el enlace esté incompleto o que la dirección haya cambiado. Vuelve al inicio o entra a una de las demostraciones."
    />
  );
}
