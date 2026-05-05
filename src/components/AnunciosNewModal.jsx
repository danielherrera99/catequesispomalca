import React from 'react';

const AnunciosNewModal = ({ newItem, setNewItem, MapPicker }) => {
  return (
    <>
      <div className="input-group">
        <label>Título Principal</label>
        <input 
          type="text" 
          value={newItem.titulo || ''} 
          onChange={e => setNewItem({...newItem, titulo: e.target.value})} 
          required 
          placeholder="Escribe el título aquí"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div className="input-group">
          <label>Prioridad</label>
          <select 
            className="form-select" 
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }} 
            value={newItem.prioridad || 'normal'} 
            onChange={e => setNewItem({...newItem, prioridad: e.target.value})}
          >
            <option value="normal">Normal</option>
            <option value="alta">Alta (Rojo)</option>
          </select>
        </div>
        <div className="input-group">
          <label>Tipo</label>
          <select 
            className="form-select" 
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }} 
            value={newItem.tipo || 'urgente'} 
            onChange={e => setNewItem({...newItem, tipo: e.target.value})}
          >
            <option value="urgente">Urgente 🚨</option>
            <option value="evento">Evento 📅</option>
            <option value="formacion">Formación 📖</option>
            <option value="apostolado">Apostolado 🙏</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div className="input-group">
          <label>Público Destino</label>
          <select 
            className="form-select" 
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }} 
            value={newItem.destinatarios || 'todos'} 
            onChange={e => setNewItem({...newItem, destinatarios: e.target.value})}
          >
            <option value="todos">Toda la Comunidad</option>
            <option value="consejo">Solo Consejo</option>
            <option value="formacion">Equipo Formación</option>
            <option value="promesados">Promesados</option>
          </select>
        </div>
        <div className="input-group">
          <label>Imagen Portada (Opcional)</label>
          <input 
            type="file" 
            accept="image/*" 
            style={{ padding: '0.7rem', background: 'var(--surface)', borderRadius: '8px' }} 
            onChange={e => {
              const file = e.target.files[0];
              if (file) {
                setNewItem({
                  ...newItem, 
                  imagenFile: file, 
                  previewImagen: URL.createObjectURL(file)
                });
              }
            }} 
          />
          {newItem.previewImagen && (
            <div style={{ marginTop: '0.5rem', width: '100%', height: '100px', backgroundImage: `url(${newItem.previewImagen})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px' }}></div>
          )}
        </div>
      </div>

      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Contenido / Descripción</label>
        <textarea 
          value={newItem.contenido || ''} 
          onChange={e => setNewItem({...newItem, contenido: e.target.value})} 
          required 
          placeholder="Escribe los detalles aquí..."
          style={{ minHeight: '100px' }}
        />
      </div>

      <div className="input-group" style={{ marginTop: '1.5rem', position: 'relative' }}>
        <label>📍 Seleccionar Ubicación Visual</label>
        <MapPicker 
            lat={newItem.lat} 
            lng={newItem.lng} 
            onChange={(lat, lng) => setNewItem({...newItem, lat, lng})} 
        />
        <div style={{ display: 'none' }}>
          <input type="number" step="any" value={newItem.lat || ''} onChange={e => setNewItem({...newItem, lat: e.target.value})} />
          <input type="number" step="any" value={newItem.lng || ''} onChange={e => setNewItem({...newItem, lng: e.target.value})} />
        </div>
      </div>
    </>
  );
};

export default AnunciosNewModal;
