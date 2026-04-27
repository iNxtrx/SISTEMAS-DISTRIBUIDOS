/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ShoppingCart, 
  Bell, 
  User,
  Minus,
  Plus,
  ArrowRight,
  Music,
  Ticket
} from 'lucide-react';

// Types
interface TicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  status: 'DISPONIBLE' | 'ULTIMOS BOLETOS' | 'AGOTADO';
  limit?: number;
}

const TICKET_TIERS: TicketTier[] = [
  {
    id: 'general',
    name: 'General',
    price: 150000,
    description: 'Acceso a la pista principal (de pie).',
    status: 'DISPONIBLE',
  },
  {
    id: 'vip',
    name: 'VIP',
    price: 450000,
    description: 'Zonas elevadas laterales, barra libre y baños exclusivos.',
    status: 'ULTIMOS BOLETOS',
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 950000,
    description: 'Acceso preferencial, meet & greet y vista panorámica.',
    status: 'AGOTADO',
  }
];

type View = 'eventos' | 'recintos' | 'soporte';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('eventos');
  const [quantities, setQuantities] = useState<Record<string, number>>({
    general: 2,
    vip: 0,
    platinum: 0
  });

  const [supportForm, setSupportForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const totalTickets = useMemo(() => 
    Object.values(quantities).reduce((acc: number, curr: number) => acc + curr, 0), 
  [quantities]);

  const totalPrice = useMemo(() => 
    TICKET_TIERS.reduce((total, tier) => total + (tier.price * quantities[tier.id]), 0),
  [quantities]);

  const updateQuantity = (id: string, delta: number) => {
    const tier = TICKET_TIERS.find(t => t.id === id);
    if (!tier || tier.status === 'AGOTADO') return;

    setQuantities(prev => {
      const newVal = Math.max(0, prev[id] + delta);
      return { ...prev, [id]: newVal };
    });
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensaje enviado con éxito. Nos pondremos en contacto contigo pronto.');
    setSupportForm({ name: '', email: '', subject: '', message: '' });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('COP', '').trim();
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass h-20 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('eventos')}>
            <h1 className="text-2xl font-bold tracking-tighter text-white">TICKETSYSTEM</h1>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button 
              onClick={() => setCurrentView('eventos')}
              className={`transition-colors pb-1 ${currentView === 'eventos' ? 'text-white border-b-2 border-accent' : 'text-on-surface-variant hover:text-white'}`}
            >
              Eventos
            </button>
            <button 
              onClick={() => setCurrentView('recintos')}
              className={`transition-colors pb-1 ${currentView === 'recintos' ? 'text-white border-b-2 border-accent' : 'text-on-surface-variant hover:text-white'}`}
            >
              Recintos
            </button>
            <button 
              onClick={() => setCurrentView('soporte')}
              className={`transition-colors pb-1 ${currentView === 'soporte' ? 'text-white border-b-2 border-accent' : 'text-on-surface-variant hover:text-white'}`}
            >
              Soporte
            </button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {totalTickets > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-accent text-[10px] font-bold flex items-center justify-center rounded-full text-white">
                {totalTickets}
              </span>
            )}
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <User className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'eventos' && (
            <motion.div
              key="eventos"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="pb-32"
            >
              {/* Hero Section */}
              <div className="relative h-[45vh] min-h-[400px] flex flex-col justify-end px-6 md:px-12 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center">
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent" />
                  <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 space-y-4 max-w-4xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-accent">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                    Gira Mundial 2026
                  </div>
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                    Symphony of the Night
                  </h2>
                  <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                    La experiencia inmersiva de sonido y luz más esperada del año.
                  </p>
                </div>
              </div>

              {/* Content Grid */}
              <div className="max-w-7xl mx-auto px-6 md:px-12 -mt-12 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Event Details */}
                <div className="lg:col-span-4 translate-y-6">
                  <div className="glass-card p-8 space-y-8">
                    <h3 className="text-2xl font-bold text-white border-b border-white/10 pb-4">
                      Detalles del Evento
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                          <Calendar className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Viernes, 24 de Noviembre</h4>
                          <p className="text-sm text-on-surface-variant">Añadir al calendario</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                          <Clock className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">21:00 HRS</h4>
                          <p className="text-sm text-on-surface-variant">Puertas abren a las 19:00</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                          <MapPin className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Movistar Arena</h4>
                          <p className="text-sm text-on-surface-variant">Dga. 61 bis #26-36, Bogotá</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-accent/10 border border-accent/20">
                          <Users className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">The Midnight Echoes</h4>
                          <p className="text-sm text-on-surface-variant">Invitado especial: Luna Nova</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Ticket Selection */}
                <div className="lg:col-span-8 space-y-6 mt-8">
                  <div className="flex items-center gap-3 mb-2">
                    <Ticket className="w-6 h-6 text-accent" />
                    <h3 className="text-2xl font-bold text-white">Selecciona tus Boletos</h3>
                  </div>

                  <div className="space-y-4">
                    {TICKET_TIERS.map((tier) => (
                      <div
                        key={tier.id}
                        className={`glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden transition-all duration-300 ${tier.status === 'AGOTADO' ? 'opacity-60 grayscale cursor-not-allowed' : 'hover:border-accent/40'}`}
                      >
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className={`text-xl font-bold ${tier.status === 'AGOTADO' ? 'text-on-surface-variant' : 'text-white'}`}>
                              {tier.name}
                            </h4>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              tier.status === 'DISPONIBLE' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                              tier.status === 'ULTIMOS BOLETOS' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                              'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}>
                              {tier.status}
                            </span>
                          </div>
                          <p className="text-sm text-on-surface-variant max-w-md">
                            {tier.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between md:justify-end gap-8">
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${tier.status === 'AGOTADO' ? 'text-on-surface-variant line-through' : 'text-white'}`}>
                              ${formatCurrency(tier.price)}
                            </div>
                            <div className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
                              COP c/u
                            </div>
                          </div>

                          <div className="flex items-center gap-1 bg-surface ring-1 ring-white/10 p-1 rounded-lg">
                            <button 
                              onClick={() => updateQuantity(tier.id, -1)}
                              disabled={tier.status === 'AGOTADO' || quantities[tier.id] === 0}
                              className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className={`w-8 text-center font-bold font-mono ${tier.status === 'AGOTADO' ? 'text-on-surface-variant' : 'text-white'}`}>
                              {quantities[tier.id]}
                            </span>
                            <button 
                              onClick={() => updateQuantity(tier.id, 1)}
                              disabled={tier.status === 'AGOTADO'}
                              className="p-1.5 rounded hover:bg-white/10 disabled:opacity-30 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentView === 'recintos' && (
            <motion.div
              key="recintos"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto px-6 md:px-12 py-12"
            >
              <h2 className="text-4xl font-bold text-white mb-2">Nuestros Recintos</h2>
              <p className="text-on-surface-variant mb-12">Explora los mejores escenarios donde la magia sucede.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { name: 'Movistar Arena', location: 'Bogotá, Colombia', img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=2070', capacity: '14,000' },
                  { name: 'Estadio Atanasio Girardot', location: 'Medellín, Colombia', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2070', capacity: '45,000' },
                  { name: 'Centro de Eventos Valle del Pacífico', location: 'Cali, Colombia', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=2070', capacity: '15,000' },
                ].map((venue, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -5 }}
                    className="glass-card overflow-hidden group"
                  >
                    <div className="h-48 overflow-hidden">
                      <img src={venue.img} alt={venue.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <h4 className="text-xl font-bold text-white">{venue.name}</h4>
                        <p className="text-sm text-on-surface-variant flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {venue.location}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-accent">
                        <span>Capacidad</span>
                        <span>{venue.capacity} personas</span>
                      </div>
                      <button className="w-full py-3 rounded-lg border border-white/10 hover:bg-accent hover:text-white transition-all font-bold">
                        Ver Cartelera
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentView === 'soporte' && (
            <motion.div
              key="soporte"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-3xl mx-auto px-6 py-20"
            >
              <div className="glass-card p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Users className="w-32 h-32" />
                </div>
                
                <h2 className="text-4xl font-bold text-white mb-4">¿Necesitas Ayuda?</h2>
                <p className="text-on-surface-variant mb-12">Estamos aquí para resolver tus dudas. Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.</p>

                <form onSubmit={handleSupportSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant">Nombre Completo</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Ej. Juan Pérez"
                        value={supportForm.name}
                        onChange={e => setSupportForm({...supportForm, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-on-surface-variant">Correo Electrónico</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="tu@email.com"
                        value={supportForm.email}
                        onChange={e => setSupportForm({...supportForm, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant">Asunto</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                      placeholder="¿En qué podemos ayudarte?"
                      value={supportForm.subject}
                      onChange={e => setSupportForm({...supportForm, subject: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-on-surface-variant">Mensaje</label>
                    <textarea 
                      rows={5}
                      required
                      className="w-full bg-surface border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                      placeholder="Escribe tu mensaje aquí..."
                      value={supportForm.message}
                      onChange={e => setSupportForm({...supportForm, message: e.target.value})}
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98] glow-primary"
                  >
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Fixed Checkout Bar (Solo visible en Eventos) */}
      <AnimatePresence>
        {currentView === 'eventos' && totalTickets > 0 && (
          <motion.footer 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 p-6 md:px-12 flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.4)]"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
                Total ({totalTickets} {totalTickets === 1 ? 'boleto' : 'boletos'})
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-white tracking-tighter">
                  ${formatCurrency(totalPrice)}
                </span>
                <span className="text-sm font-medium text-on-surface-variant">COP</span>
              </div>
            </div>

            <button className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-3 transition-all active:scale-95 glow-primary">
              Pagar Ahora
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.footer>
        )}
      </AnimatePresence>
    </div>
  );
}
