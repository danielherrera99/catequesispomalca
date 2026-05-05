import React from 'react';

const PeticionesNewModal = ({ newItem, setNewItem }) => {
  return (
    <>
      <div className="input-group">
        <label>Contenido de la Petición</label>
        <textarea 
          value={newItem.contenido || ''} 
          onChange={e => setNewItem({...newItem, contenido: e.target.value})} 
          required 
          placeholder="Ej: Por la salud de..."
          style={{ minHeight: '100px' }}
        />
      </div>
      <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '1rem' }}>
        <input 
          type="checkbox" 
          id="anonCheckNew" 
          checked={newItem.anonimo || false} 
          onChange={e => setNewItem({...newItem, anonimo: e.target.checked})} 
          style={{ width: 'auto', margin: 0 }} 
        />
        <label htmlFor="anonCheckNew" style={{ margin: 0, cursor: 'pointer' }}>Mantenerme Anónimo 🤫</label>
      </div>
    </>
  );
};

export default PeticionesNewModal;
