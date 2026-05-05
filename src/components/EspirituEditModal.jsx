import React from 'react';

const EspirituEditModal = ({ selectedItem, setSelectedItem }) => {
  return (
    <>
      <div className="input-group">
        <label>Título del Contenido</label>
        <input 
          type="text" 
          value={selectedItem.titulo || ''} 
          onChange={e => setSelectedItem({...selectedItem, titulo: e.target.value})} 
          required 
          style={{ fontSize: '1.2rem', padding: '1rem', fontWeight: 'bold' }} 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Sección</label>
        <select 
          className="form-select" 
          value={selectedItem.tipo || 'oracion'} 
          onChange={e => setSelectedItem({...selectedItem, tipo: e.target.value})}
        >
          <option value="oracion">🙏 Oración</option>
          <option value="carisma">🌿 Carisma Franciscano</option>
        </select>
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Contenido</label>
        <textarea 
          rows="10" 
          value={selectedItem.contenido || ''} 
          onChange={e => setSelectedItem({...selectedItem, contenido: e.target.value})} 
          required 
          style={{ fontFamily: 'inherit', lineHeight: '1.6' }}
        />
      </div>
    </>
  );
};

export default EspirituEditModal;
