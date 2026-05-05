import React, { useState, useEffect } from 'react';
import api from '../../config/api';

const WebConfigView = ({ loading, setLoading }) => {
  const [config, setConfig] = useState({
    heroTitle: '',
    heroSubtitle: '',
    mision: '',
    vision: '',
    valores: '',
    fraseInspiradora: '',
    autorFrase: '',
    emailContacto: '',
    telefonoContacto: '',
    mapQuery: '',
    familiaTitulo: '',
    familiaDescripcion: '',
    ParroquiaHeroTitle: '',
    ParroquiaHeroSubtitle: '',
    ParroquiaMapQuery: '',
    facebookUrl: '',
    instagramUrl: ''
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await api.get('/web-config');
      if (res.data.success) {
        setConfig(res.data.data);
      }
    } catch (err) {
      console.error('Error al cargar config web:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put('/web-config', config);
      if (res.data.success) {
        alert('¡Configuración guardada! Los cambios ya son visibles en la web pública.');
      }
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>🌐 Control de Contenido Web</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Desde aquí puedes cambiar los textos que el público ve en la página de inicio.
        </p>

        <form onSubmit={handleSubmit}>
          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--secondary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Cabecera Principal (Hero)</h3>
            <div className="input-group">
              <label>Título de Bienvenida:</label>
              <input 
                type="text" 
                value={config.heroTitle} 
                onChange={e => setConfig({...config, heroTitle: e.target.value})} 
                placeholder="Ej: Juventud Franciscana en el Perú"
              />
            </div>
            <div className="input-group">
              <label>Subtítulo / Lema:</label>
              <textarea 
                value={config.heroSubtitle} 
                onChange={e => setConfig({...config, heroSubtitle: e.target.value})} 
                style={{ minHeight: '80px' }}
              />
            </div>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--secondary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Misión, Visión y Valores</h3>
            <div className="input-group">
              <label>Misión (Espiritualidad):</label>
              <textarea 
                value={config.mision} 
                onChange={e => setConfig({...config, mision: e.target.value})} 
                style={{ minHeight: '100px' }}
              />
            </div>
            <div className="input-group">
              <label>Visión (Formación):</label>
              <textarea 
                value={config.vision} 
                onChange={e => setConfig({...config, vision: e.target.value})} 
                style={{ minHeight: '100px' }}
              />
            </div>
            <div className="input-group">
              <label>Valores (Comunidad):</label>
              <textarea 
                value={config.valores} 
                onChange={e => setConfig({...config, valores: e.target.value})} 
                style={{ minHeight: '100px' }}
              />
            </div>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--secondary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Familia Franciscana (Sección en Inicio)</h3>
            <div className="input-group">
              <label>Título (Sección Catequesis Pomalca):</label>
              <input 
                type="text" 
                value={config.familiaTitulo} 
                onChange={e => setConfig({...config, familiaTitulo: e.target.value})} 
                placeholder="Ej: Comunidad Parroquia Santa Isabel de Hungría"
              />
            </div>
            <div className="input-group">
              <label>Descripción corta:</label>
              <textarea 
                value={config.familiaDescripcion} 
                onChange={e => setConfig({...config, familiaDescripcion: e.target.value})} 
                style={{ minHeight: '80px' }}
                placeholder="Describe la relación con la Parroquia..."
              />
            </div>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--secondary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Cita Inspiradora</h3>
            <div className="input-group">
              <label>Frase destacada:</label>
              <textarea 
                value={config.fraseInspiradora} 
                onChange={e => setConfig({...config, fraseInspiradora: e.target.value})} 
                style={{ minHeight: '60px', fontStyle: 'italic' }}
              />
            </div>
            <div className="input-group">
              <label>Autor de la frase:</label>
              <input 
                type="text" 
                value={config.autorFrase} 
                onChange={e => setConfig({...config, autorFrase: e.target.value})} 
              />
            </div>
          </section>

          <section style={{ marginBottom: '3rem' }}>
            <h3 style={{ color: 'var(--secondary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Información de Contacto</h3>
            <div className="row" style={{ gap: '1rem' }}>
              <div className="col">
                <div className="input-group">
                  <label>Email:</label>
                  <input 
                    type="email" 
                    value={config.emailContacto} 
                    onChange={e => setConfig({...config, emailContacto: e.target.value})} 
                  />
                </div>
              </div>
              <div className="col">
                <div className="input-group">
                  <label>WhatsApp:</label>
                  <input 
                    type="text" 
                    value={config.telefonoContacto} 
                    onChange={e => setConfig({...config, telefonoContacto: e.target.value})} 
                  />
                </div>
              </div>
            </div>
            <div className="input-group" style={{ marginTop: '1rem' }}>
              <label>Ubicación exacta en Mapa (Pin):</label>
              <input 
                type="text" 
                value={config.mapQuery} 
                onChange={e => setConfig({...config, mapQuery: e.target.value})} 
                placeholder="Ej: Parroquia San Juan Maria Vianney, Pomalca"
              />
              <small style={{ color: 'var(--text-muted)' }}>Tip: Escribe el nombre del lugar o coordenadas para mover el pin.</small>
            </div>
          </section>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ padding: '1rem 3rem' }}
              disabled={loading}
            >
              {loading ? 'Guardando...' : '💾 Guardar Cambios Públicos'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebConfigView;
