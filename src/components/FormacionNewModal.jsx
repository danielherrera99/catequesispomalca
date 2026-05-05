import React from 'react';

const FormacionNewModal = ({ newItem, setNewItem }) => {
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

      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Descripción Corta / Resumen</label>
        <input 
          type="text" 
          value={newItem.descripcion || ''} 
          onChange={e => setNewItem({...newItem, descripcion: e.target.value})} 
          placeholder="Ej: Breve resumen del tema..." 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Etiquetas (separadas por coma)</label>
        <input 
          type="text" 
          value={newItem.etiquetas || ''} 
          onChange={e => setNewItem({...newItem, etiquetas: e.target.value})} 
          placeholder="Ej: San Francisco, Regla, Historia..." 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Adjuntar Documento o Presentación (Opcional)</label>
        <input 
          type="file" 
          accept=".pdf,.doc,.docx,.ppt,.pptx" 
          onChange={e => setNewItem({...newItem, archivoFile: e.target.files[0]})} 
          style={{ padding: '0.7rem', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }} 
        />
      </div>
    </>
  );
};

export default FormacionNewModal;
