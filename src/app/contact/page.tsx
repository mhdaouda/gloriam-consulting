'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { t } from '@/i18n';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Contact() {
  const { locale } = useLocaleContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-20 text-center"
        >
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl text-zinc-800">
            {t(locale, 'contact.title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600 leading-relaxed">
            {t(locale, 'contact.description')}
          </p>
        </motion.div>

        <div className="grid gap-16 md:grid-cols-2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <FaEnvelope className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-800">Email</h3>
                <p className="text-zinc-600">contact@gloriam-consulting.com</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <FaPhone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-800">Téléphone</h3>
                <p className="text-zinc-600">+33 6 XX XX XX XX</p>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                <FaMapMarkerAlt className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-800">Adresse</h3>
                <p className="text-zinc-600">Paris, France</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl bg-white p-8 shadow-lg"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-zinc-700">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-zinc-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full rounded-lg border border-zinc-300 px-4 py-2 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full rounded-lg bg-emerald-600 px-6 py-3 text-white transition-colors ${
                isSubmitting ? 'cursor-not-allowed opacity-75' : 'hover:bg-emerald-700'
              }`}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
            </button>

            {submitStatus === 'success' && (
              <p className="text-center text-sm text-emerald-600">
                Votre message a été envoyé avec succès !
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="text-center text-sm text-red-600">
                Une erreur est survenue. Veuillez réessayer.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </div>
  );
} 