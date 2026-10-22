const ICONS = {
  'arrow-right': (
    <>
      <path d="M4 12h15" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  'arrow-up-right': (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  'arrow-left': (
    <>
      <path d="M20 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  filter: (
    <>
      <path d="M4 6h16M7 12h10M10 18h4" />
    </>
  ),
  wrench: (
    <path d="M14.5 6.5a4 4 0 0 0-5 5L4 17v3h3l5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-3-3 2.5-2.5Z" />
  ),
  car: (
    <>
      <path d="M5 17h14M6 17v2M18 17v2M4 13l2-5h12l2 5v4H4v-4Z" />
      <circle cx="7.5" cy="14" r="1" />
      <circle cx="16.5" cy="14" r="1" />
    </>
  ),
  gauge: (
    <>
      <path d="M4 18a8 8 0 1 1 16 0" />
      <path d="m12 14 4-4" />
      <circle cx="12" cy="14" r="1" />
    </>
  ),
  bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
  droplet: <path d="M12 2s7 7.5 7 12a7 7 0 0 1-14 0C5 9.5 12 2 12 2Z" />,
  wind: (
    <>
      <path d="M3 8h11a3 3 0 1 0-3-3" />
      <path d="M3 12h15a2 2 0 1 1-2 2" />
      <path d="M3 16h8a2.5 2.5 0 1 1-2.5 2.5" />
    </>
  ),
  home: (
    <>
      <path d="m3 11 9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  building: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="1" />
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3" />
    </>
  ),
  ruler: (
    <>
      <path d="m3 17 14-14 4 4L7 21l-4-4Z" />
      <path d="m8 12 2 2M11 9l2 2M14 6l2 2" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </>
  ),
  bed: (
    <>
      <path d="M3 20v-8h18v8M3 16h18" />
      <path d="M6 12V8h5v4M13 12V8h5v4" />
    </>
  ),
  bath: (
    <>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
      <path d="M6 12V6a2 2 0 0 1 4 0" />
      <path d="m6 20-1 2M18 20l1 2" />
    </>
  ),
  area: (
    <>
      <path d="M4 4h6M4 4v6M20 4h-6M20 4v6M4 20h6M4 20v-6M20 20h-6M20 20v-6" />
    </>
  ),
  cart: (
    <>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M3 4h2l2.5 11h10L20 7H6" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  trash: (
    <>
      <path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6" />
    </>
  ),
  heart: (
    <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />
  ),
  star: (
    <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
  ),
  clipboard: (
    <>
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V2h6v2M8 9h8M8 13h8M8 17h5" />
    </>
  ),
  send: (
    <>
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
      <path d="M22 2 11 13" />
    </>
  ),
  check: <path d="m4.5 12 4.5 4.5L19.5 6" />,
  pin: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  phone: (
    <path d="M21 16.9v3a2 2 0 0 1-2.2 2 19.7 19.7 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 4.2 2 2 0 0 1 3.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L7.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  whatsapp: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12.04 2A9.9 9.9 0 0 0 2.13 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01a9.9 9.9 0 0 0 9.9-9.92A9.9 9.9 0 0 0 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.03.24-3.47-.72-2.93-1.15-4.79-4.2-4.94-4.39-.14-.19-1.16-1.55-1.16-2.96s.74-2.1 1-2.4c.26-.29.57-.37.76-.37h.55c.18.01.42-.07.65.5.24.58.81 1.98.88 2.12.07.14.12.31.02.5-.1.19-.19.31-.38.48-.19.17-.4.38-.57.51-.19.14-.39.29-.17.68.22.39.99 1.64 2.13 2.66 1.46 1.3 2.68 1.7 3.06 1.89.38.19.6.16.82-.1.22-.26.95-1.1 1.2-1.48.25-.38.5-.31.84-.19.34.12 2.17 1.03 2.54 1.22.37.19.62.29.71.45.09.16.09.93-.15 1.61Z"
    />
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  message: (
    <path d="M21 11.5a8 8 0 0 1-8 8H8l-4.5 2.5.9-4.2A8 8 0 0 1 3 11.5a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z" />
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18h1.5a2.5 2.5 0 0 0 1-4.8 2.5 2.5 0 0 1 1-4.8H18A9 9 0 0 0 12 3Z" />
      <circle cx="7.5" cy="10" r="1" />
      <circle cx="9" cy="6.5" r="1" />
      <circle cx="14" cy="6.5" r="1" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m8.8 12 2.2 2.2 4.4-4.4" />
    </>
  ),
  utensils: (
    <>
      <path d="M7 3v7M4 3v4.5a3 3 0 0 0 6 0V3M7 10v11" />
      <path d="M17 3v18M17 3c-2 .8-3 2.7-3 5.5V12h3" />
    </>
  ),
  flame: (
    <path d="M12 22c4 0 7-2.7 7-6.6 0-3-1.8-5.2-4.3-7.4-.9-.8-1.7-1.7-2.2-2.8-.2-.5-.9-.6-1.2-.2-1.5 2-2 4.4-2 6.4 0 .8.1 1.5.3 2.1-.9-.2-1.8-.8-2.4-1.6-.3-.4-.9-.4-1.1.1A8.7 8.7 0 0 0 5 15.4C5 19.3 8 22 12 22Z" />
  ),
  leaf: (
    <>
      <path d="M20 4c-8 0-14 4.4-14 10a5 5 0 0 0 5 5c5.6 0 9-6 9-15Z" />
      <path d="M4 21c2-6 6-9 12-12" />
    </>
  ),
  bowl: (
    <>
      <path d="M4 12h16a8 8 0 0 1-16 0Z" />
      <path d="M9 8c0-1.5 1-2 1-3.5M14 8c0-1.5 1-2 1-3.5M3 21h18" />
    </>
  ),
  cup: (
    <>
      <path d="M5 8h11v7a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V8Z" />
      <path d="M16 10h2a2.5 2.5 0 0 1 0 5h-2M4 21h14" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="3.5" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
    </>
  ),
  coffee: (
    <>
      <path d="M5 12a7 7 0 0 1 14 0 7 7 0 0 1-14 0Z" />
      <path d="M12 5c-3 3-3 11 0 14" />
    </>
  ),
  snowflake: (
    <>
      <path d="M12 2v20M4 6l16 12M20 6 4 18" />
      <path d="m9.5 4 2.5 2 2.5-2M9.5 20l2.5-2 2.5 2M4 10l2.5 1L4 12M20 10l-2.5 1L20 12" />
    </>
  ),
  croissant: (
    <>
      <path d="M4.5 15.5c-1.5-4.5 2-10 7.5-11 1.5-.3 3 .1 4.3 1 .5.4.6 1 .2 1.5L8 17c-.8 1-2.5.7-3.5-1.5Z" />
      <path d="m14 7 4 4M10 10l4 4" />
    </>
  ),
  cake: (
    <>
      <path d="M4 20h16v-6H4v6ZM5 14v-3a2 2 0 0 1 4 0v3M11 14V9a2 2 0 0 1 4 0v5M17 14v-2a2 2 0 0 1 3-1.7" />
      <path d="M12 5V2" />
    </>
  ),
  sandwich: (
    <>
      <path d="M3 10h18M5 10a7 7 0 0 1 14 0M3 14h18M5 18h14l-2 3H7l-2-3Z" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6" cy="7" r="2.5" />
      <circle cx="6" cy="17" r="2.5" />
      <path d="m8 8.5 12 8.5M8 15.5 20 7" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" />
      <path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" />
    </>
  ),
};

export default function Icon({ name, size = 20, className, title }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title && <title>{title}</title>}
      {ICONS[name] ?? ICONS.sparkles}
    </svg>
  );
}
