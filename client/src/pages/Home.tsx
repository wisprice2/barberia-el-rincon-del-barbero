import { useState } from 'react';
import { MapPin, Clock, Star, MessageCircle } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Carousel } from '../components/Carousel';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';
import { BottomNav } from '../components/BottomNav';


export default function Home() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<{name: string, price: string} | null>(null);
  const [showReservationForm, setShowReservationForm] = useState(false);

  const [timeSlotPage, setTimeSlotPage] = useState(0);
  const SLOTS_PER_PAGE = 4;
  const BARBERSHOP_PHONE = '56912345678';
  const BARBERSHOP_NAME = 'El Rincón del Barbero';

  const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=Av.+Manuel+Rodriguez+499,+Chiguayante';

  const gallery = [
    { url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=400&q=80", tag: "FADE / TEXTURIZADO" },
    { url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=400&q=80", tag: "CORTE CLÁSICO" },
    { url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=400&q=80", tag: "BARBA PREMIUM" },
    { url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80", tag: "DISEÑO / FREESTYLE" }
  ];

  const testimonials = [
    { initials: 'FM', name: 'Felipe Muñoz', role: 'Cliente hace 2 años', text: 'Siempre vengo acá. Nunca fallan. La atención al detalle es de otro nivel.' },
    { initials: 'IG', name: 'Ignacio G.', role: 'Cliente Frecuente', text: 'El mejor fade de Chiguayante. Ambiente premium y te atienden a la hora exacta.' },
    { initials: 'CA', name: 'Cristóbal A.', role: 'Nuevo Cliente', text: 'Impecable. Me recomendaron el lugar y la verdad es que el servicio vale cada peso.' }
  ];

  const timeSlots = [
    { time: '16:00', available: true },
    { time: '17:00', available: true },
    { time: '18:00', available: true },
    { time: '19:00', available: true },
    { time: '20:00', available: true },
    { time: '21:00', available: true },
    { time: '22:00', available: false },
  ];

  const services = [
    { 
      name: "Corte Clásico", 
      description: "Corte profesional con líneas precisas", 
      duration: "40 min", 
      price: "$12.000",
      from: true
    },
    { 
      name: "Corte + Barba Premium", 
      description: "Paquete completo para el hombre moderno", 
      duration: "60 min", 
      price: "$22.000",
      popular: true 
    },
    { 
      name: "Perfilado de Barba", 
      description: "Esculpido y definición de bordes", 
      duration: "20 min", 
      price: "$8.000",
      from: true
    },
    { 
      name: "The Midnight Experience", 
      description: "Toalla caliente, lavado y estilo completo", 
      duration: "90 min", 
      price: "$35.000",
      premium: true
    }
  ];

  const handleWhatsAppReservation = () => {

    if (!selectedDate || !selectedTime || !selectedService) {
      toast.error('Por favor selecciona servicio, día y hora');
      return;
    }

    const message = `Hola, me gustaría reservar una cita en ${BARBERSHOP_NAME}\n\n` +
                   `🔹 Servicio: ${selectedService.name}\n` +
                   `💰 Precio: ${selectedService.price}\n` +
                   `📅 Fecha: ${selectedDate}\n` +
                   `⏰ Hora: ${selectedTime}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BARBERSHOP_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    setShowReservationForm(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedService(null);
    toast.success('Abriendo WhatsApp...');
  };


  const renderTestimonials = () => testimonials.map((testimonio, i) => (
    <div key={i} className="rural-card !p-6 w-full flex flex-col justify-between h-full">
      <div>
        <div className="font-display text-4xl text-[#C87A3F] leading-none mb-2 opacity-50">"</div>
        <p className="text-[14px] text-[#F0E6D8] leading-relaxed font-serif italic min-h-[60px] -mt-4">
          {testimonio.text}
        </p>
      </div>
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/10">
        <div className="w-8 h-8 rounded-full border border-white/10 bg-black/30 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-[#C87A3F]">{testimonio.initials}</div>
        <div>
          <p className="text-[12px] text-[#F0E6D8] font-bold uppercase tracking-wider">{testimonio.name}</p>
          <p className="text-[10px] text-[#8A7F72] uppercase tracking-widest mt-0.5">{testimonio.role}</p>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="rural-bg">
        <div className="fixed inset-0 w-full h-full bg-[#1A1412] pointer-events-none z-0" />
        <img 
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663508537406/EGqS8SVLHPHGd5L8vhoASY/barbershop-hero-clean-3cUgWfM4wZX8DNFnd2BDK8.webp" 
          alt="Barberia Elite"
          className="fixed inset-0 w-full h-screen object-cover pointer-events-none z-0 opacity-60"
          style={{ backgroundAttachment: 'fixed', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1412]/50 to-[#1A1412] pointer-events-none z-0" />
      </div>


      <div className="mobile-container pb-40">

        <header className="px-6 pt-12 pb-8 flex flex-col items-center relative z-10">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-col items-center justify-center w-full">
              <img 
                src="/logo_rincon.png" 
                alt={BARBERSHOP_NAME}
                className="w-56 h-56 object-contain drop-shadow-[0_0_50px_rgba(200,122,63,0.3)] pointer-events-none rounded-full"
                style={{ mixBlendMode: 'screen', filter: 'contrast(1.1) brightness(1.1)' }}
              />
            </div>
          </ScrollReveal>
          
          <div className="mt-12">
          
            <ScrollReveal delay={0.3}>
              <h1 className="text-[44px] leading-[1.1] font-black text-[#F0E6D8] tracking-tight mb-4">
                Oficio & <br />
                <span className="text-[#C87A3F] italic font-serif font-normal">Tradicion.</span>
              </h1>
              <p className="text-[15px] text-[#C0B2A0] leading-relaxed max-w-[280px] mb-8 font-medium">
                La experiencia de una barberia clasica. Precision en cada corte.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.5} direction="up">
              <div className="flex gap-2 text-sm">
                <button 
                  onClick={() => {
                    const element = document.getElementById('services-section');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="rural-button primary flex-1 py-3 px-4 text-[13px]"
                >
                  Reservar Hora
                </button>

                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="rural-button flex-1 py-3 px-4 text-[13px]">Visítanos</a>
              </div>
            </ScrollReveal>
          </div>
        </header>

        <main className="px-4 relative z-10">
          {showReservationForm && (
            <ScrollReveal delay={0.1}>
              <section className="mb-6" id="reservation-section">
                <div className="rural-card">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-[16px] font-bold text-[#F0E6D8]">Detalles de Reserva</h2>
                    {selectedService && (
                      <button 
                        onClick={() => setSelectedService(null)}
                        className="text-[10px] uppercase tracking-widest text-[#C87A3F] font-bold"
                      >
                        Cambiar Servicio
                      </button>
                    )}
                  </div>

                  {selectedService ? (
                    <div className="mb-6 p-3 rounded-lg bg-[#C87A3F]/10 border border-[#C87A3F]/20">
                      <p className="text-[10px] uppercase tracking-widest text-[#8A7F72] font-bold mb-1">Servicio Seleccionado</p>
                      <div className="flex justify-between items-center">
                        <p className="text-[14px] font-bold text-[#F0E6D8]">{selectedService.name}</p>
                        <p className="text-[14px] font-bold text-[#C87A3F]">{selectedService.price}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                      <p className="text-[12px] font-bold text-red-400">Selecciona un servicio primero para continuar</p>
                    </div>
                  )}

                  <form onSubmit={(e) => { e.preventDefault(); handleWhatsAppReservation(); }} className="space-y-4">

                    <div>
                      <label className="text-[12px] uppercase tracking-widest text-[#8A7F72] font-bold mb-2 block">Fecha</label>
                      <input
                        type="date"
                        value={selectedDate || ''}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-[#F0E6D8] placeholder-[#8A7F72] focus:outline-none focus:border-[#C87A3F]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[12px] uppercase tracking-widest text-[#8A7F72] font-bold mb-2 block">Hora</label>
                      <select
                        value={selectedTime || ''}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-black/30 border border-white/10 text-[#F0E6D8] focus:outline-none focus:border-[#C87A3F]"
                        required
                      >
                        <option value="">Selecciona una hora</option>
                        {timeSlots.map((slot, i) => (
                          <option key={i} value={slot.time} disabled={!slot.available}>
                            {slot.time} {!slot.available ? '(Lleno)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full rural-button primary !py-3"
                    >
                      Reservar por WhatsApp
                    </button>
                  </form>
                </div>
              </section>
            </ScrollReveal>
          )}

          <section className="mt-8 mb-12" id="services-section">
            <ScrollReveal direction="left">
              <h2 className="text-xs uppercase text-[#8A7F72] tracking-[0.2em] mb-6 px-2 font-bold">Nuestros Servicios</h2>
            </ScrollReveal>
            
            <div className="space-y-4">
              {services.map((service, i) => (
                <ScrollReveal key={i} delay={i * 0.1} direction="up">
                  <div className={`rural-card relative overflow-hidden transition-all duration-300 ${
                    selectedService?.name === service.name ? 'border-[#C87A3F] bg-[#C87A3F]/5' : ''
                  } ${service.premium ? 'border-[#C87A3F]/30 shadow-[0_0_20px_rgba(200,122,63,0.1)]' : ''}`}>
                    
                    {service.popular && (
                      <div className="absolute top-0 right-0 bg-[#C87A3F] text-[#1A1412] text-[9px] font-black px-3 py-1 uppercase tracking-tighter rounded-bl-lg">
                        Popular
                      </div>
                    )}

                    {service.premium && (
                      <div className="absolute -left-12 top-6 -rotate-45 bg-[#C87A3F]/20 text-[#C87A3F] text-[8px] font-black px-12 py-1 uppercase tracking-widest border border-[#C87A3F]/30">
                        Premium
                      </div>
                    )}

                    <div className="flex justify-between items-start mb-2">
                      <div className="max-w-[70%]">
                        <h3 className="text-[16px] font-bold text-[#F0E6D8] leading-tight mb-1">{service.name}</h3>
                        <p className="text-[12px] text-[#8A7F72] leading-snug">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[14px] font-bold text-[#C87A3F]">{service.from ? 'Desde ' : ''}{service.price}</p>
                        <div className="flex items-center justify-end gap-1 mt-1 text-[#8A7F72]">
                          <Clock size={12} />
                          <span className="text-[10px] font-bold uppercase tracking-wider">{service.duration}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedService({ name: service.name, price: service.price });
                        setShowReservationForm(true);
                        setTimeout(() => {
                          const element = document.getElementById('reservation-section');
                          if (element) element.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }}
                      className={`w-full mt-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all ${
                        selectedService?.name === service.name 
                          ? 'bg-[#C87A3F] text-[#1A1412]' 
                          : 'bg-white/5 text-[#F0E6D8] border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {selectedService?.name === service.name ? 'Seleccionado' : 'Seleccionar'}
                    </button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>


          <section className="mt-8">
            <ScrollReveal direction="right">
              <h2 className="text-xs uppercase text-[#8A7F72] tracking-[0.2em] mb-4 px-2 font-bold">Nuestro Trabajo</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="grid grid-cols-2 gap-3">
                {gallery.map((item, i) => (
                  <div key={i} className="relative group overflow-hidden rounded-xl">
                    <img src={item.url} alt={item.tag} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-[#C87A3F]">{item.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-8">
            <ScrollReveal direction="left">
              <h2 className="text-xs uppercase text-[#8A7F72] tracking-[0.2em] mb-4 px-2 font-bold">Visitanos</h2>
              <div className="rural-card flex items-start gap-3 mb-6">
                <MapPin size={20} className="text-[#C87A3F] flex-shrink-0 mt-1" />
                <div>
                  <p className="text-[13px] text-[#F0E6D8] font-bold">Av. Manuel Rodriguez 499</p>
                  <p className="text-[12px] text-[#8A7F72] mt-1">Chiguayante, Chile</p>
                  <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#C87A3F] font-bold uppercase tracking-wider mt-3 inline-block hover:opacity-80 transition-opacity">
                    Abrir en Google Maps
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </section>

          <section className="mt-8">
            <ScrollReveal direction="right">
              <h2 className="text-xs uppercase text-[#8A7F72] tracking-[0.2em] mb-4 px-2 font-bold">Nuestros Clientes</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <Carousel items={renderTestimonials()} />
            </ScrollReveal>
          </section>


          <BottomNav 
            phone={BARBERSHOP_PHONE}
            whatsappMessage="Hola, me gustaría agendar una cita"
            onReserveClick={() => {
              const elementId = selectedService ? 'reservation-section' : 'services-section';
              const element = document.getElementById(elementId);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                if (!selectedService) {
                  toast.info('Por favor selecciona un servicio primero');
                }
              }
            }}
          />



          <footer className="mt-16 pt-8 border-t border-[#8A7F72]/30 text-center">
            <ScrollReveal>
              <p className="text-sm font-bold text-[#F0E6D8] tracking-widest uppercase">{BARBERSHOP_NAME}</p>
              <p className="text-[12px] text-[#C0B2A0] uppercase tracking-widest font-serif italic mt-1">Chiguayante, Chile</p>
            </ScrollReveal>
          </footer>
        </main>
      </div>
    </>
  );
}
