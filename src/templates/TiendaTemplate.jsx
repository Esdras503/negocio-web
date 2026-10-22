import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import DemoBar from '../components/business/DemoBar';
import DemoDialog from '../components/DemoDialog';
import Icon from '../components/Icon';
import { useDisclosure } from '../hooks/useDisclosure';
import { buildMapUrl, buildPhoneHref, buildWhatsAppUrl } from '../utils/business';
import { resolveThemeStyles } from '../utils/theme';
import '../styles/tienda.css';

const NAV_ITEMS = [
  { label: 'Catálogo', href: '#catalogo' },
  { label: 'Categorías', href: '#categorias' },
  { label: 'La tienda', href: '#tienda' },
  { label: 'Visítanos', href: '#contacto' },
];

export default function TiendaTemplate({ business }) {
  const { isOpen, close, toggle } = useDisclosure();
  const [category, setCategory] = useState('todas');
  const [query, setQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const themeStyles = resolveThemeStyles(business.theme);
  const whatsappUrl = buildWhatsAppUrl(business);
  const mapUrl = buildMapUrl(business.contact.mapQuery || business.contact.address);
  const phoneHref = buildPhoneHref(business.contact.phone);
  const { hero, categories, products, benefits, about, cart, contact, footer } = business;

  const categoryLabels = useMemo(
    () =>
      Object.fromEntries(
        categories.items.map((item) => [item.id, item.label]),
      ),
    [categories.items],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return products.items.filter((product) => {
      const matchesCategory = category === 'todas' || product.category === category;
      const haystack = [
        product.name,
        product.description,
        categoryLabels[product.category],
      ]
        .join(' ')
        .toLowerCase();
      return matchesCategory && (normalizedQuery === '' || haystack.includes(normalizedQuery));
    });
  }, [category, categoryLabels, products.items, query]);

  const selectedProducts = useMemo(
    () => cartItems.map((id) => products.items.find((product) => product.id === id)).filter(Boolean),
    [cartItems, products.items],
  );

  const cartTotal = selectedProducts.reduce(
    (sum, product) => sum + Number(product.price.replace(/[^\d.]/g, '')),
    0,
  );

  const cartWhatsAppUrl = buildWhatsAppUrl(
    business,
    selectedProducts.length > 0
      ? `Hola, vi el sitio de Luma y quiero consultar por: ${selectedProducts
          .map((product) => product.name)
          .join(', ')}.`
      : undefined,
  );

  const addToCart = (productId) => {
    setCartItems((current) =>
      current.includes(productId) ? current : [...current, productId],
    );
  };

  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((id) => id !== productId));
  };

  const applyCategory = (nextCategory) => {
    setCategory(nextCategory);
    setQuery('');
    document.getElementById('catalogo')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const clearFilters = () => {
    setCategory('todas');
    setQuery('');
  };

  const firstCategory = categories.items[0];
  const aromaCategory = categories.items[1] || firstCategory;

  return (
    <div className="lum-site" style={themeStyles}>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <DemoBar />

      <div className="lum-announcement">
        <p>Selección pequeña · Consulta y compra coordinada por WhatsApp</p>
        <span>Demostración sin pagos reales</span>
      </div>

      <header className="lum-header">
        <div className="lum-shell lum-header__inner">
          <a className="lum-brand" href="#inicio" aria-label={`${business.name}, inicio`}>
            <strong>{business.name}</strong>
            <span>Objetos para la vida diaria</span>
          </a>

          <nav className="lum-nav" aria-label="Navegación principal">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="lum-header__actions">
            <button
              className="lum-cart-button"
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={`Abrir lista de interés, ${cartItems.length} ${
                cartItems.length === 1 ? 'producto' : 'productos'
              }`}
            >
              <Icon name="cart" size={19} />
              <span>Lista</span>
              <span className="lum-cart-count" aria-hidden="true">
                {cartItems.length}
              </span>
            </button>

            <button
              className="lum-menu-button"
              type="button"
              aria-expanded={isOpen}
              aria-controls="lum-mobile-nav"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={toggle}
            >
              <Icon name={isOpen ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="lum-mobile-nav" id="lum-mobile-nav">
            <nav aria-label="Navegación móvil">
              {NAV_ITEMS.map((item) => (
                <a key={item.href} href={item.href} onClick={close}>
                  {item.label}
                  <Icon name="arrow-right" size={16} />
                </a>
              ))}
            </nav>
            <button className="lum-btn lum-btn--primary" type="button" onClick={() => { close(); setCartOpen(true); }}>
              <Icon name="cart" size={18} />
              Ver lista de interés
            </button>
          </div>
        )}
      </header>

      <main id="contenido">
        <section className="lum-hero" id="inicio" aria-labelledby="lum-hero-title">
          <div className="lum-shell lum-hero__grid">
            <div className="lum-hero__content">
              <p className="lum-kicker">{hero.eyebrow}</p>
              <h1 id="lum-hero-title">
                {hero.title}
                <em>{hero.titleAccent}</em>
              </h1>
              <p className="lum-hero__description">{hero.description}</p>

              <div className="lum-hero__actions">
                <a className="lum-btn lum-btn--primary" href="#catalogo">
                  {hero.primaryCta.label}
                  <Icon name="arrow-right" size={18} />
                </a>
                <a className="lum-btn lum-btn--ghost" href="#tienda">
                  {hero.secondaryCta.label}
                </a>
              </div>

              <ul className="lum-hero__features">
                {hero.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" size={14} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lum-hero__visual">
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                width={hero.image.width}
                height={hero.image.height}
                fetchPriority="high"
              />
              <span className="lum-hero__label">Selección de demostración</span>
              <div className="lum-hero__mini">
                <img
                  src={aromaCategory.image.src}
                  alt={aromaCategory.image.alt}
                  width={aromaCategory.image.width}
                  height={aromaCategory.image.height}
                  loading="lazy"
                />
                <span>
                  <strong>{aromaCategory.label}</strong>
                  {aromaCategory.description}
                </span>
              </div>
            </div>
          </div>

          <div className="lum-hero__marquee" aria-hidden="true">
            <span>Cerámica</span>
            <span>Aroma</span>
            <span>Accesorios</span>
            <span>Regalos</span>
            <span>Hecho para durar</span>
          </div>
        </section>

        <section className="lum-categories" id="categorias" aria-labelledby="lum-categories-title">
          <div className="lum-shell">
            <div className="lum-section-head">
              <div>
                <p className="lum-kicker">{categories.eyebrow}</p>
                <h2 id="lum-categories-title">{categories.title}</h2>
              </div>
              <p>{categories.description}</p>
            </div>

            <div className="lum-categories__grid">
              {categories.items.map((item) => (
                <button
                  className="lum-category"
                  type="button"
                  key={item.id}
                  onClick={() => applyCategory(item.id)}
                  aria-label={`Ver productos de ${item.label}`}
                >
                  <img
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    loading="lazy"
                  />
                  <span className="lum-category__body">
                    <strong>{item.label}</strong>
                    <span>{item.description}</span>
                    <span className="lum-category__link">
                      Ver selección
                      <Icon name="arrow-up-right" size={14} />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="lum-catalog" id="catalogo" aria-labelledby="lum-catalog-title">
          <div className="lum-shell">
            <div className="lum-section-head lum-section-head--split">
              <div>
                <p className="lum-kicker">{products.eyebrow}</p>
                <h2 id="lum-catalog-title">{products.title}</h2>
              </div>
              <p>{products.description}</p>
            </div>

            <div className="lum-filters">
              <div className="lum-filters__categories" role="group" aria-label="Filtrar por categoría">
                <button
                  type="button"
                  className={category === 'todas' ? 'is-active' : ''}
                  aria-pressed={category === 'todas'}
                  onClick={() => setCategory('todas')}
                >
                  Todo
                </button>
                {categories.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={category === item.id ? 'is-active' : ''}
                    aria-pressed={category === item.id}
                    onClick={() => setCategory(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="lum-filters__search">
                <label htmlFor="lum-search">Buscar producto</label>
                <div>
                  <Icon name="search" size={17} />
                  <input
                    id="lum-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Taza, vela, bolso…"
                  />
                </div>
              </div>
            </div>

            <div className="lum-results-meta" aria-live="polite">
              <span>
                {filteredProducts.length}{' '}
                {filteredProducts.length === 1 ? 'pieza' : 'piezas'} en la demostración
              </span>
              <span>{products.note}</span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="lum-products">
                {filteredProducts.map((product) => {
                  const inCart = cartItems.includes(product.id);

                  return (
                    <article className="lum-product" key={product.id}>
                      <div className="lum-product__media">
                        <img
                          src={product.image.src}
                          alt={product.image.alt}
                          width={product.image.width}
                          height={product.image.height}
                          loading="lazy"
                        />
                        {product.badge && (
                          <span className="lum-product__badge">{product.badge}</span>
                        )}
                      </div>
                      <div className="lum-product__body">
                        <span className="lum-product__category">
                          {categoryLabels[product.category]}
                        </span>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <div className="lum-product__footer">
                          <strong>{product.price}</strong>
                          {inCart ? (
                            <button
                              className="lum-product__added"
                              type="button"
                              onClick={() => setCartOpen(true)}
                            >
                              <Icon name="check" size={15} />
                              En tu lista
                            </button>
                          ) : (
                            <button
                              className="lum-product__add"
                              type="button"
                              onClick={() => addToCart(product.id)}
                              aria-label={`Agregar ${product.name} a la lista de interés`}
                            >
                              <Icon name="plus" size={15} />
                              Agregar
                            </button>
                          )}
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="lum-empty" role="status">
                <Icon name="search" size={27} />
                <h3>No encontramos piezas con esa búsqueda.</h3>
                <p>Prueba con otra categoría o un término más general.</p>
                <button className="lum-btn lum-btn--primary" type="button" onClick={clearFilters}>
                  Ver todo el catálogo
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="lum-benefits" aria-labelledby="lum-benefits-title">
          <div className="lum-shell">
            <div className="lum-benefits__head">
              <p className="lum-kicker">{benefits.eyebrow}</p>
              <h2 id="lum-benefits-title">{benefits.title}</h2>
              <p>{benefits.description}</p>
            </div>
            <div className="lum-benefits__grid">
              {benefits.items.map((item) => (
                <article key={item.title}>
                  <span className="lum-benefits__icon" aria-hidden="true">
                    <Icon name={item.icon} size={22} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="lum-about" id="tienda" aria-labelledby="lum-about-title">
          <div className="lum-shell lum-about__grid">
            <figure className="lum-about__media">
              <img
                src={about.image.src}
                alt={about.image.alt}
                width={about.image.width}
                height={about.image.height}
                loading="lazy"
              />
              <figcaption>Objetos sencillos · Selección de demostración</figcaption>
            </figure>

            <div className="lum-about__content">
              <p className="lum-kicker">{about.eyebrow}</p>
              <h2 id="lum-about-title">{about.title}</h2>
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul>
                {about.points.map((point) => (
                  <li key={point}>
                    <Icon name="check" size={14} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="lum-contact" id="contacto" aria-labelledby="lum-contact-title">
          <div className="lum-shell lum-contact__grid">
            <div>
              <p className="lum-kicker">{contact.eyebrow}</p>
              <h2 id="lum-contact-title">{contact.title}</h2>
              <p>{contact.description}</p>
              <div className="lum-contact__actions">
                <a className="lum-btn lum-btn--light" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} />
                  {contact.whatsappLabel}
                </a>
                <button className="lum-btn lum-btn--outline-light" type="button" onClick={() => setCartOpen(true)}>
                  <Icon name="cart" size={18} />
                  Ver mi lista
                </button>
              </div>
              <p className="lum-contact__note">{contact.note}</p>
            </div>

            <div className="lum-contact__card">
              <div>
                <span>
                  <Icon name="pin" size={17} />
                  Tienda de demostración
                </span>
                <strong>{contact.address}</strong>
                <small>{contact.addressNote}</small>
                {mapUrl && (
                  <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                    Ver en Google Maps
                    <Icon name="arrow-up-right" size={14} />
                  </a>
                )}
              </div>
              <div>
                <span>
                  <Icon name="clock" size={17} />
                  Horarios
                </span>
                {contact.hours.map((entry) => (
                  <p className="lum-hours" key={entry.days}>
                    <span>{entry.days}</span>
                    <span>{entry.time}</span>
                  </p>
                ))}
              </div>
              {phoneHref && (
                <a className="lum-contact__phone" href={phoneHref}>
                  <Icon name="phone" size={16} />
                  {contact.phone}
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="lum-footer">
        <div className="lum-shell lum-footer__top">
          <div>
            <strong>{business.name}</strong>
            <p>{footer.tagline}</p>
          </div>
          <nav aria-label="Navegación del pie de página">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <Link to="/">Volver al catálogo</Link>
          </nav>
        </div>
        <div className="lum-shell lum-footer__bottom">
          <p>
            Sitio web de demostración creado por <Link to="/">Nexobyte</Link>. Productos,
            precios, dirección y datos de contacto son ilustrativos.
          </p>
          <span>© {new Date().getFullYear()} Luma · Demo</span>
        </div>
      </footer>

      <DemoDialog
        open={cartOpen}
        onClose={closeCart}
        titleId="lum-cart-title"
        variant="drawer"
        className="lum-cart-dialog"
      >
        <div className="lum-cart">
          <div className="lum-cart__head">
            <p className="lum-kicker">{cart.eyebrow}</p>
            <h3 id="lum-cart-title">{cart.title}</h3>
            <span>
              {cartItems.length} {cartItems.length === 1 ? 'pieza' : 'piezas'}
            </span>
          </div>

          {selectedProducts.length > 0 ? (
            <>
              <ul className="lum-cart__list">
                {selectedProducts.map((product) => (
                  <li key={product.id}>
                    <img
                      src={product.image.src}
                      alt={product.image.alt}
                      width={product.image.width}
                      height={product.image.height}
                    />
                    <div>
                      <span>{categoryLabels[product.category]}</span>
                      <strong>{product.name}</strong>
                      <p>{product.price}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Quitar ${product.name} de la lista`}
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="lum-cart__foot">
                <div className="lum-cart__total">
                  <span>Total de referencia</span>
                  <strong>${cartTotal}</strong>
                </div>
                <p>{cart.note}</p>
                <a className="lum-btn lum-btn--primary" href={cartWhatsAppUrl} target="_blank" rel="noopener noreferrer">
                  <Icon name="whatsapp" size={18} />
                  {cart.consultLabel}
                </a>
                <button className="lum-cart__clear" type="button" onClick={() => setCartItems([])}>
                  Vaciar lista
                </button>
              </div>
            </>
          ) : (
            <div className="lum-cart__empty">
              <span aria-hidden="true">
                <Icon name="cart" size={28} />
              </span>
              <h4>{cart.emptyMessage}</h4>
              <p>Explora el catálogo y agrega las piezas que quieras consultar.</p>
              <a className="lum-btn lum-btn--primary" href="#catalogo" onClick={closeCart}>
                Ver catálogo
              </a>
              <p className="lum-cart__empty-note">{cart.note}</p>
            </div>
          )}
        </div>
      </DemoDialog>
    </div>
  );
}
