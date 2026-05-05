import React, { useState } from 'react';
import api from '../../config/api';

const ComunicacionView = ({ loading, setLoading, Miembros = [] }) => {
  const [formData, setFormData] = useState({
    filtro: 'todos',
    asunto: '',
    mensaje: '',
    correoManual: '',
    usuarioId: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.filtro === 'manual' && !formData.correoManual) {
      alert('Por favor escribe el correo de destino.');
      return;
    }
    if (formData.filtro === 'individual' && !formData.usuarioId) {
      alert('Por favor selecciona un Miembro.');
      return;
    }
    if (!formData.asunto || !formData.mensaje) {
      alert('Por favor completa el asunto y el mensaje.');
      return;
    }

    if (!window.confirm('¿Estás seguro de que deseas enviar este comunicado?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/Miembros/comunicacion/masivo', formData);
      if (response.data.success) {
        alert(response.data.message);
        setFormData({ filtro: 'todos', asunto: '', mensaje: '', correoManual: '', usuarioId: '' });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.response?.data?.message || err.message;
      alert('Error al enviar comunicado: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar solo Miembros que tengan correo para la lista individual
  const MiembrosConCorreo = Miembros.filter(h => h.email);

  return (
    <div className="animate-fade" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>📢 Centro de Comunicación</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Envía correos electrónicos oficiales a la Comunidad o a contactos externos.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Tipo de Envío:</label>
            <select 
              value={formData.filtro} 
              onChange={e => setFormData({...formData, filtro: e.target.value})}
              style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }}
            >
              <optgroup label="General">
                <option value="todos">Todos los Miembros Activos</option>
              </optgroup>
              <optgroup label="Personalizado">
                <option value="individual">🎯 Un solo Miembro específico</option>
                <option value="manual">✍️ Escribir correo manualmente (Externo)</option>
              </optgroup>
              <optgroup label="Por Rol">
                <option value="admin">Solo Administradores</option>
                <option value="consejo">Solo Miembros del Consejo</option>
                <option value="miembro">Solo Miembros Base</option>
              </optgroup>
              <optgroup label="Por Etapa de Formación">
                <option value="aspirante">Aspirantes</option>
                <option value="iniciado">Iniciados</option>
                <option value="en_formacion">En Formación</option>
                <option value="promesado">Promesados</option>
              </optgroup>
            </select>
          </div>

          {/* Campo condicional para un solo Miembro */}
          {formData.filtro === 'individual' && (
            <div className="input-group animate-fade" style={{ marginTop: '1.5rem' }}>
              <label>Seleccionar Miembro:</label>
              <select 
                value={formData.usuarioId} 
                onChange={e => setFormData({...formData, usuarioId: e.target.value})}
                style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }}
                required
              >
                <option value="">-- Elige un Miembro --</option>
                {MiembrosConCorreo.map(h => (
                  <option key={h._id} value={h._id}>{h.nombre} {h.apellido} ({h.email})</option>
                ))}
              </select>
            </div>
          )}

          {/* Campo condicional para correo manual */}
          {formData.filtro === 'manual' && (
            <div className="input-group animate-fade" style={{ marginTop: '1.5rem' }}>
              <label>Correo Electrónico de Destino:</label>
              <input 
                type="email" 
                value={formData.correoManual} 
                onChange={e => setFormData({...formData, correoManual: e.target.value})} 
                placeholder="ejemplo@correo.com"
                required 
              />
            </div>
          )}

          <div className="input-group" style={{ marginTop: '1.5rem' }}>
            <label>Asunto del Correo</label>
            <input 
              type="text" 
              value={formData.asunto} 
              onChange={e => setFormData({...formData, asunto: e.target.value})} 
              placeholder="Ej: Invitación a Reunión Extraordinaria"
              required 
            />
          </div>

          <div className="input-group" style={{ marginTop: '1.5rem' }}>
            <label>Mensaje</label>
            <textarea 
              value={formData.mensaje} 
              onChange={e => setFormData({...formData, mensaje: e.target.value})} 
              placeholder="Escribe aquí el contenido del mensaje..."
              style={{ 
                width: '100%', 
                minHeight: '200px', 
                padding: '1rem', 
                borderRadius: '8px', 
                border: '1px solid var(--border)',
                fontFamily: 'inherit',
                resize: 'vertical'
              }}
              required 
            />
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}
              disabled={loading}
            >
              {loading ? 'Enviando...' : '🚀 Enviar Correo'}
            </button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#F0FDFA', borderRadius: '12px', border: '1px solid #CCFBF1', color: '#115E59' }}>
        <p style={{ fontSize: '0.85rem', margin: 0 }}>
          <b>Sugerencia:</b> Puedes usar esta herramienta para enviar invitaciones personalizadas a personas que aún no descargan la app usando la opción "Escribir correo manualmente".
        </p>
      </div>
    </div>
  );
};

export default ComunicacionView;
