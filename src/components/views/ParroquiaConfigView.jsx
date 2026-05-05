import React, { useState, useEffect } from 'react';
import api from '../../config/api';

const ParroquiaConfigView = ({ loading, setLoading }) => {
  const [config, setConfig] = useState({
    heroTitle: '',
    heroSubtitle: '',
    mapQuery: '',
    quienesSomos: '',
    footerDireccion: '',
    footerEmail: '',
    footerTelefono: ''
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    setLoading(true);
    try {
      const res = await api.get('/Parroquia-config');
      if (res.data.success) {
        setConfig(res.data.data);
      }
    } catch (err) {
      console.error('Error al cargar config Parroquia:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.put('/Parroquia-config', config);
      if (res.data.success) {
        alert('¡Configuración Parroquia guardada! Los cambios ya son visibles en la página de la Parroquia.');
      }
    } catch (err) {
      alert('Error al guardar: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-card" style={{ padding: '2.5rem', border: '1px solid #FFE0B2' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span style={{ fontSize: '2.5rem' }}>☦️</span>
          <div>
            <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', margin: 0 }}>Gestión de Página Parroquia</h2>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Control exclusivo de la landing page de la Familia Franciscana.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
          <section style={{ marginBottom: '2rem', padding: '1.5rem', background: '#FFF9F2', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', borderBottom: '1px solid #FFE0B2', paddingBottom: '0.5rem' }}>Cabecera (Hero)</h3>
            
            <div className="input-group">
              <label>Título de Bienvenida:</label>
              <input 
                type="text" 
                value={config.heroTitle} 
                onChange={e => setConfig({...config, heroTitle: e.target.value})} 
                placeholder="Ej: Comunidad Parroquia Santa Isabel de Hungría"
                required
              />
            </div>

            <div className="input-group" style={{ marginTop: '1.5rem' }}>
              <label>Subtítulo / Lema Espiritual:</label>
              <textarea 
                value={config.heroSubtitle} 
                onChange={e => setConfig({...config, heroSubtitle: e.target.value})} 
                style={{ minHeight: '100px' }}
                placeholder="Escribe el lema que aparecerá bajo el título..."
                required
              />
            </div>
          </section>
          <section style={{ marginBottom: '2rem', padding: '1.5rem', background: '#FFF9F2', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', borderBottom: '1px solid #FFE0B2', paddingBottom: '0.5rem' }}>Identidad (¿Quiénes somos?)</h3>
            <div className="input-group">
              <label>Descripción de Identidad:</label>
              <textarea 
                value={config.quienesSomos} 
                onChange={e => setConfig({...config, quienesSomos: e.target.value})} 
                style={{ minHeight: '120px' }}
                placeholder="Describe la identidad de la Comunidad..."
                required
              />
            </div>
          </section>

          <section style={{ marginBottom: '2.5rem', padding: '1.5rem', background: '#F5F5F5', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>Información de Pie de Página (Footer)</h3>
            
            <div className="input-group">
              <label>Dirección física:</label>
              <input 
                type="text" 
                value={config.footerDireccion} 
                onChange={e => setConfig({...config, footerDireccion: e.target.value})} 
                placeholder="Ej: Convento San Antonio de Padua, Chiclayo"
              />
            </div>

            <div className="row" style={{ gap: '1rem', marginTop: '1.5rem' }}>
               <div className="col">
                  <div className="input-group">
                    <label>Email de contacto:</label>
                    <input 
                      type="email" 
                      value={config.footerEmail} 
                      onChange={e => setConfig({...config, footerEmail: e.target.value})} 
                    />
                  </div>
               </div>
               <div className="col">
                  <div className="input-group">
                    <label>Teléfono / WhatsApp:</label>
                    <input 
                      type="text" 
                      value={config.footerTelefono} 
                      onChange={e => setConfig({...config, footerTelefono: e.target.value})} 
                    />
                  </div>
               </div>
            </div>

            <div className="input-group" style={{ marginTop: '1.5rem' }}>
              <label>Ubicación en Mapa (Query):</label>
              <input 
                type="text" 
                value={config.mapQuery} 
                onChange={e => setConfig({...config, mapQuery: e.target.value})} 
                placeholder="Ej: Convento San Antonio de Padua, Chiclayo"
              />
            </div>
          </section>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
             <button 
              type="button" 
              className="btn btn-ghost" 
              onClick={() => window.open('/familia-Parroquia', '_blank')}
            >
              👁️ Ver Página
            </button>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ padding: '1rem 3rem' }}
              disabled={loading}
            >
              {loading ? 'Guardando...' : '💾 Guardar Configuración Parroquia'}
            </button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px', border: '1px dashed var(--border)' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <b>Nota de Seguridad:</b> Este módulo es independiente. Los cambios realizados aquí no afectan a la página principal de la Catequesis Pomalca, permitiendo que la Comunidad Parroquia mantenga su propia identidad digital.
        </p>
      </div>
    </div>
  );
};

export default ParroquiaConfigView;
