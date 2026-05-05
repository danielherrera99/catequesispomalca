import React from 'react';

const ActasEditModal = ({ selectedItem, setSelectedItem, getSafeDateForInput }) => {
  return (
    <>
      <div className="input-group">
        <label>Título del Acta</label>
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
          <label>Fecha de la Reunión</label>
          <input 
            type="date" 
            value={getSafeDateForInput(selectedItem.fecha)} 
            onChange={e => setSelectedItem({...selectedItem, fecha: e.target.value})} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Tipo de Reunión</label>
          <select 
            className="form-select" 
            value={selectedItem.tipoReunion || 'consejo'} 
            onChange={e => setSelectedItem({...selectedItem, tipoReunion: e.target.value})} 
            required
          >
            <option value="consejo">Consejo</option>
            <option value="Comunidad">Comunidad</option>
            <option value="formacion">Formación</option>
            <option value="extraordinaria">Extraordinaria</option>
          </select>
        </div>
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Contenido de la Reunión</label>
        <textarea 
          rows="6" 
          value={selectedItem.contenido || ''} 
          onChange={e => setSelectedItem({...selectedItem, contenido: e.target.value})} 
          required 
          style={{ fontFamily: 'inherit', lineHeight: '1.6' }}
        />
      </div>
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Acuerdos Tomados (Opcional) - <i>Escribe cada acuerdo en una nueva línea</i></label>
        <textarea 
          placeholder="Ej:&#10;Pintar la iglesia este domingo&#10;Comprar sillas para la Comunidad" 
          rows="3" 
          value={selectedItem.acuerdoTexto || ''} 
          onChange={e => setSelectedItem({...selectedItem, acuerdoTexto: e.target.value})} 
          style={{ fontFamily: 'inherit', lineHeight: '1.6', background: 'var(--background)' }}
        />
      </div>
    </>
  );
};

export default ActasEditModal;
