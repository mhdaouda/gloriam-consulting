'use client';

import { useTranslations } from 'next-intl';
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
                title: "Adresse",
                content: ["14 Avenue du Général de gaulle", "95360 Montmagny, France"],
                gradient: "from-emerald-100 to-teal-100",
                iconColor: "text-emerald-600"
              },
              {
                Icon: FaPhone,
                title: "Téléphone",
                content: ["+33 6 84 10 63 93"],
                gradient: "from-teal-100 to-emerald-100",
                iconColor: "text-teal-600"
              },
              {
                Icon: FaEnvelope,
                title: "Email",
                content: ["contact@gloriamconsulting.com"],
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
              {[
                { name: "name", label: "Nom complet", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "subject", label: "Sujet", type: "text" }
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
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="block w-full rounded-lg border border-emerald-200 bg-white px-4 py-3 text-zinc-700 transition-colors duration-200 focus:border-teal-400 focus:outline-none focus:ring focus:ring-teal-200 focus:ring-opacity-50"
                />
              </div>

              <button
                type="submit"
                className="group w-full rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 text-white transition-all duration-200 hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Envoyer le message</span>
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