'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function PrivacyPolicy() {
  const t = useTranslations('privacy');

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="prose prose-zinc mx-auto max-w-4xl"
        >
          <h1 className="mb-8 text-4xl font-bold">Politique de Confidentialité et Cookies</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold">1. Introduction</h2>
            <p>
              Cette politique de confidentialité explique comment Gloriam Consulting utilise les cookies 
              et technologies similaires pour améliorer votre expérience sur notre site web.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">2. Qu'est-ce qu'un cookie ?</h2>
            <p>
              Un cookie est un petit fichier texte stocké sur votre ordinateur ou appareil mobile 
              lorsque vous visitez un site web. Les cookies sont largement utilisés pour faire 
              fonctionner les sites web ou les rendre plus efficaces, ainsi que pour fournir 
              des informations aux propriétaires du site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">3. Comment utilisons-nous les cookies ?</h2>
            <p>Nous utilisons les cookies pour :</p>
            <ul className="list-disc pl-6">
              <li>Mémoriser vos préférences et paramètres</li>
              <li>Améliorer la sécurité du site</li>
              <li>Analyser l'utilisation de notre site pour l'améliorer</li>
              <li>Personnaliser votre expérience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">4. Types de cookies utilisés</h2>
            <h3 className="text-xl font-medium mt-4">Cookies essentiels</h3>
            <p>
              Ces cookies sont nécessaires au fonctionnement du site. Ils incluent par exemple 
              les cookies qui permettent de se connecter à des zones sécurisées.
            </p>

            <h3 className="text-xl font-medium mt-4">Cookies analytiques</h3>
            <p>
              Ces cookies nous permettent de comptabiliser les visites et les sources de trafic 
              pour mesurer et améliorer les performances de notre site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">5. Gestion des cookies</h2>
            <p>
              Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. 
              Vous pouvez supprimer tous les cookies déjà présents sur votre ordinateur et 
              paramétrer la plupart des navigateurs pour les bloquer. Toutefois, dans ce cas, 
              vous devrez peut-être ajuster manuellement certaines préférences à chaque visite 
              sur un site, et certains services et fonctionnalités pourraient ne pas fonctionner.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">6. Nous contacter</h2>
            <p>
              Pour toute question concernant notre utilisation des cookies, vous pouvez nous 
              contacter à : <a href="mailto:contact@gloriam-consulting.com" className="text-blue-600 hover:text-blue-800">
              contact@gloriam-consulting.com</a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">7. Mises à jour de cette politique</h2>
            <p>
              Nous pouvons mettre à jour cette politique de temps à autre. Nous vous encourageons 
              à consulter régulièrement cette page pour rester informé des changements.
            </p>
            <p className="mt-4">
              Dernière mise à jour : {new Date().toLocaleDateString()}
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
} 