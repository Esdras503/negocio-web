export const fontStacks = {
  fraunces: '"Fraunces", "Iowan Old Style", Georgia, serif',
  'dm-serif': '"DM Serif Display", Georgia, "Times New Roman", serif',
  bebas: '"Bebas Neue", "Arial Narrow", Impact, sans-serif',
  manrope: '"Manrope", "Segoe UI", system-ui, sans-serif',
};

export const radiusValues = {
  sharp: { large: '6px', small: '2px' },
  soft: { large: '22px', small: '12px' },
  round: { large: '34px', small: '16px' },
};

const DEFAULT_THEME = {
  primary: '#1f5e40',
  primaryDark: '#153f2b',
  accent: '#c8a27a',
  background: '#fbfaf6',
  surface: '#ffffff',
  ink: '#17231c',
  muted: '#626b64',
  headingFont: 'fraunces',
  bodyFont: 'manrope',
  heroStyle: 'split',
  radius: 'soft',
};

export function isHexColor(value) {
  return typeof value === 'string' && /^#[0-9a-f]{6}$/i.test(value);
}

function hexToRgb(hex) {
  if (!isHexColor(hex)) return null;
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

/**
 * Devuelve el color de texto con mayor contraste sobre un fondo dado.
 * Se usa para que los botones principales sean legibles con cada marca.
 */
export function getContrastColor(background) {
  const rgb = hexToRgb(background);
  if (!rgb) return '#ffffff';

  const channel = (value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };

  const luminance =
    0.2126 * channel(rgb.r) +
    0.7152 * channel(rgb.g) +
    0.0722 * channel(rgb.b);

  const contrastWithWhite = 1.05 / (luminance + 0.05);
  const contrastWithBlack = (luminance + 0.05) / 0.05;

  return contrastWithWhite >= contrastWithBlack ? '#ffffff' : '#171811';
}

export function resolveThemeStyles(theme = {}) {
  const primary = isHexColor(theme.primary) ? theme.primary : DEFAULT_THEME.primary;
  const colors = {
    primary,
    primaryDark: isHexColor(theme.primaryDark)
      ? theme.primaryDark
      : primary,
    accent: isHexColor(theme.accent) ? theme.accent : DEFAULT_THEME.accent,
    background: isHexColor(theme.background)
      ? theme.background
      : DEFAULT_THEME.background,
    surface: isHexColor(theme.surface) ? theme.surface : DEFAULT_THEME.surface,
    ink: isHexColor(theme.ink) ? theme.ink : DEFAULT_THEME.ink,
    muted: isHexColor(theme.muted) ? theme.muted : DEFAULT_THEME.muted,
  };

  const radius = radiusValues[theme.radius] ?? radiusValues.soft;

  return {
    '--brand': colors.primary,
    '--brand-dark': colors.primaryDark,
    '--accent': colors.accent,
    '--bg': colors.background,
    '--surface': colors.surface,
    '--ink': colors.ink,
    '--muted': colors.muted,
    '--on-primary': getContrastColor(colors.primary),
    '--on-accent': getContrastColor(colors.accent),
    '--heading-font': fontStacks[theme.headingFont] ?? fontStacks.fraunces,
    '--body-font': fontStacks[theme.bodyFont] ?? fontStacks.manrope,
    '--radius': radius.large,
    '--radius-sm': radius.small,
  };
}
