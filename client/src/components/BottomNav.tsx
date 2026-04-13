import React from 'react';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface BottomNavProps {
  onReserveClick: () => void;
  phone: string;
  whatsappMessage: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ 
  onReserveClick, 
  phone, 
  whatsappMessage 
}) => {
  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.div 
      initial={{ y: 100, x: '-50%', opacity: 0 }}
      animate={{ y: 0, x: '-50%', opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
      className="fixed bottom-6 left-1/2 w-[92%] max-w-[400px] h-20 z-50"
      style={{ left: '50%' }}
    >
      <div className="w-full h-full rural-card !p-0 flex items-center justify-between px-6 relative overflow-visible shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {/* Call Button */}
        <a 
          href={`tel:${phone}`}
          className="flex flex-col items-center justify-center gap-1 min-w-[60px] transition-all duration-300 hover:scale-110 active:scale-95 group text-[#C0B2A0]"
        >

          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/10 transition-all">
            <Phone size={20} className="text-[#F0E6D8]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Llamar</span>
        </a>

        {/* Reserve Button (Center, Prominent) */}
        <button 
          onClick={onReserveClick}
          className="flex flex-col items-center justify-center gap-1 -mt-8 relative transition-all duration-300 hover:scale-110 active:scale-95 group"
        >
          <div className="w-16 h-16 rounded-full bg-[#C87A3F] border-4 border-[#1A1412] flex items-center justify-center shadow-[0_8px_20px_rgba(200,122,63,0.4)] group-hover:bg-[#A05928] group-hover:shadow-[0_12px_24px_rgba(200,122,63,0.5)] transition-all">
            <Calendar size={28} className="text-[#1A1412] font-bold" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-[0.1em] text-[#F0E6D8] mt-[7px] shadow-sm">Reservar</span>
        </button>

        {/* WhatsApp Button */}
        <a 
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 min-w-[60px] transition-all duration-300 hover:scale-110 active:scale-95 group text-[#C0B2A0]"
        >
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-white/10 group-hover:border-white/10 transition-all">
            <MessageCircle size={20} className="text-[#F0E6D8]" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Chat</span>
        </a>
      </div>
    </motion.div>
  );
};
