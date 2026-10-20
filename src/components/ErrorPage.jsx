import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';
import Icon from './Icon';
import { agency } from '../data/agency';

export default function ErrorPage({ code = '404', title, message }) {
  return (
    <div className="error-page">
      <header className="error-page__header">
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
      </header>

      <main className="error-page__main">
        <span className="error-page__code">{code}</span>
        <h1>{title}</h1>
        <p>{message}</p>

        <div className="error-page__actions">
          <Link className="studio-button" to="/">
            Volver al inicio
            <Icon name="arrow-right" size={17} />
          </Link>
          <Link className="studio-button studio-button--ghost" to="/#demos">
            Explorar demos
          </Link>
        </div>
      </main>

      <footer className="error-page__footer">
        <span>
          © {new Date().getFullYear()} {agency.name} · {agency.location}
        </span>
      </footer>
    </div>
  );
}
