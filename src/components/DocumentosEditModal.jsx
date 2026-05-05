import React from 'react';

const DocumentosEditModal = ({ selectedItem, setSelectedItem }) => {
  return (
    <>
      <div className="input-group">
        <label>Título del Documento</label>
        <input 
          type="text" 
          value={selectedItem.titulo || ''} 
          onChange={e => setSelectedItem({...selectedItem, titulo: e.target.value})} 
          required 
          style={{ fontSize: '1.2rem', padding: '1rem', fontWeight: 'bold' }} 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Tipo de Biblioteca</label>
        <select 
          className="form-select" 
          value={selectedItem.tipo || 'otro'} 
          onChange={e => setSelectedItem({...selectedItem, tipo: e.target.value})}
        >
          <option value="regla">📜 Regla de Vida</option>
          <option value="ccgg">⚖️ Constituciones Generales</option>
          <option value="estatuto">🏛️ Estatuto Nacional</option>
          <option value="formacion">📚 Material Formativo</option>
          <option value="otro">📄 Otro Documento</option>
        </select>
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Descripción / Resumen</label>
        <input 
          type="text" 
          value={selectedItem.descripcion || ''} 
          onChange={e => setSelectedItem({...selectedItem, descripcion: e.target.value})} 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Reemplazar Archivo (Opcional)</label>
        <input 
          type="file" 
          onChange={e => setSelectedItem({...selectedItem, nuevaImagenFile: e.target.files[0]})} 
          style={{ padding: '0.7rem', background: 'var(--surface)' }} 
        />
      </div>
    </>
  );
};

export default DocumentosEditModal;
