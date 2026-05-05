import React from 'react';

const EspirituNewModal = ({ newItem, setNewItem }) => {
  return (
    <>
      <div className="input-group">
        <label>Título del Contenido</label>
        <input 
          type="text" 
          value={newItem.titulo || ''} 
          onChange={e => setNewItem({...newItem, titulo: e.target.value})} 
          required 
          placeholder="Ej: Oración de la Paz" 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Sección</label>
        <select 
          className="form-select" 
          value={newItem.tipo || 'oracion'} 
          onChange={e => setNewItem({...newItem, tipo: e.target.value})}
        >
          <option value="oracion">🙏 Oración</option>
          <option value="carisma">🌿 Carisma Franciscano</option>
        </select>
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Contenido</label>
        <textarea 
          rows="8" 
          value={newItem.contenido || ''} 
          onChange={e => setNewItem({...newItem, contenido: e.target.value})} 
          required 
          placeholder="Escribe el texto aquí..." 
          style={{ fontFamily: 'inherit' }}
        ></textarea>
      </div>
    </>
  );
};

export default EspirituNewModal;
