'use client';

import { useTranslations } from '../../_hooks/useTranslations';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function Contact() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      const response = await fetch('https://formsubmit.co/ajax/contact@gloriam-consulting.com', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      } else {
        throw new Error('Error sending message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending your message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-white p-8 shadow-lg"
          >
            <h2 className="mb-4 text-2xl font-bold text-emerald-600">Message sent successfully!</h2>
            <p className="mb-6 text-zinc-600">We will get back to you as soon as possible.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="rounded-lg bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700"
            >
              Send another message
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-20 text-center"
        >
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600 leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid gap-16 md:grid-cols-2">
          <div className="space-y-8">
            {[
              {
                Icon: FaMapMarkerAlt,
                title: "Address",
                content: ["14 Avenue du Général de gaulle", "95360 Montmagny, France"],
                gradient: "from-emerald-100 to-teal-100",
                iconColor: "text-emerald-600"
              },
              {
                Icon: FaPhone,
                title: "Phone",
                content: ["+33 6 84 10 63 93"],
                gradient: "from-teal-100 to-emerald-100",
                iconColor: "text-teal-600"
              },
              {
                Icon: FaEnvelope,
                title: "Email",
                content: ["contact@gloriam-consulting.com"],
                gradient: "from-emerald-100 to-teal-100",
                iconColor: "text-emerald-600"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className={`rounded-xl bg-gradient-to-br ${item.gradient} p-4 shadow-lg`}>
                  <item.Icon size={24} className={item.iconColor} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-800">
                    {item.title}
                  </h3>
                  {item.content.map((line, i) => (
                    <p key={i} className="text-zinc-600">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-8 shadow-lg border border-emerald-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="New message from Gloriam Consulting website" />
              <input type="hidden" name="_template" value="table" />
              
              {[
                { name: "name", label: "Full Name", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "subject", label: "Subject", type: "text" }
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-zinc-700 mb-2"
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    required
                    className="block w-full rounded-lg border border-emerald-200 bg-white px-4 py-3 text-zinc-700 transition-colors duration-200 focus:border-teal-400 focus:outline-none focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                  />
                </div>
              ))}

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-zinc-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="block w-full rounded-lg border border-emerald-200 bg-white px-4 py-3 text-zinc-700 transition-colors duration-200 focus:border-teal-400 focus:outline-none focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-white transition-all duration-200 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 disabled:opacity-50"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  <FaPaperPlane className="transform transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 