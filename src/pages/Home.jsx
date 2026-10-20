import SiteHeader from '../components/home/SiteHeader';
import HomeHero from '../components/home/HomeHero';
import DemoShowcase from '../components/home/DemoShowcase';
import ProcessSection from '../components/home/ProcessSection';
import ValueSection from '../components/home/ValueSection';
import ClosingCta from '../components/home/ClosingCta';
import SiteFooter from '../components/home/SiteFooter';
import { agency } from '../data/agency';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function Home() {
  useDocumentMeta({
    title: `${agency.name} — Sitios web para negocios de El Salvador`,
    description:
      'Diseño de páginas web para negocios de El Salvador. Explora demostraciones adaptables para restaurantes, cafés, barberías y más.',
    robots: 'index,follow',
  });

  return (
    <div className="home">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido">
        <HomeHero />
        <DemoShowcase />
        <ProcessSection />
        <ValueSection />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  );
}
