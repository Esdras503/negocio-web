export default function SectionIntro({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) {
  return (
    <div className={`site-intro site-intro--${align} ${className}`.trim()}>
      <span className="site-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
