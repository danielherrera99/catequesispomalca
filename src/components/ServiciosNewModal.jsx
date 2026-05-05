import React from 'react';

const ServiciosNewModal = ({ newItem, setNewItem, MapPicker }) => {
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div className="input-group">
          <label>Fecha de la Actividad</label>
          <input 
            type="date" 
            value={newItem.fecha || ''} 
            onChange={e => setNewItem({...newItem, fecha: e.target.value})} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Lugar</label>
          <input 
            type="text" 
            value={newItem.lugar || ''} 
            onChange={e => setNewItem({...newItem, lugar: e.target.value})} 
            required 
            placeholder="Ej: Comedor Parroquial" 
          />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div className="input-group">
          <label>Cupo Máximo (0 = sin límite)</label>
          <input 
            type="number" 
            value={newItem.cupoMaximo || 0} 
            onChange={e => setNewItem({...newItem, cupoMaximo: e.target.value})} 
          />
        </div>
        <div className="input-group">
          <label>Imagen Portada (Opcional)</label>
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
            <div style={{ marginTop: '0.5rem', width: '100%', height: '80px', backgroundImage: `url(${newItem.previewImagen})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px' }}></div>
          )}
        </div>
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

export default ServiciosNewModal;
