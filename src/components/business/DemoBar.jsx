import { Link } from 'react-router-dom';
import Icon from '../Icon';

export default function DemoBar() {
  return (
    <div className="demo-bar">
      <div className="business-container demo-bar__inner">
        <span className="demo-bar__tag">
          <span className="demo-bar__dot" aria-hidden="true" />
          Demostración
        </span>
        <span className="demo-bar__text">Sitio de ejemplo · Datos ficticios</span>
        <Link className="demo-bar__link" to="/">
          Volver al estudio
          <Icon name="arrow-up-right" size={14} />
        </Link>
      </div>
    </div>
  );
}
