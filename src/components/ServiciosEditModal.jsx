import React from 'react';

const ServiciosEditModal = ({ selectedItem, setSelectedItem, MapPicker }) => {
  return (
    <>
      <div className="input-group">
        <label>Título de la Actividad</label>
        <input 
          type="text" 
          value={selectedItem.titulo || ''} 
          onChange={e => setSelectedItem({...selectedItem, titulo: e.target.value})} 
          required 
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div className="input-group">
          <label>Fecha</label>
          <input 
            type="date" 
            value={selectedItem.fecha ? new Date(selectedItem.fecha).toISOString().split('T')[0] : ''} 
            onChange={e => setSelectedItem({...selectedItem, fecha: e.target.value})} 
            required 
          />
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div className="input-group">
          <label>Cupo Máximo (0 = sin límite)</label>
          <input 
            type="number" 
            value={selectedItem.cupoMaximo || 0} 
            onChange={e => setSelectedItem({...selectedItem, cupoMaximo: e.target.value})} 
          />
        </div>
        <div className="input-group">
          <label>Reemplazar Imagen Portada</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={e => setSelectedItem({...selectedItem, nuevaImagenFile: e.target.files[0]})} 
            style={{ padding: '0.7rem', background: 'var(--surface)' }} 
          />
        </div>
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Descripción de la Actividad</label>
        <textarea 
          rows="4" 
          value={selectedItem.descripcion || ''} 
          onChange={e => setSelectedItem({...selectedItem, descripcion: e.target.value})} 
          required
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>📍 Editar Ubicación en Mapa</label>
        <MapPicker 
           lat={selectedItem.ubicacion?.lat} 
           lng={selectedItem.ubicacion?.lng} 
           onChange={(lat, lng) => setSelectedItem({...selectedItem, ubicacion: { lat, lng }})} 
        />
      </div>
    </>
  );
};

export default ServiciosEditModal;
