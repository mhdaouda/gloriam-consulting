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
