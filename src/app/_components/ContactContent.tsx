'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaCalendarAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { useTranslations } from '@/app/_hooks/useTranslations';
import { PageHero } from '@/app/_components/PageHero';
import { CalendlyEmbed } from '@/app/_components/CalendlyEmbed';
import { EXTERNAL_LINKS } from '@/app/_lib/externalLinks';
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
    'block w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-theme transition focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-emerald-500/25';

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
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative aspect-[652/1024] w-56 overflow-hidden rounded-2xl border border-emerald-200/80 shadow-lg ring-2 ring-emerald-100 dark:border-emerald-500/30 dark:ring-emerald-500/20 sm:w-60">
                <Image
                  src="/images/profile-daouda.png"
                  alt={t('profileAlt')}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 224px, 240px"
                  priority
                />
              </div>
              <p className="font-display mt-4 text-lg font-semibold text-theme">
                Mohamed Daouda Ayinde
              </p>
              <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {t('profileRole')}
              </p>
            </div>

            <div className="theme-card rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="rounded-xl bg-gradient-to-br from-emerald-100 to-cyan-100 p-3 text-emerald-700 dark:from-emerald-500/20 dark:to-cyan-500/10 dark:text-emerald-400">
                  <FaCalendarAlt size={20} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-theme">
                    {t('calendly.title')}
                  </h3>
                  <p className="font-label text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
                    {t('calendly.duration')}
                  </p>
                </div>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-theme-muted">
                {t('calendly.description')}
              </p>
              <a
                href={EXTERNAL_LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-sm font-bold text-slate-950 transition hover:from-emerald-400 hover:to-cyan-400"
              >
                <FaCalendarAlt size={14} />
                {t('calendly.cta')}
              </a>
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

      <section className="border-t border-[var(--border)] pb-20 pt-4 md:pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="theme-card mx-auto max-w-4xl overflow-hidden rounded-2xl p-6 md:p-8"
          >
            <div className="mb-6 text-center">
              <h2 className="font-display mb-2 text-2xl font-semibold text-theme md:text-3xl">
                {t('calendly.title')}
              </h2>
              <p className="text-theme-muted">{t('calendly.description')}</p>
            </div>
            <CalendlyEmbed />
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
