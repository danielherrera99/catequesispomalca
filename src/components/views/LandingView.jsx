import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../config/api';

const LandingView = () => {
  const [config, setConfig] = useState({
    heroTitle: 'Catequesis Pomalca',
    heroSubtitle: 'Formando en la fe y en el amor de Dios...',
    mision: 'Cargando misión...',
    vision: 'Cargando visión...',
    valores: 'Cargando valores...',
    fraseInspiradora: '...',
    autorFrase: '...',
    emailContacto: '...',
    telefonoContacto: '...',
    mapQuery: 'Pomalca',
    familiaTitulo: 'Cargando...',
    familiaDescripcion: '...'
  });
  const [eventos, setEventos] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [configRes, eventosRes] = await Promise.all([
          api.get('/web-config'),
          api.get('/eventos')
        ]);
        
        if (configRes.data.success) setConfig(configRes.data.data);
        if (eventosRes.data.success) {
          const now = new Date();
          const proximos = eventosRes.data.data
            .filter(e => new Date(e.fecha) >= now)
            .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
            .slice(0, 3);
          setEventos(proximos);
        }
      } catch (err) {
        console.error('Error al cargar datos:', err);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.toLocaleString('es', { month: 'short' });
    return { day, month };
  };

  return (
    <div className="landing-page animate-fade">
      {/* Navegación Pública */}
      <nav className="landing-nav">
        <Link to="/" className="logo">CATEQUESIS POMALCA</Link>
        
        <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <a href="#inicio" onClick={() => setIsMenuOpen(false)}>Inicio</a>
          <a href="#mision" onClick={() => setIsMenuOpen(false)}>Misión</a>
          <a href="#eventos" onClick={() => setIsMenuOpen(false)}>Eventos</a>
          <a href="#contacto" onClick={() => setIsMenuOpen(false)}>Contacto</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="inicio" className="hero-section" style={{ backgroundImage: `url('/hero_Catequesis Pomalca_background.png')` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">{config.heroTitle}</h1>
          <p className="hero-subtitle">
            {config.heroSubtitle}
          </p>
          <div className="flex-responsive" style={{ justifyContent: 'center' }}>
            <button className="btn btn-primary" style={{ padding: '1rem 3rem' }}>
              Únete a nuestra catequesis
            </button>
            <button className="btn btn-ghost" style={{ padding: '1rem 3rem' }}>
              Ver actividades
            </button>
          </div>
        </div>
      </header>

      {/* Pilares Section */}
      <section id="mision" className="features-grid section-padding">
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </div>
          <h3>Espiritualidad</h3>
          <p>{config.mision}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          </div>
          <h3>Formación</h3>
          <p>{config.vision}</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
          </div>
          <h3>Comunidad</h3>
          <p>{config.valores}</p>
        </div>
      </section>

      {/* Familia Parroquial Section */}
      <section id="familia" className="section-padding" style={{ background: 'linear-gradient(to right, rgba(0, 51, 102, 0.05), rgba(0, 51, 102, 0.02))', position: 'relative', overflow: 'hidden' }}>
        <div className="flex-responsive" style={{ maxWidth: '1000px', margin: '0 auto', alignItems: 'center' }}>
          <div style={{ flex: '1', minWidth: '280px' }}>
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>Nuestra Familia Parroquial</h2>
            <h4 style={{ color: 'var(--secondary)', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>{config.familiaTitulo}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8' }}>
              {config.familiaDescripcion}
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/" className="btn btn-ghost" style={{ padding: '0.8rem 2rem', textDecoration: 'none' }}>
                Conocer más
              </Link>
            </div>
          </div>
          <div style={{ flex: '0.8', minWidth: '280px', textAlign: 'center', position: 'relative' }}>
             <div style={{ 
               width: '100%', 
               aspectRatio: '1/1', 
               background: 'var(--primary)', 
               borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', 
               opacity: 0.1, 
               position: 'absolute', 
               top: '0', 
               left: '0', 
               zIndex: 1 
             }}></div>
              <img src="/escudo_Parroquia.jpg" alt="Escudo Parroquia" style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '280px', height: 'auto', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }} />
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="testimonial-section section-padding">
        <div className="testimonial-card">
          <p className="testimonial-text">
            {config.fraseInspiradora}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '1px', background: 'var(--secondary)' }}></div>
            <p style={{ fontWeight: '800', color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px' }}>
              — {config.autorFrase}
            </p>
            <div style={{ width: '40px', height: '1px', background: 'var(--secondary)' }}></div>
          </div>
        </div>
      </section>

      {/* Próximos Eventos Section */}
      <section id="eventos" className="events-section section-padding">
        <h2 className="section-title">Próximos Encuentros</h2>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {eventos.length > 0 ? (
            eventos.map(event => {
              const { day, month } = formatDate(event.fecha);
              return (
                <div key={event._id} className="event-mini-card">
                  <div className="event-date-box">
                    <div className="event-date-day">{day}</div>
                    <div className="event-date-month">{month}</div>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--primary)', marginBottom: '0.2rem' }}>{event.titulo}</h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>📍 {event.lugar || 'Comunidad'}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No hay eventos programados próximamente.</p>
          )}
        </div>
      </section>

      {/* Sección Ubicación / Mapa */}
      <section id="ubicacion" className="section-padding" style={{ textAlign: 'center', background: 'white' }}>
        <h2 className="section-title">Encuéntranos</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Te esperamos en nuestra Parroquia en Pomalca. ¡Ven a compartir con nosotros!
        </p>
        <div className="map-container zoom-hover">
          <iframe 
            src={`https://www.google.com/maps?q=${encodeURIComponent(config.mapQuery)}&t=&z=16&ie=UTF8&iwloc=&output=embed`} 
            width="100%" 
            height="450" 
            style={{ border: 0, borderRadius: '24px' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <a 
            href={`https://www.google.com/maps/search/${encodeURIComponent(config.mapQuery)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
          >
            <span>📍</span> Abrir en Google Maps
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="landing-footer section-padding">
        <div className="responsive-grid" style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'left', '--grid-min': '250px' }}>
          <div>
            <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>CATEQUESIS POMALCA</h3>
            <p style={{ opacity: 0.7, fontSize: '0.95rem', lineHeight: '1.6' }}>
              Somos una comunidad dedicada a la formación cristiana de niños y jóvenes en Pomalca.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Contáctanos</h4>
            <ul style={{ listStyle: 'none', opacity: 0.8, fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.2rem' }}>📧</span> {config.emailContacto}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.2rem' }}>📱</span> {config.telefonoContacto}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ fontSize: '1.2rem' }}>📍</span> Pomalca, Chiclayo, Perú
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.9rem' }}>Síguenos</h4>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem', textDecoration: 'none' }}>🔵</a>
              <a href="#" style={{ color: 'white', fontSize: '1.5rem', textDecoration: 'none' }}>📸</a>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', opacity: 0.5, fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} Catequesis de Pomalca. Todos los derechos reservados.
          <br />
          <Link to="/admin" className="admin-link">Acceso Interno (Consejo)</Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingView;
