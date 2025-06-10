export type Locale = 'fr' | 'en';

const translations = {
  fr: {
    navigation: {
      home: 'Accueil',
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
      banner: {
        description: 'Nous utilisons des cookies pour améliorer votre expérience sur notre site.',
        learnMore: 'En savoir plus',
        accept: 'Accepter'
      },
      title: 'Politique des Cookies',
      description: 'Découvrez comment nous utilisons les cookies pour améliorer votre expérience.',
      sections: {
        what: {
          title: "Qu'est-ce qu'un cookie ?",
          description: "Un cookie est un petit fichier texte stocké sur votre navigateur lors de votre visite sur notre site. Ces fichiers nous permettent d'améliorer votre expérience utilisateur."
        },
        usage: {
          title: 'Notre utilisation des cookies',
          description: 'Nous utilisons les cookies pour :',
          purposes: [
            'Mémoriser vos préférences de langue',
            'Analyser le trafic du site',
            'Améliorer nos services'
          ]
        },
        types: {
          title: 'Types de cookies utilisés',
          essential: {
            title: 'Cookies essentiels',
            description: 'Nécessaires au fonctionnement du site'
          },
          preferences: {
            title: 'Cookies de préférences',
            description: 'Permettent de mémoriser vos choix'
          },
          analytics: {
            title: 'Cookies analytiques',
            description: "Nous aident à comprendre l'utilisation du site"
          }
        },
        control: {
          title: 'Contrôle des cookies',
          description: 'Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez.',
          browser: 'Gérer les cookies dans votre navigateur',
          settings: 'Paramètres des cookies'
        }
      }
    },
    footer: {
      allRights: 'Tous droits réservés.',
      privacyPolicy: 'Politique de confidentialité',
      cookies: 'Cookies',
    },
  },
  en: {
    navigation: {
      home: 'Home',
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
      banner: {
        description: 'We use cookies to enhance your experience on our website.',
        learnMore: 'Learn more',
        accept: 'Accept'
      },
      title: 'Cookie Policy',
      description: 'Learn how we use cookies to enhance your experience.',
      sections: {
        what: {
          title: 'What is a cookie?',
          description: 'A cookie is a small text file stored in your browser when you visit our site. These files help us improve your user experience.'
        },
        usage: {
          title: 'Our use of cookies',
          description: 'We use cookies to:',
          purposes: [
            'Remember your language preferences',
            'Analyze site traffic',
            'Improve our services'
          ]
        },
        types: {
          title: 'Types of cookies we use',
          essential: {
            title: 'Essential cookies',
            description: 'Necessary for the site to function'
          },
          preferences: {
            title: 'Preference cookies',
            description: 'Remember your choices'
          },
          analytics: {
            title: 'Analytics cookies',
            description: 'Help us understand site usage'
          }
        },
        control: {
          title: 'Cookie control',
          description: 'You can control and/or delete cookies as you wish.',
          browser: 'Manage cookies in your browser',
          settings: 'Cookie settings'
        }
      }
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