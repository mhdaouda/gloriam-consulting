'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import { useTranslations } from '@/app/_hooks/useTranslations';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
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

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Réponses en français
    if (locale === 'fr') {
      if (message.includes('service') || message.includes('services')) {
        return t('responses.services');
      }
      
      if (message.includes('contact') || message.includes('contacter') || message.includes('téléphone') || message.includes('email')) {
        return t('responses.contact');
      }
      
      if (message.includes('prix') || message.includes('tarif') || message.includes('coût') || message.includes('devis')) {
        return t('responses.pricing');
      }
      
      if (message.includes('entreprise') || message.includes('société') || message.includes('pm')) {
        return t('responses.company');
      }
      
      if (message.includes('stratégie') || message.includes('stratégique')) {
        return t('responses.strategy');
      }
      
      if (message.includes('digital') || message.includes('numérique') || message.includes('transformation')) {
        return t('responses.digital');
      }
      
      if (message.includes('rh') || message.includes('ressources humaines') || message.includes('recrutement')) {
        return t('responses.hr');
      }
      
      if (message.includes('financier') || message.includes('finance') || message.includes('budget')) {
        return t('responses.finance');
      }
      
      if (message.includes('merci') || message.includes('remerciement')) {
        return t('responses.thanks');
      }
      
      if (message.includes('bonjour') || message.includes('salut') || message.includes('hello')) {
        return t('responses.greeting');
      }
      
      if (message.includes('aide') || message.includes('help')) {
        return t('responses.help');
      }
      
      return t('responses.default');
    }
    
    // Réponses en anglais
    else {
      if (message.includes('service') || message.includes('services')) {
        return t('responses.services');
      }
      
      if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
        return t('responses.contact');
      }
      
      if (message.includes('price') || message.includes('cost') || message.includes('quote') || message.includes('pricing')) {
        return t('responses.pricing');
      }
      
      if (message.includes('company') || message.includes('business') || message.includes('sme')) {
        return t('responses.company');
      }
      
      if (message.includes('strategy') || message.includes('strategic')) {
        return t('responses.strategy');
      }
      
      if (message.includes('digital') || message.includes('transformation')) {
        return t('responses.digital');
      }
      
      if (message.includes('hr') || message.includes('human resources') || message.includes('recruitment')) {
        return t('responses.hr');
      }
      
      if (message.includes('financial') || message.includes('finance') || message.includes('budget')) {
        return t('responses.finance');
      }
      
      if (message.includes('thank') || message.includes('thanks')) {
        return t('responses.thanks');
      }
      
      if (message.includes('hello') || message.includes('hi') || message.includes('good morning')) {
        return t('responses.greeting');
      }
      
      if (message.includes('help')) {
        return t('responses.help');
      }
      
      return t('responses.default');
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
    setInputValue('');
    setIsTyping(true);

    // Simuler un délai de réponse
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
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
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white p-4 rounded-full shadow-lg transition-all duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
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
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* En-tête */}
            <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <FiMessageSquare size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {locale === 'fr' ? 'Assistant Gloriam' : 'Gloriam Assistant'}
                  </h3>
                  <p className="text-xs text-emerald-100">
                    {t('online')}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {!message.isUser && (
                        <div className="w-6 h-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <FiMessageSquare size={12} className="text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.isUser ? 'text-emerald-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString(locale === 'fr' ? 'fr-FR' : 'en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      {message.isUser && (
                        <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <FiUser size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Indicateur de frappe */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-full flex items-center justify-center">
                        <FiMessageSquare size={12} className="text-white" />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Actions rapides */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(action)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Zone de saisie */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('typeMessage')}
                  className="flex-1 p-3 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-sm"
                  disabled={isTyping}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:bg-gray-300 text-white p-3 rounded-xl transition-all duration-200 disabled:cursor-not-allowed"
                >
                  <FiSend size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
