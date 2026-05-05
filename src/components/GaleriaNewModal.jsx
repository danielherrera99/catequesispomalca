import React from 'react';

const GaleriaNewModal = ({ newItem, setNewItem }) => {
  return (
    <>
      <div className="input-group">
        <label>Título de la Foto/Video</label>
        <input 
          type="text" 
          value={newItem.titulo || ''} 
          onChange={e => setNewItem({...newItem, titulo: e.target.value})} 
          required 
          placeholder="Ej: Procesión JUEVES SANTO" 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div className="input-group">
          <label>Fecha del Recuerdo</label>
          <input 
            type="date" 
            value={newItem.fecha || ''} 
            onChange={e => setNewItem({...newItem, fecha: e.target.value})} 
          />
        </div>
        <div className="input-group">
          <label>Categoría</label>
          <select 
            value={newItem.categoria || 'general'} 
            onChange={e => setNewItem({...newItem, categoria: e.target.value})}
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }}
          >
            <option value="general">General</option>
            <option value="retiro">Retiros / Jornadas</option>
            <option value="mision">Misiones</option>
            <option value="formacion">Formación</option>
            <option value="social">Social / Convivencia</option>
            <option value="liturgia">Liturgia / Oración</option>
          </select>
        </div>
      </div>

      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Descripción (Opcional)</label>
        <input 
          type="text" 
          value={newItem.descripcion || ''} 
          onChange={e => setNewItem({...newItem, descripcion: e.target.value})} 
          placeholder="Breve historia de este momento..." 
        />
      </div>

      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Archivo (Imagen o Video)</label>
        <input 
          type="file" 
          accept="image/*,video/*" 
          onChange={e => setNewItem({...newItem, archivoFile: e.target.files[0]})} 
          required 
          style={{ padding: '0.7rem', background: 'var(--surface)', cursor: 'pointer' }} 
        />
        <p style={{ margin: '5px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Límite sugerido: 50MB para videos.</p>
      </div>
    </>
  );
};

export default GaleriaNewModal;
