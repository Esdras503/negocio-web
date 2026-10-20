import BrandMark from '../BrandMark';
import ContactButton from '../ContactButton';
import Icon from '../Icon';
import { useDisclosure } from '../../hooks/useDisclosure';
import { getNavigation } from '../../utils/business';

export default function BusinessHeader({ business }) {
  const { isOpen, close, toggle } = useDisclosure();
  const navigation = getNavigation(business);

  return (
    <header className="site-header">
      <div className="business-container site-header__inner">
        <a className="site-brand" href="#inicio" onClick={close}>
          <BrandMark
            name={business.name}
            text={business.logo.text}
            image={business.logo.image}
            className="brand-mark--business"
          />
          <span className="site-brand__text">
            <strong>{business.name}</strong>
            <small>{business.sector}</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="Navegación principal">
          {navigation.map((item) => (
            <a key={item.key} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <ContactButton
            business={business}
            label={business.contact.whatsappLabel}
            className="site-btn site-btn--primary site-btn--header"
          />

          <button
            className="site-menu-button"
            type="button"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            aria-controls="business-mobile-nav"
            onClick={toggle}
          >
            <Icon name={isOpen ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </div>

      <nav
        id="business-mobile-nav"
        className="site-mobile-nav"
        aria-label="Navegación móvil"
        hidden={!isOpen}
      >
        {navigation.map((item) => (
          <a key={item.key} href={item.href} onClick={close}>
            {item.label}
            <Icon name="arrow-right" size={16} />
          </a>
        ))}
        <ContactButton
          business={business}
          label={business.contact.whatsappLabel}
          className="site-btn site-btn--primary site-mobile-nav__cta"
          onClick={close}
        />
      </nav>
    </header>
  );
}
