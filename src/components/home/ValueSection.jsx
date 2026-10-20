import Icon from '../Icon';

const values = [
  {
    icon: 'palette',
    title: 'Identidad configurable',
    description:
      'Colores, tipografía, imágenes y estilo visual se ajustan a cada negocio sin rehacer el sitio.',
  },
  {
    icon: 'message',
    title: 'Contacto sin fricción',
    description:
      'WhatsApp, teléfono, correo y ubicación quedan a un toque desde cualquier sección.',
  },
  {
    icon: 'globe',
    title: 'Bien en cada pantalla',
    description:
      'La misma página funciona en teléfonos, tabletas y computadoras, con imágenes optimizadas.',
  },
  {
    icon: 'shield',
    title: 'Contenido mantenible',
    description:
      'Textos, servicios, precios y horarios viven separados del diseño para actualizarlos con orden.',
  },
];

export default function ValueSection() {
  return (
    <section className="studio-values" id="plantilla">
      <div className="studio-container studio-values__inner">
        <div className="studio-values__intro">
          <span className="studio-eyebrow studio-eyebrow--light">La plantilla</span>
          <h2>Diseño con criterio, no una plantilla genérica.</h2>
          <p>
            Cada sitio parte de una estructura probada, pero se adapta por
            completo al negocio. El resultado se siente propio porque el
            contenido también lo es.
          </p>
          <a className="studio-text-link" href="#demos">
            Ver la plantilla en acción
            <Icon name="arrow-right" size={17} />
          </a>
        </div>

        <ul className="value-list">
          {values.map((value) => (
            <li className="value-card" key={value.title}>
              <span className="value-card__icon">
                <Icon name={value.icon} size={22} />
              </span>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
