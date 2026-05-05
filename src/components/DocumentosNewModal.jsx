import React from 'react';

const DocumentosNewModal = ({ newItem, setNewItem }) => {
  return (
    <>
      <div className="input-group">
        <label>Título del Documento</label>
        <input 
          type="text" 
          value={newItem.titulo || ''} 
          onChange={e => setNewItem({...newItem, titulo: e.target.value})} 
          required 
          placeholder="Ej: Regla de la Catequesis Pomalca" 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Tipo de Documento</label>
        <select 
          className="form-select" 
          value={newItem.tipo || 'otro'} 
          onChange={e => setNewItem({...newItem, tipo: e.target.value})}
        >
          <option value="regla">📜 Regla de Vida</option>
          <option value="ccgg">⚖️ Constituciones Generales</option>
          <option value="estatuto">🏛️ Estatuto Nacional</option>
          <option value="formacion">📚 Material Formativo</option>
          <option value="otro">📄 Otro Documento</option>
        </select>
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Descripción Breve</label>
        <input 
          type="text" 
          value={newItem.descripcion || ''} 
          onChange={e => setNewItem({...newItem, descripcion: e.target.value})} 
          placeholder="Resumen del documento..." 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Archivo Adjunto (PDF, DOCX, etc.)</label>
        <input 
          type="file" 
          onChange={e => setNewItem({...newItem, archivoFile: e.target.files[0]})} 
          style={{ padding: '0.7rem', background: 'var(--surface)' }} 
        />
      </div>
    </>
  );
};

export default DocumentosNewModal;
