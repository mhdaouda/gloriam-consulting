'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { FaLightbulb, FaChartLine, FaDigitalTachograph, FaUsers, FaChartBar, FaBullseye, FaHandshake, FaRocket } from 'react-icons/fa';
import { useLocaleContext } from '@/contexts/LocaleContext';
import { t } from '@/i18n';
import { IconType } from 'react-icons';

interface Service {
  Icon: IconType;
  color: string;
}

interface ServiceData {
  title: string;
  description: string;
}

const serviceIcons: Service[] = [
  {
    Icon: FaLightbulb,
    color: 'from-yellow-400 to-orange-500'
  },
  {
    Icon: FaChartLine,
    color: 'from-green-400 to-emerald-500'
  },
  {
    Icon: FaDigitalTachograph,
    color: 'from-blue-400 to-indigo-500'
  },
  {
    Icon: FaUsers,
    color: 'from-purple-400 to-violet-500'
  },
  {
    Icon: FaChartBar,
    color: 'from-red-400 to-rose-500'
  },
  {
    Icon: FaBullseye,
    color: 'from-teal-400 to-cyan-500'
  },
  {
    Icon: FaHandshake,
    color: 'from-amber-400 to-orange-500'
  },
  {
    Icon: FaRocket,
    color: 'from-sky-400 to-blue-500'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function Services() {
  const { locale } = useLocaleContext();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const services = t(locale, 'services.list') as unknown as ServiceData[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      <motion.div 
        className="container mx-auto px-4 py-24"
        style={{ opacity, scale }}
      >
        <motion.div 
          className="mb-20 text-center"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className="mb-6 text-5xl font-bold sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800">
            {t(locale, 'services.title')}
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-zinc-600 leading-relaxed">
            {t(locale, 'services.description')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {services.map((service, index) => {
            const ServiceIcon = serviceIcons[index].Icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400 }
                }}
                className="group rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-zinc-100 hover:border-zinc-200 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="mb-6 text-4xl">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${serviceIcons[index].color} text-white transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <ServiceIcon size={32} />
                    </div>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-zinc-800 transition-colors duration-300 group-hover:text-zinc-900">
                    {service.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-6 h-0.5 w-0 bg-gradient-to-r group-hover:w-full transition-all duration-500 opacity-0 group-hover:opacity-100" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
} 