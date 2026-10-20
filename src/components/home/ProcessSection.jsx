import Icon from '../Icon';

const steps = [
  {
    number: '01',
    title: 'Conocemos tu negocio',
    description:
      'Reunimos tu historia, servicios, fotografías, horarios y datos de contacto. La página parte de lo que tu negocio ya es.',
  },
  {
    number: '02',
    title: 'Diseñamos la propuesta',
    description:
      'Adaptamos colores, tipografía, textos y secciones a tu identidad. Revisas la demostración y ajustamos lo necesario.',
  },
  {
    number: '03',
    title: 'Preparamos la publicación',
    description:
      'Probamos el sitio en distintos dispositivos y dejamos listos los enlaces de contacto antes de publicarlo.',
  },
];

export default function ProcessSection() {
  return (
    <section className="studio-process" id="proceso">
      <div className="studio-container">
        <div className="studio-section-heading studio-process__heading">
          <span className="studio-eyebrow">Cómo funciona</span>
          <h2>De la idea a un sitio listo para compartir.</h2>
          <p>
            Un proceso directo, sin pasos innecesarios. Tú conoces el negocio;
            nosotros le damos una presencia web clara y profesional.
          </p>
        </div>

        <ol className="process-steps">
          {steps.map((step) => (
            <li className="process-step" key={step.number}>
              <span className="process-step__number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="process-note">
          <Icon name="shield" size={17} />
          Las condiciones de dominio, hosting y mantenimiento se acuerdan antes
          de publicar cada proyecto.
        </p>
      </div>
    </section>
  );
}
