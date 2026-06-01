export const EXTERNAL_LINKS = {
  portfolio: 'https://www.daoudayinde.com/',
  flashcoder: 'https://www.flashcoderacademy.com/',
  turbotech: 'https://turbotechconsulting.com/',
  calendly: 'https://calendly.com/daoudayinde/30min',
} as const;

export const HOME_COUNTRY_IDS = [
  'france',
  'estonia',
  'belgium',
  'luxembourg',
  'netherlands',
  'poland',
  'germany',
  'switzerland',
] as const;

export const ZONE_GROUPS = [
  {
    key: 'europe' as const,
    ids: [
      'france',
      'estonia',
      'belgium',
      'luxembourg',
      'netherlands',
      'poland',
      'germany',
      'switzerland',
    ] as const,
  },
] as const;
