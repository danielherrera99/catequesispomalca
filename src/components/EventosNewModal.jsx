import React from 'react';

const EventosNewModal = ({ newItem, setNewItem, MapPicker }) => {
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
          <label>Fecha del Evento</label>
          <input 
            type="date" 
            value={newItem.fecha || ''} 
            onChange={e => setNewItem({...newItem, fecha: e.target.value})} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Hora</label>
          <input 
            type="time" 
            value={newItem.hora || '18:00'} 
            onChange={e => setNewItem({...newItem, hora: e.target.value})} 
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div className="input-group">
          <label>Tipo de Evento</label>
          <select 
            className="form-select" 
            value={newItem.tipo || 'reunion'} 
            onChange={e => setNewItem({...newItem, tipo: e.target.value})}
          >
            <option value="reunion">Reunión 🤝</option>
            <option value="misa">Misa ⛪</option>
            <option value="formacion">Formación 📖</option>
            <option value="retiro">Retiro 🔥</option>
            <option value="Comunidad">Comunidad 🎉</option>
            <option value="otro">Otro 📅</option>
          </select>
        </div>
        <div className="input-group">
          <label>Lugar</label>
          <input 
            type="text" 
            value={newItem.lugar || ''} 
            onChange={e => setNewItem({...newItem, lugar: e.target.value})} 
            placeholder="Ej: Parroquia San Francisco"
            required 
          />
        </div>
      </div>

      <div className="input-group" style={{ marginTop: '1rem' }}>
          <label>Imagen Promocional (Opcional)</label>
          <input 
            type="file" 
            accept="image/*" 
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
            style={{ padding: '0.7rem', background: 'var(--surface)' }} 
          />
          {newItem.previewImagen && (
            <div style={{ marginTop: '0.5rem', width: '100%', height: '100px', backgroundImage: `url(${newItem.previewImagen})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px' }}></div>
          )}
      </div>

      <div className="input-group">
        <label>Descripción del Evento</label>
        <textarea 
          rows="4" 
          value={newItem.descripcion || ''} 
          onChange={e => setNewItem({...newItem, descripcion: e.target.value, contenido: e.target.value})} 
          required 
          placeholder="Escribe los detalles del evento aquí..."
        />
      </div>

      <div className="input-group" style={{ marginTop: '1rem' }}>
         <label>📍 Ubicación en Mapa</label>
         <MapPicker 
            lat={newItem.lat} 
            lng={newItem.lng} 
            onChange={(lat, lng) => setNewItem({...newItem, lat, lng})} 
         />
      </div>
    </>
  );
};

export default EventosNewModal;
