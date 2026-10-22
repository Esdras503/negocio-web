import ArquitecturaTemplate from './ArquitecturaTemplate';
import AutomotrizTemplate from './AutomotrizTemplate';
import BarberiaTemplate from './BarberiaTemplate';
import BienesRaicesTemplate from './BienesRaicesTemplate';
import CafeTemplate from './CafeTemplate';
import PupuseriaTemplate from './PupuseriaTemplate';
import SaludTemplate from './SaludTemplate';
import ServiciosTemplate from './ServiciosTemplate';
import TiendaTemplate from './TiendaTemplate';
import BusinessAbout from '../components/business/BusinessAbout';
import BusinessContact from '../components/business/BusinessContact';
import BusinessCta from '../components/business/BusinessCta';
import BusinessFooter from '../components/business/BusinessFooter';
import BusinessGallery from '../components/business/BusinessGallery';
import BusinessHeader from '../components/business/BusinessHeader';
import BusinessHero from '../components/business/BusinessHero';
import BusinessServices from '../components/business/BusinessServices';
import DemoBar from '../components/business/DemoBar';
import { getVisibleSections } from '../utils/business';
import { resolveThemeStyles } from '../utils/theme';

function renderSection(section, business) {
  switch (section) {
    case 'about':
      return <BusinessAbout key={section} business={business} />;
    case 'services':
      return <BusinessServices key={section} business={business} />;
    case 'gallery':
      return <BusinessGallery key={section} business={business} />;
    case 'contact':
      return <BusinessContact key={section} business={business} />;
    default:
      return null;
  }
}

const templates = {
  pupuseria: PupuseriaTemplate,
  cafe: CafeTemplate,
  barberia: BarberiaTemplate,
  automotriz: AutomotrizTemplate,
  servicios: ServiciosTemplate,
  arquitectura: ArquitecturaTemplate,
  inmobiliaria: BienesRaicesTemplate,
  salud: SaludTemplate,
  tienda: TiendaTemplate,
};

/**
 * Punto de entrada de las demostraciones. Cada negocio se renderiza con la
 * plantilla propia de su identidad; la plantilla genérica queda como respaldo
 * para datos sin una plantilla registrada.
 */
export default function BusinessTemplate({ business, mode = 'demo' }) {
  const Template = templates[business.template];

  if (Template) {
    return <Template business={business} mode={mode} />;
  }

  const sections = getVisibleSections(business);
  const themeStyles = resolveThemeStyles(business.theme);

  return (
    <div
      className="business-site"
      style={themeStyles}
      data-hero={business.theme.heroStyle}
      data-heading-font={business.theme.headingFont}
      data-mode={mode}
    >
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      {mode === 'demo' && <DemoBar />}
      <BusinessHeader business={business} />

      <main id="contenido">
        <BusinessHero business={business} />
        {sections.map((section) => renderSection(section, business))}
        {business.cta && <BusinessCta business={business} />}
      </main>

      <BusinessFooter business={business} mode={mode} />
    </div>
  );
}
