import React from 'react';

const CantosEditModal = ({ selectedItem, setSelectedItem }) => {
  return (
    <>
      <div className="input-group">
        <label>Título del Canto</label>
        <input 
          type="text" 
          value={selectedItem.titulo || ''} 
          onChange={e => setSelectedItem({...selectedItem, titulo: e.target.value})} 
          required 
          style={{ fontSize: '1.2rem', padding: '1rem', fontWeight: 'bold' }} 
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div className="input-group">
          <label>Artista o Autor</label>
          <input 
            type="text" 
            value={selectedItem.autor || selectedItem.artista || ''} 
            onChange={e => setSelectedItem({...selectedItem, autor: e.target.value})} 
          />
        </div>
        <div className="input-group">
          <label>Categoría</label>
          <select 
            className="form-select" 
            value={selectedItem.categoria || 'otro'} 
            onChange={e => setSelectedItem({...selectedItem, categoria: e.target.value})}
          >
            <option value="entrada">Canto de Entrada</option>
            <option value="ofertorio">Ofertorio</option>
            <option value="comunion">Comunión</option>
            <option value="salida">Salida / Final</option>
            <option value="franciscano">Franciscano</option>
            <option value="mariano">Mariano</option>
            <option value="adoracion">Adoración</option>
            <option value="animacion">Animación / Dinámica</option>
            <option value="otro">Otro</option>
          </select>
        </div>
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Letra del Canto</label>
        <textarea 
          rows="10" 
          value={selectedItem.letra || selectedItem.contenido || ''} 
          onChange={e => setSelectedItem({...selectedItem, letra: e.target.value})} 
          required 
          style={{ fontFamily: 'var(--mono)', lineHeight: '1.6' }}
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Reemplazar Audio / Acordes (Opcional)</label>
        <input 
          type="file" 
          accept="audio/*,application/pdf" 
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

export default CantosEditModal;
