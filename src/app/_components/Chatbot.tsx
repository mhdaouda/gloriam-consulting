'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiUser, FiMessageSquare, FiExternalLink } from 'react-icons/fi';
import { useTranslations } from '@/app/_hooks/useTranslations';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  action?: {
    type: 'redirect' | 'quote';
    url?: string;
    data?: string;
  };
}

interface ChatbotProps {
  locale?: string;
}

export default function Chatbot({ locale = 'fr' }: ChatbotProps) {
  const t = useTranslations('chatbot');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        text: t('welcome'),
        isUser: false,
        timestamp: new Date()
      }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const redirectToPage = (path: string) => {
    setIsOpen(false);
    setTimeout(() => {
      window.location.href = `/${locale}${path}`;
    }, 300);
  };

  const redirectToContactWithQuestion = (question: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const encodedQuestion = encodeURIComponent(question);
      window.location.href = `/${locale}/contact?question=${encodedQuestion}`;
    }, 300);
  };

  const getBotResponse = (userMessage: string): { text: string; action?: Message['action'] } => {
    const message = userMessage.toLowerCase().trim();
    
    // Réponses en français
    if (locale === 'fr') {
      // Demande de devis ou estimation
      if (message.includes('devis') || message.includes('estimation') || message.includes('estimer') || 
          message.includes('prix') || message.includes('tarif') || message.includes('coût') ||
          message.includes('combien') || message.includes('coûte')) {
        return {
          text: t('responses.quote'),
          action: {
            type: 'quote',
            data: userMessage
          }
        };
      }

      // Formation
      if (message.includes('formation') || message.includes('former') || message.includes('apprendre') ||
          message.includes('cours') || message.includes('séminaire') || message.includes('workshop')) {
        return {
          text: t('responses.training'),
          action: {
            type: 'quote',
            data: userMessage
          }
        };
      }

      // Services
      if (message.includes('service') || message.includes('services') || message.includes('offre') ||
          message.includes('proposez') || message.includes('disponible')) {
        return {
          text: t('responses.services'),
          action: {
            type: 'redirect',
            url: '/services'
          }
        };
      }

      // Contact direct
      if (message.includes('contact') || message.includes('contacter') || message.includes('téléphone') || 
          message.includes('email') || message.includes('appeler') || message.includes('joindre') ||
          message.includes('appel') || message.includes('tél')) {
        return {
          text: t('responses.contact'),
          action: {
            type: 'redirect',
            url: '/contact'
          }
        };
      }

      // Stratégie
      if (message.includes('stratégie') || message.includes('stratégique') || message.includes('plan') ||
          message.includes('planification')) {
        return { text: t('responses.strategy') };
      }

      // Digital / Transformation
      if (message.includes('digital') || message.includes('numérique') || message.includes('transformation') ||
          message.includes('informatique') || message.includes('technologie') || message.includes('tech')) {
        return { text: t('responses.digital') };
      }

      // RH / Ressources Humaines
      if (message.includes('rh') || message.includes('ressources humaines') || message.includes('recrutement') ||
          message.includes('recruter') || message.includes('recrute') || message.includes('emploi')) {
        return { text: t('responses.hr') };
      }

      // Finance
      if (message.includes('financier') || message.includes('finance') || message.includes('budget') ||
          message.includes('comptabilité') || message.includes('comptable') || message.includes('fiscal')) {
        return { text: t('responses.finance') };
      }

      // Entreprise / PME
      if (message.includes('entreprise') || message.includes('société') || message.includes('pm') ||
          message.includes('tpe') || message.includes('startup') || message.includes('start-up')) {
        return {
          text: t('responses.company'),
          action: {
            type: 'redirect',
            url: '/services'
          }
        };
      }

      // À propos
      if (message.includes('propos') || message.includes('qui') || message.includes('équipe') ||
          message.includes('histoire') || message.includes('mission') || message.includes('vision')) {
        return {
          text: t('responses.about'),
          action: {
            type: 'redirect',
            url: '/about'
          }
        };
      }

      // Durée / Temps
      if (message.includes('durée') || message.includes('temps') || message.includes('combien de temps') ||
          message.includes('rapidement') || message.includes('rapide') || message.includes('délai')) {
        return { text: t('responses.duration') };
      }

      // Expert / Expertise
      if (message.includes('expert') || message.includes('expertise') || message.includes('spécialiste') ||
          message.includes('compétence') || message.includes('savoir-faire')) {
        return {
          text: t('responses.expertise'),
          action: {
            type: 'redirect',
            url: '/about'
          }
        };
      }

      // Partenaires / Clients
      if (message.includes('partenaire') || message.includes('client') || message.includes('référence') ||
          message.includes('portfolio') || message.includes('projets')) {
        return {
          text: t('responses.clients'),
          action: {
            type: 'redirect',
            url: '/trust'
          }
        };
      }

      // Merci / Au revoir
      if (message.includes('merci') || message.includes('remerciement') || message.includes('remercie') ||
          message.includes('au revoir') || message.includes('bye')) {
        return { text: t('responses.thanks') };
      }

      // Bonjour / Salut
      if (message.includes('bonjour') || message.includes('salut') || message.includes('hello') ||
          message.includes('bonsoir') || message.includes('bonne journée')) {
        return { text: t('responses.greeting') };
      }

      // Aide
      if (message.includes('aide') || message.includes('help') || message.includes('assistance') ||
          message.includes('soutien') || message.includes('support')) {
        return { text: t('responses.help') };
      }

      // Si aucune réponse trouvée, rediriger vers contact avec la question
      return {
        text: t('responses.default'),
        action: {
          type: 'redirect',
          url: `/contact?question=${encodeURIComponent(userMessage)}`
        }
      };
    }
    
    // Réponses en anglais
    else {
      // Quote / Estimation
      if (message.includes('quote') || message.includes('estimation') || message.includes('estimate') ||
          message.includes('price') || message.includes('cost') || message.includes('pricing') ||
          message.includes('how much') || message.includes('costs')) {
        return {
          text: t('responses.quote'),
          action: {
            type: 'quote',
            data: userMessage
          }
        };
      }

      // Training
      if (message.includes('training') || message.includes('course') || message.includes('seminar') ||
          message.includes('learn') || message.includes('teach') || message.includes('workshop')) {
        return {
          text: t('responses.training'),
          action: {
            type: 'quote',
            data: userMessage
          }
        };
      }

      // Services
      if (message.includes('service') || message.includes('services') || message.includes('offer') ||
          message.includes('available') || message.includes('provide')) {
        return {
          text: t('responses.services'),
          action: {
            type: 'redirect',
            url: '/services'
          }
        };
      }

      // Contact
      if (message.includes('contact') || message.includes('phone') || message.includes('email') ||
          message.includes('call') || message.includes('reach') || message.includes('get in touch')) {
        return {
          text: t('responses.contact'),
          action: {
            type: 'redirect',
            url: '/contact'
          }
        };
      }

      // Strategy
      if (message.includes('strategy') || message.includes('strategic') || message.includes('plan') ||
          message.includes('planning')) {
        return { text: t('responses.strategy') };
      }

      // Digital
      if (message.includes('digital') || message.includes('transformation') || message.includes('tech') ||
          message.includes('technology') || message.includes('it')) {
        return { text: t('responses.digital') };
      }

      // HR
      if (message.includes('hr') || message.includes('human resources') || message.includes('recruitment') ||
          message.includes('recruit') || message.includes('hiring')) {
        return { text: t('responses.hr') };
      }

      // Finance
      if (message.includes('financial') || message.includes('finance') || message.includes('budget') ||
          message.includes('accounting') || message.includes('tax')) {
        return { text: t('responses.finance') };
      }

      // Company
      if (message.includes('company') || message.includes('business') || message.includes('sme') ||
          message.includes('startup') || message.includes('firm')) {
        return {
          text: t('responses.company'),
          action: {
            type: 'redirect',
            url: '/services'
          }
        };
      }

      // About
      if (message.includes('about') || message.includes('who') || message.includes('team') ||
          message.includes('story') || message.includes('mission') || message.includes('vision')) {
        return {
          text: t('responses.about'),
          action: {
            type: 'redirect',
            url: '/about'
          }
        };
      }

      // Duration
      if (message.includes('duration') || message.includes('time') || message.includes('how long') ||
          message.includes('quickly') || message.includes('quick') || message.includes('delay')) {
        return { text: t('responses.duration') };
      }

      // Expert
      if (message.includes('expert') || message.includes('expertise') || message.includes('specialist') ||
          message.includes('skill') || message.includes('competence')) {
        return {
          text: t('responses.expertise'),
          action: {
            type: 'redirect',
            url: '/about'
          }
        };
      }

      // Partners / Clients
      if (message.includes('partner') || message.includes('client') || message.includes('reference') ||
          message.includes('portfolio') || message.includes('projects')) {
        return {
          text: t('responses.clients'),
          action: {
            type: 'redirect',
            url: '/trust'
          }
        };
      }

      // Thanks
      if (message.includes('thank') || message.includes('thanks') || message.includes('bye') ||
          message.includes('goodbye')) {
        return { text: t('responses.thanks') };
      }

      // Greeting
      if (message.includes('hello') || message.includes('hi') || message.includes('good morning') ||
          message.includes('good afternoon') || message.includes('good evening')) {
        return { text: t('responses.greeting') };
      }

      // Help
      if (message.includes('help') || message.includes('assistance') || message.includes('support')) {
        return { text: t('responses.help') };
      }

      // Default - redirect to contact with question
      return {
        text: t('responses.default'),
        action: {
          type: 'redirect',
          url: `/contact?question=${encodeURIComponent(userMessage)}`
        }
      };
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Simuler un délai de réponse
    setTimeout(() => {
      const response = getBotResponse(currentInput);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        action: response.action
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // Gérer les actions après un court délai
      if (response.action) {
        setTimeout(() => {
          if (response.action?.type === 'redirect' && response.action.url) {
            if (response.action.url.includes('contact?question=')) {
              redirectToContactWithQuestion(currentInput);
            } else {
              redirectToPage(response.action.url);
            }
          } else if (response.action?.type === 'quote') {
            redirectToContactWithQuestion(`Demande de devis: ${currentInput}`);
          }
        }, 1500);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    t('quickActions.services'),
    t('quickActions.contact'),
    t('quickActions.quote'),
    t('quickActions.learnMore')
  ];

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20"
        whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiX size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiMessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Fenêtre de chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden backdrop-blur-sm"
          >
            {/* En-tête */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white p-5 flex items-center justify-between rounded-t-3xl border-b border-emerald-500/20">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <FiMessageSquare size={18} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-bold text-base">
                    {locale === 'fr' ? 'Assistant Gloriam' : 'Gloriam Assistant'}
                  </h3>
                  <p className="text-xs text-emerald-100 font-medium flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span>
                    {t('online')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-all duration-200"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50/50 to-white">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {!message.isUser && (
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <FiMessageSquare size={14} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl shadow-sm ${
                      message.isUser
                        ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white rounded-tr-sm'
                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-sm'
                    }`}
                  >
                    <div className="p-3.5">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      {message.action && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <button
                            onClick={() => {
                              if (message.action?.type === 'redirect' && message.action.url) {
                                if (message.action.url.includes('contact?question=')) {
                                  redirectToContactWithQuestion(message.action.data || '');
                                } else {
                                  redirectToPage(message.action.url);
                                }
                              } else if (message.action?.type === 'quote') {
                                redirectToContactWithQuestion(`Demande de devis: ${message.action.data || ''}`);
                              }
                            }}
                            className="flex items-center gap-2 text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            {locale === 'fr' ? 'Aller à la page' : 'Go to page'}
                            <FiExternalLink size={12} />
                          </button>
                        </div>
                      )}
                      <p className={`text-xs mt-2 font-medium ${
                        message.isUser ? 'text-emerald-100/80' : 'text-gray-400'
                      }`}>
                        {message.timestamp.toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  {message.isUser && (
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <FiUser size={14} className="text-white" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Indicateur de frappe */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-100 text-gray-800 p-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
                      <FiMessageSquare size={14} className="text-white" />
                    </div>
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Actions rapides */}
            {messages.length === 1 && (
              <div className="px-5 pb-3 border-t border-gray-100 bg-gray-50/50">
                <div className="flex flex-wrap gap-2 pt-3">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setInputValue(action)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-xs bg-white hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-700 px-4 py-2 rounded-full transition-all duration-200 font-medium shadow-sm"
                    >
                      {action}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Zone de saisie */}
            <div className="p-5 border-t border-gray-100 bg-white rounded-b-3xl">
              <div className="flex items-center space-x-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('typeMessage')}
                  className="flex-1 p-3.5 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 text-sm bg-gray-50 transition-all duration-200 placeholder:text-gray-400"
                  disabled={isTyping}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-300 text-white p-3.5 rounded-2xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center min-w-[48px]"
                >
                  <FiSend size={18} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}