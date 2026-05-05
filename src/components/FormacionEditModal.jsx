import React from 'react';

const FormacionEditModal = ({ selectedItem, setSelectedItem }) => {
  return (
    <>
      <div className="input-group">
        <label>Título del Tema</label>
        <input 
          type="text" 
          value={selectedItem.titulo || ''} 
          onChange={e => setSelectedItem({...selectedItem, titulo: e.target.value})} 
          required 
          style={{ fontSize: '1.2rem', padding: '1rem', fontWeight: 'bold' }} 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Descripción Corta / Resumen</label>
        <input 
          type="text" 
          value={selectedItem.descripcion || ''} 
          onChange={e => setSelectedItem({...selectedItem, descripcion: e.target.value})} 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Contenido Extenso del Tema</label>
        <textarea 
          rows="6" 
          value={selectedItem.contenido || ''} 
          onChange={e => setSelectedItem({...selectedItem, contenido: e.target.value})} 
          required 
          style={{ fontFamily: 'inherit', lineHeight: '1.6' }}
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Etiquetas (separadas por coma)</label>
        <input 
          type="text" 
          value={Array.isArray(selectedItem.etiquetas) ? selectedItem.etiquetas.join(', ') : (selectedItem.etiquetas || '')} 
          onChange={e => setSelectedItem({...selectedItem, etiquetas: e.target.value})} 
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Reemplazar Documento Adjunto (Opcional)</label>
        <input 
          type="file" 
          accept=".pdf,.doc,.docx,.ppt,.pptx" 
          onChange={e => setSelectedItem({...selectedItem, nuevaImagenFile: e.target.files[0]})} 
          style={{ padding: '0.7rem', background: 'var(--surface)' }} 
        />
        {selectedItem.archivoUrl && (
          <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--primary)' }}>
            Archivo actual ya subido ✓ ({selectedItem.archivoNombre || 'ver adjunto'})
          </div>
        )}
      </div>
    </>
  );
};

export default FormacionEditModal;
