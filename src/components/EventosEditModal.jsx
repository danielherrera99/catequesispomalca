import React from 'react';

const EventosEditModal = ({ selectedItem, setSelectedItem, MapPicker, getSafeDateForInput }) => {
  return (
    <>
      <div className="input-group">
        <label>Título del Evento</label>
        <input 
          type="text" 
          value={selectedItem.titulo || ''} 
          onChange={e => setSelectedItem({...selectedItem, titulo: e.target.value})} 
          required 
          style={{ fontSize: '1.2rem', padding: '1rem', fontWeight: 'bold' }} 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Descripción del Evento</label>
        <textarea 
          rows="4" 
          value={selectedItem.descripcion || selectedItem.contenido || ''} 
          onChange={e => setSelectedItem({...selectedItem, descripcion: e.target.value})} 
          required 
          style={{ fontFamily: 'inherit' }}
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div className="input-group">
          <label>Fecha</label>
          <input 
            type="date" 
            value={getSafeDateForInput(selectedItem.fecha)} 
            onChange={e => setSelectedItem({...selectedItem, fecha: e.target.value})} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Hora</label>
          <input 
            type="time" 
            value={selectedItem.hora || ''} 
            onChange={e => setSelectedItem({...selectedItem, hora: e.target.value})} 
          />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div className="input-group">
          <label>Tipo de Evento</label>
          <select 
            className="form-select" 
            value={selectedItem.tipo || 'reunion'} 
            onChange={e => setSelectedItem({...selectedItem, tipo: e.target.value})}
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
            value={selectedItem.lugar || ''} 
            onChange={e => setSelectedItem({...selectedItem, lugar: e.target.value})} 
            required 
          />
        </div>
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Reemplazar Imagen Promocional (Opcional)</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={e => setSelectedItem({
            ...selectedItem, 
            nuevaImagenFile: e.target.files[0], 
            previewImagen: URL.createObjectURL(e.target.files[0])
          })} 
          style={{ padding: '0.7rem', background: 'var(--surface)' }} 
        />
        {(selectedItem.previewImagen || selectedItem.imagenUrl) && (
           <div style={{ 
             marginTop: '0.5rem', 
             width: '100%', 
             height: '100px', 
             backgroundImage: `url(${selectedItem.previewImagen || selectedItem.imagenUrl})`, 
             backgroundSize: 'cover', 
             backgroundPosition: 'center', 
             borderRadius: '8px' 
           }}></div>
        )}
      </div>
      <div className="input-group" style={{ marginTop: '1.5rem', position: 'relative' }}>
        <label>📍 Ubicación Geográfica (Mapa interactivo)</label>
        <MapPicker 
           lat={selectedItem.ubicacion?.lat || -6.745} 
           lng={selectedItem.ubicacion?.lng || -79.824} 
           onChange={(lat, lng) => setSelectedItem({...selectedItem, ubicacion: { ...selectedItem.ubicacion, lat, lng }})} 
        />
      </div>
    </>
  );
};

export default EventosEditModal;
