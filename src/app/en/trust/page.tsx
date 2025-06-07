'use client';

import { useTranslations } from '../../_hooks/useTranslations';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { FaStar, FaHandshake, FaChartLine } from 'react-icons/fa';
import { images } from '../../_lib/images';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Trust() {
  const t = useTranslations('trust');
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const partners = [
    { src: images.partners.alten, alt: "Alten Logo" },
    { src: images.partners.aws, alt: "AWS Logo" },
    { src: images.partners.github, alt: "GitHub Logo" },
    { src: images.partners.google, alt: "Google Logo" },
    { src: images.partners.ibm, alt: "IBM Logo" },
    { src: images.partners.azure, alt: "Microsoft Azure Logo" },
    { src: images.partners.porkbun, alt: "Porkbun Logo" }
  ];

  const clients = [
    { src: images.clients.banquePostale, alt: "Banque Postale Logo" },
    { src: images.clients.nge, alt: "NGE Logo" },
    { src: images.clients.axa, alt: "AXA Logo" },
    { src: images.clients.bp2s, alt: "BP2S Logo" },
    { src: images.clients.totalEnergie, alt: "TotalEnergies Logo" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <motion.div
        className="container mx-auto px-4 py-24"
        style={{ opacity, scale }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="mb-20 text-center"
        >
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl text-zinc-800">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600 leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        {/* Section Partenaires */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-24"
        >
          <h2 className="mb-12 text-center text-3xl font-bold text-zinc-800">
            {t('partners.title')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="flex items-center justify-center"
              >
                <div className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl border border-blue-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-indigo-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <Image
                    src={partner.src}
                    alt={partner.alt}
                    width={200}
                    height={100}
                    className="relative z-10 h-auto w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section Clients */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mb-24"
        >
          <h2 className="mb-12 text-center text-3xl font-bold text-zinc-800">
            {t('clients.title')}
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="flex items-center justify-center"
              >
                <div className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl border border-indigo-100">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-blue-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <Image
                    src={client.src}
                    alt={client.alt}
                    width={200}
                    height={100}
                    className="relative z-10 h-auto w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Section de confiance */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-12 shadow-lg"
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                Icon: FaStar,
                title: t('stats.experience'),
                description: t('stats.experienceDesc'),
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                Icon: FaHandshake,
                title: t('stats.projects'),
                description: t('stats.projectsDesc'),
                gradient: "from-indigo-500 to-blue-500"
              },
              {
                Icon: FaChartLine,
                title: t('stats.satisfaction'),
                description: t('stats.satisfactionDesc'),
                gradient: "from-blue-500 to-indigo-500"
              }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 hover:border-indigo-200"
              >
                <div className={`mb-6 text-4xl bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent transition-colors duration-300`}>
                  <stat.Icon className="w-12 h-12 transform transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mb-4 text-xl font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900">
                  {stat.title}
                </h3>
                <p className="text-zinc-600 leading-relaxed">
                  {stat.description}
                </p>
                <motion.div
                  className="mt-6 h-1 w-0 bg-gradient-to-r from-blue-400 to-indigo-600 group-hover:w-full transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
} 