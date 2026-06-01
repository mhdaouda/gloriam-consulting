'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { useTranslations } from '@/app/_hooks/useTranslations';
import { PageHero } from '@/app/_components/PageHero';
import { fadeInUp } from '@/app/_lib/motionPresets';

function ContactFormInner() {
  const { locale } = useLocaleContext();
  const t = useTranslations('contact');
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    const question = searchParams?.get('question');
    if (question) {
      const decodedQuestion = decodeURIComponent(question);
      const isQuote =
        locale === 'fr'
          ? decodedQuestion.includes('Demande de devis')
          : decodedQuestion.toLowerCase().includes('quote');
      setFormData((prev) => ({
        ...prev,
        subject: isQuote
          ? locale === 'fr'
            ? 'Demande de devis'
            : 'Quote Request'
          : locale === 'fr'
            ? 'Question depuis le chatbot'
            : 'Question from chatbot',
        message: decodedQuestion,
      }));
    }
  }, [searchParams, locale]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formDataToSend = new FormData(form);

      const response = await fetch(
        'https://formsubmit.co/ajax/contact@gloriam-consulting.com',
        {
          method: 'POST',
          body: formDataToSend,
        }
      );

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('send failed');
      }
    } catch {
      alert(t('form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'block w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 transition focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200/80 dark:border-white/15 dark:bg-slate-900/60 dark:text-slate-100 dark:focus:border-emerald-500 dark:focus:ring-emerald-500/30';

  if (submitted) {
    return (
      <div className="theme-page dark-surface min-h-screen py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="theme-card mx-auto max-w-lg rounded-2xl p-10"
          >
            <h2 className="mb-4 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {t('success.title')}
            </h2>
            <p className="mb-6 text-slate-600 dark:text-slate-400">
              {t('success.description')}
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-2.5 text-sm font-semibold text-slate-950"
            >
              {t('success.again')}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-page dark-surface min-h-screen">
      <PageHero title={t('title')} description={t('description')} />

      <section className="py-16 md:py-20">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8"
          >
            <div className="flex justify-center lg:justify-start">
              <div className="relative h-52 w-52 overflow-hidden rounded-2xl border border-emerald-200/80 shadow-lg ring-2 ring-emerald-100 dark:border-emerald-500/30 dark:ring-emerald-500/20">
                <Image
                  src="/images/profile-pi.png"
                  alt="Gloriam Consulting"
                  fill
                  className="object-cover"
                  sizes="208px"
                  priority
                />
              </div>
            </div>

            {[
              {
                Icon: FaMapMarkerAlt,
                title: t('addressLabel'),
                lines: ['14 Avenue du Général de gaulle', '95360 Montmagny, France'],
              },
              {
                Icon: FaEnvelope,
                title: t('emailLabel'),
                lines: ['contact@gloriam-consulting.com', 'daoudayinde@gmail.com'],
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <div className="rounded-xl bg-gradient-to-br from-emerald-100 to-cyan-100 p-4 text-emerald-700 dark:from-emerald-500/20 dark:to-cyan-500/10 dark:text-emerald-400">
                  <item.Icon size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  {item.lines.map((line) => (
                    <p key={line} className="text-slate-600 dark:text-slate-400">
                      {line.includes('@') ? (
                        <a
                          href={`mailto:${line}`}
                          className="transition hover:text-emerald-600 dark:hover:text-emerald-400"
                        >
                          {line}
                        </a>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="theme-card rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="_captcha" value="false" />
              <input
                type="hidden"
                name="_subject"
                value={
                  locale === 'fr'
                    ? 'Nouveau message du site Gloriam Consulting'
                    : 'New message from Gloriam Consulting website'
                }
              />
              <input type="hidden" name="_template" value="table" />

              {(
                [
                  { name: 'name', label: t('form.name'), type: 'text' },
                  { name: 'email', label: t('form.email'), type: 'email' },
                  { name: 'subject', label: t('form.subject'), type: 'text' },
                ] as const
              ).map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }))
                    }
                    required
                    className={inputClass}
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, message: e.target.value }))
                  }
                  required
                  rows={4}
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-60"
              >
                {isSubmitting ? t('form.submitting') : t('form.submit')}
                <FaPaperPlane className="transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ContactLoading() {
  const t = useTranslations('contact');
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
        <p className="mt-4 text-slate-600 dark:text-slate-400">{t('loading')}</p>
      </div>
    </div>
  );
}

export default function ContactContent() {
  return (
    <Suspense fallback={<ContactLoading />}>
      <ContactFormInner />
    </Suspense>
  );
}
