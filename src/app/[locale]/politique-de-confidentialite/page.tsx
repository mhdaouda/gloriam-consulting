'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-zinc mx-auto max-w-4xl"
        >
          <h1 className="mb-8 text-4xl font-bold">Politique de Confidentialité</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Utilisation des Cookies</h2>
            <p>
              Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous aident à :
            </p>
            <ul className="list-disc pl-6">
              <li>Mémoriser vos préférences</li>
              <li>Comprendre comment vous utilisez notre site</li>
              <li>Améliorer notre site web</li>
              <li>Vous fournir un contenu personnalisé</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Types de Cookies Utilisés</h2>
            <p>Nous utilisons les types de cookies suivants :</p>
            <ul className="list-disc pl-6">
              <li>
                <strong>Cookies essentiels :</strong> Nécessaires au fonctionnement du site
              </li>
              <li>
                <strong>Cookies analytiques :</strong> Pour analyser l'utilisation du site
              </li>
              <li>
                <strong>Cookies de préférences :</strong> Pour mémoriser vos choix
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Vos Choix Concernant les Cookies</h2>
            <p>
              Vous pouvez contrôler et/ou supprimer les cookies comme vous le souhaitez. Vous pouvez supprimer tous les cookies déjà présents sur votre appareil et paramétrer la plupart des navigateurs pour qu'ils les bloquent. Toutefois, dans ce cas, vous devrez peut-être renseigner manuellement certaines préférences à chaque fois que vous visiterez le site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold">Contact</h2>
            <p>
              Pour toute question concernant notre utilisation des cookies, veuillez nous contacter à{' '}
              <a href="mailto:contact@gloriam-consulting.com" className="text-emerald-600 hover:text-emerald-700">
                contact@gloriam-consulting.com
              </a>
              .
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
} 