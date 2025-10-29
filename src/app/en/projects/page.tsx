'use client';

import { useTranslations } from '../../_hooks/useTranslations';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaBuilding, FaGasPump, FaShieldAlt, FaChartLine, FaCreditCard, FaCheckCircle, FaPills } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const projectIcons = [
  FaPills,
  FaBuilding,
  FaGasPump,
  FaShieldAlt,
  FaChartLine,
  FaCreditCard
];

const gradientColors = [
  'from-purple-500 via-indigo-500 to-blue-500',
  'from-orange-500 via-amber-500 to-yellow-500',
  'from-red-500 via-pink-500 to-rose-500',
  'from-blue-500 via-indigo-500 to-purple-500',
  'from-emerald-500 via-teal-500 to-cyan-500',
  'from-green-500 via-emerald-500 to-teal-500'
];

export default function Projects() {
  const t = useTranslations('projects');
  const projects = t.raw('projects');

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <div className="container mx-auto px-4 py-24">
        <motion.div 
          className="mb-20 text-center"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600 leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-1 lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project: any, index: number) => {
            const Icon = projectIcons[index];
            const gradient = gradientColors[index];
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {project.image && (project.image.includes('construction.jpeg') || project.image.includes('paiements.png') || project.image.includes('StationService.png')) ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-40`} />
                    </>
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon className="text-white text-8xl opacity-60" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-transparent" />
                    </>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${gradient} px-4 py-2 text-sm font-semibold text-white shadow-lg`}>
                      <Icon className="text-base" />
                      <span>{project.client}</span>
                    </div>
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mb-4 text-gray-600 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mb-6 rounded-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-white p-4 border border-emerald-100">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {project.details}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.split(' • ').map((tech: string, techIndex: number) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                      >
                        <FaCheckCircle className="text-emerald-600" />
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="mx-auto max-w-2xl rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-600 p-8 shadow-2xl">
            <h3 className="mb-4 text-2xl font-bold text-white">
              Do you have a similar project?
            </h3>
            <p className="mb-6 text-lg text-emerald-50">
              Contact us to discuss your project and discover how we can support you.
            </p>
            <motion.a
              href="/en/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block rounded-xl bg-white px-8 py-3 font-semibold text-emerald-600 shadow-lg hover:bg-emerald-50 transition-colors"
            >
              Contact us
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

