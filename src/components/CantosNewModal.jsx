import React from 'react';

const CantosNewModal = ({ newItem, setNewItem }) => {
  return (
    <>
      <div className="input-group">
        <label>Título del Canto</label>
        <input 
          type="text" 
          value={newItem.titulo || ''} 
          onChange={e => setNewItem({...newItem, titulo: e.target.value})} 
          required 
          placeholder="Escribe el título aquí"
        />
      </div>

      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Letra del Canto</label>
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
          <label>Artista o Autor (Opcional)</label>
          <input 
            type="text" 
            value={newItem.artista || ''} 
            onChange={e => setNewItem({...newItem, artista: e.target.value})} 
            placeholder="Ej: Kairoi..."
          />
        </div>
        <div className="input-group">
          <label>Categoría Litúrgica</label>
          <select 
            className="form-select" 
            value={newItem.categoria || 'otro'} 
            onChange={e => setNewItem({...newItem, categoria: e.target.value})}
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
        <div className="input-group" style={{ gridColumn: 'span 2' }}>
          <label>Subir MP3 o Acordes PDF (Opcional)</label>
          <input 
            type="file" 
            accept="audio/*,application/pdf" 
            onChange={e => setNewItem({...newItem, archivoFile: e.target.files[0]})} 
            style={{ padding: '0.7rem', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }} 
          />
        </div>
      </div>
    </>
  );
};

export default CantosNewModal;
