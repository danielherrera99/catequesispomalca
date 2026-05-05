import React from 'react';

const AnunciosEditModal = ({ selectedItem, setSelectedItem, MapPicker }) => {
  return (
    <>
      <div className="input-group">
        <label>Título del Anuncio</label>
        <input 
          type="text" 
          value={selectedItem.titulo || ''} 
          onChange={e => setSelectedItem({...selectedItem, titulo: e.target.value})} 
          required 
        />
      </div>
      <div className="input-group">
        <label>Contenido</label>
        <textarea 
          value={selectedItem.contenido || ''} 
          onChange={e => setSelectedItem({...selectedItem, contenido: e.target.value})} 
          required 
          style={{ minHeight: '120px' }} 
        />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="input-group">
          <label>Prioridad</label>
          <select 
            className="form-select" 
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }} 
            value={selectedItem.prioridad || 'normal'} 
            onChange={e => setSelectedItem({...selectedItem, prioridad: e.target.value})}
          >
            <option value="normal">Normal</option>
            <option value="alta">Alta (Rojo)</option>
          </select>
        </div>
        <div className="input-group">
          <label>Tipo</label>
          <select 
            className="form-select" 
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }} 
            value={selectedItem.tipo || 'urgente'} 
            onChange={e => setSelectedItem({...selectedItem, tipo: e.target.value})}
          >
            <option value="urgente">Urgente 🚨</option>
            <option value="evento">Evento 📅</option>
            <option value="formacion">Formación 📖</option>
            <option value="apostolado">Apostolado 🙏</option>
          </select>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div className="input-group">
          <label>Público Destino</label>
          <select 
            className="form-select" 
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }} 
            value={selectedItem.destinatarios || 'todos'} 
            onChange={e => setSelectedItem({...selectedItem, destinatarios: e.target.value})}
          >
            <option value="todos">Toda la Comunidad</option>
            <option value="consejo">Solo Consejo</option>
            <option value="formacion">Equipo Formación</option>
            <option value="promesados">Promesados</option>
          </select>
        </div>
        <div className="input-group">
          <label>Cambiar Imagen Portada (Opcional)</label>
          <input 
            type="file" 
            accept="image/*" 
            style={{ padding: '0.7rem', background: 'var(--surface)', borderRadius: '8px' }} 
            onChange={e => setSelectedItem({
              ...selectedItem, 
              nuevaImagenFile: e.target.files[0], 
              previewImagenEdit: URL.createObjectURL(e.target.files[0])
            })} 
          />
          {selectedItem.previewImagenEdit ? (
             <div style={{ marginTop: '0.5rem', width: '100%', height: '100px', backgroundImage: `url(${selectedItem.previewImagenEdit})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px' }}></div>
          ) : selectedItem.imagen ? (
             <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--primary)' }}>Imagen actual subida ✓</div>
          ) : null}
        </div>
      </div>
      
      <div className="input-group" style={{ marginTop: '1rem', position: 'relative' }}>
        <label>Ubicación Geográfica (Elige visualmente en el mapa)</label>
        <MapPicker 
           lat={selectedItem.ubicacion?.lat} 
           lng={selectedItem.ubicacion?.lng} 
           onChange={(lat, lng) => setSelectedItem({...selectedItem, ubicacion: { ...selectedItem.ubicacion, lat, lng }})} 
        />
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input 
            type="number" 
            placeholder="Latitud" 
            step="any" 
            style={{ flex: 1, padding: '0.5rem' }} 
            value={selectedItem.ubicacion?.lat || ''} 
            onChange={e => setSelectedItem({...selectedItem, ubicacion: { ...selectedItem.ubicacion, lat: e.target.value }})} 
          />
          <input 
            type="number" 
            placeholder="Longitud" 
            step="any" 
            style={{ flex: 1, padding: '0.5rem' }} 
            value={selectedItem.ubicacion?.lng || ''} 
            onChange={e => setSelectedItem({...selectedItem, ubicacion: { ...selectedItem.ubicacion, lng: e.target.value }})} 
          />
        </div>
      </div>

      <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
        <input 
          type="checkbox" 
          id="destacadoCheck" 
          checked={selectedItem.destacado || false} 
          onChange={e => setSelectedItem({...selectedItem, destacado: e.target.checked})} 
          style={{ width: 'auto', margin: 0 }} 
        />
        <label htmlFor="destacadoCheck" style={{ margin: 0, cursor: 'pointer', color: selectedItem.destacado ? 'var(--primary)' : 'var(--text-muted)' }}>
          Marcar como Destacado ⭐
        </label>
      </div>
    </>
  );
};

export default AnunciosEditModal;
