import React from 'react';

const ActasNewModal = ({ newItem, setNewItem }) => {
  return (
    <>
      <input 
        type="text" 
        placeholder="Título del Acta (Ej: Reunión Ordinaria Marzo)" 
        value={newItem.titulo || ''} 
        onChange={e => setNewItem({...newItem, titulo: e.target.value})} 
        required 
        style={{ fontSize: '1.2rem', padding: '1rem', fontWeight: 'bold' }} 
      />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
        <div className="input-group">
          <label>Fecha de la Reunión</label>
          <input 
            type="date" 
            value={newItem.fecha || ''} 
            onChange={e => setNewItem({...newItem, fecha: e.target.value})} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Tipo de Reunión</label>
          <select 
            className="form-select" 
            value={newItem.tipoReunion || 'directiva'} 
            onChange={e => setNewItem({...newItem, tipoReunion: e.target.value})} 
            required
          >
            <option value="directiva">Directiva</option>
            <option value="fraternidad">Fraternidad</option>
            <option value="formacion">Formación</option>
            <option value="extraordinaria">Extraordinaria</option>
          </select>
        </div>
      </div>
      
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Contenido del Acta (Desarrollo y Puntos Tratados)</label>
        <textarea 
          placeholder="Escribe aquí todo lo desarrollado en la reunión..." 
          rows="6" 
          value={newItem.contenido || ''} 
          onChange={e => setNewItem({...newItem, contenido: e.target.value})} 
          required 
          style={{ fontFamily: 'inherit', lineHeight: '1.6' }}
        ></textarea>
      </div>
      
      <div className="input-group" style={{ marginTop: '1rem' }}>
        <label>Acuerdos Tomados (Opcional) - <i>Escribe cada acuerdo en una nueva línea</i></label>
        <textarea 
          placeholder="Ej:&#10;Pintar la iglesia este domingo&#10;Comprar sillas para la Comunidad" 
          rows="3" 
          value={newItem.acuerdoTexto || ''} 
          onChange={e => setNewItem({...newItem, acuerdoTexto: e.target.value})} 
          style={{ fontFamily: 'inherit', lineHeight: '1.6', background: 'var(--background)' }}
        ></textarea>
      </div>
    </>
  );
};

export default ActasNewModal;
