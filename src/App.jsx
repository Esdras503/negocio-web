
import './App.css'

function App() {
  return (
    <>
      <header className="navbar">
        <a href="#inicio" className="brand">
          <span className="brand-icon">W</span>
          WebLocal
        </a>

        <nav>
          <a href="#servicios">Servicios</a>
          <a href="#demostraciones">Demostraciones</a>
          <a href="#contacto" className="nav-button">
            Cotizar mi pagina
          </a>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-content">
            <span className="eyebrow">
              DESARROLLO WEB EN SANTA ANA
            </span>

            <h1>
              Tu negocio merece
              <span> estar en Internet.</span>
            </h1>

            <p>
              Creamos paginas web para restaurantes, pupuserias y
              cafeterias que quieren mostrar sus productos, publicar
              sus menus y recibir consultas por WhatsApp.
            </p>

            <div className="hero-actions">
              <a href="#contacto" className="primary-button">
                Quiero mi pagina web
              </a>

              <a href="#demostraciones" className="secondary-button">
                Ver demostraciones
              </a>
            </div>

            <div className="hero-note">
              <span className="status-dot"></span>
              Diseno adaptable a celulares y computadoras
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-card">
              <div className="visual-top">
                <span>MENU DIGITAL</span>
                <span className="visual-dot">●</span>
              </div>

              <div className="food-illustration" aria-hidden="true">
                🍽️
              </div>

              <h2>El sabor de tu negocio</h2>
              <p>Tu menu, tus productos y tu informacion en un solo lugar.</p>

              <div className="menu-example">
                <span>Menu digital</span>
                <span>WhatsApp ↗</span>
              </div>
            </div>

            <div className="floating-tag">
              <span>✓</span> Tu negocio en linea
            </div>
          </div>
        </section>

        <section id="servicios" className="section">
          <div className="section-heading">
            <span className="eyebrow">NUESTROS SERVICIOS</span>
            <h2>Todo lo necesario para comenzar</h2>
            <p>
              Una pagina profesional sin complicar la administracion
              de tu negocio.
            </p>
          </div>

          <div className="service-grid">
            <article className="service-card">
              <span className="service-icon">🌐</span>
              <h3>Pagina web profesional</h3>
              <p>
                Presenta tu negocio, sus horarios, ubicacion y medios
                de contacto.
              </p>
            </article>

            <article className="service-card">
              <span className="service-icon">🍴</span>
              <h3>Menu digital</h3>
              <p>
                Muestra tus productos, categorias, fotografias y
                precios de manera organizada.
              </p>
            </article>

            <article className="service-card">
              <span className="service-icon">💬</span>
              <h3>Contacto por WhatsApp</h3>
              <p>
                Facilita que tus clientes consulten sobre productos
                y pedidos.
              </p>
            </article>
          </div>
        </section>

        <section id="demostraciones" className="section demos-section">
          <div className="section-heading">
            <span className="eyebrow">NUESTRO PORTAFOLIO</span>
            <h2>Ideas para tu tipo de negocio</h2>
            <p>
              Estas son demostraciones conceptuales. Los nombres y
              negocios mostrados son ficticios.
            </p>
          </div>

          <div className="demo-grid">
            <article className="demo-card demo-pupusas">
              <div className="demo-art" aria-hidden="true">🫓</div>
              <div className="demo-info">
                <span className="demo-category">COMIDA TIPICA</span>
                <h3>El Comal de Casa</h3>
                <p>Una propuesta calida para pupuserias y antojitos.</p>
                <span className="demo-label">Demostracion conceptual</span>
              </div>
            </article>

            <article className="demo-card demo-cafe">
              <div className="demo-art" aria-hidden="true">☕</div>
              <div className="demo-info">
                <span className="demo-category">CAFETERIA</span>
                <h3>Cafe Nube</h3>
                <p>Una identidad elegante para cafe, pan y postres.</p>
                <span className="demo-label">Demostracion conceptual</span>
              </div>
            </article>

            <article className="demo-card demo-burger">
              <div className="demo-art" aria-hidden="true">🍔</div>
              <div className="demo-info">
                <span className="demo-category">COMIDA RAPIDA</span>
                <h3>Brasa Urbana</h3>
                <p>Un estilo moderno para hamburguesas y combos.</p>
                <span className="demo-label">Demostracion conceptual</span>
              </div>
            </article>
          </div>
        </section>

        <section id="contacto" className="contact-section">
          <span className="eyebrow">HAGAMOS CRECER TU NEGOCIO</span>
          <h2>Hablemos de tu pagina web</h2>
          <p>
            Cuentanos que tipo de negocio tienes y te ayudaremos a
            encontrar una opcion adecuada.
          </p>

          <a
            className="primary-button contact-button"
            href="https://wa.me/50370000000?text=Hola%2C%20quiero%20informacion%20sobre%20una%20pagina%20web."
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por WhatsApp ↗
          </a>

          <small>
            Recuerda configurar aqui tu numero real antes de publicar.
          </small>
        </section>
      </main>

      <footer className="footer">
        <a href="#inicio" className="brand">
          <span className="brand-icon">W</span>
          WebLocal
        </a>
        <p>Desarrollo web para negocios locales en El Salvador.</p>
        <span>© {new Date().getFullYear()} WebLocal</span>
      </footer>
    </>
  )
}

export default App
