export type Locale = 'fr' | 'en';

const translations = {
  fr: {
    navigation: {
      services: 'Services',
      about: 'À propos',
      trust: 'Ils nous font confiance',
      contact: 'Contact',
    },
    home: {
      title: 'Bienvenue chez Gloriam Consulting',
      subtitle: 'Votre partenaire en excellence commerciale',
      description: 'Nous accompagnons les entreprises dans leur transformation et leur croissance',
      learnMore: 'En savoir plus',
      features: {
        title: 'Nos atouts',
        subtitle: 'Découvrez ce qui fait notre différence et notre expertise',
        innovation: {
          title: 'Innovation',
          description: 'Des solutions innovantes et créatives pour transformer votre entreprise',
        },
        excellence: {
          title: 'Excellence',
          description: 'Une expertise pointue pour des résultats exceptionnels',
        },
        partnership: {
          title: 'Partenariat',
          description: 'Un accompagnement personnalisé pour une réussite durable',
        },
      },
    },
    cookies: {
      description: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site.',
      learnMore: 'En savoir plus',
      accept: 'Accepter',
    },
    footer: {
      allRights: 'Tous droits réservés.',
      privacyPolicy: 'Politique de confidentialité',
      cookies: 'Cookies',
    },
  },
  en: {
    navigation: {
      services: 'Services',
      about: 'About',
      trust: 'They Trust Us',
      contact: 'Contact',
    },
    home: {
      title: 'Welcome to Gloriam Consulting',
      subtitle: 'Your partner in business excellence',
      description: 'We support companies in their transformation and growth',
      learnMore: 'Learn more',
      features: {
        title: 'Our strengths',
        subtitle: 'Discover what makes our difference and expertise',
        innovation: {
          title: 'Innovation',
          description: 'Innovative and creative solutions to transform your business',
        },
        excellence: {
          title: 'Excellence',
          description: 'Sharp expertise for exceptional results',
        },
        partnership: {
          title: 'Partnership',
          description: 'Personalized support for sustainable success',
        },
      },
    },
    cookies: {
      description: 'We use cookies to enhance your experience on our site.',
      learnMore: 'Learn more',
      accept: 'Accept',
    },
    footer: {
      allRights: 'All rights reserved.',
      privacyPolicy: 'Privacy Policy',
      cookies: 'Cookies',
    },
  },
} as const;

export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let value: any = translations[locale];
  
  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k];
    } else {
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
} 