import React from 'react';

const MiembrosEditModal = ({ selectedItem, setSelectedItem }) => {
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="input-group">
          <label>Nombre</label>
          <input 
            type="text" 
            value={selectedItem.nombre || ''} 
            onChange={e => setSelectedItem({...selectedItem, nombre: e.target.value})} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Apellido</label>
          <input 
            type="text" 
            value={selectedItem.apellido || ''} 
            onChange={e => setSelectedItem({...selectedItem, apellido: e.target.value})} 
            required 
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="input-group">
          <label>Nombre de Usuario</label>
          <input 
            type="text" 
            value={selectedItem.username || ''} 
            onChange={e => setSelectedItem({...selectedItem, username: e.target.value})} 
            required 
            placeholder="ej: francisco7"
          />
        </div>
        <div className="input-group">
          <label>Correo Electrónico</label>
          <input 
            type="email" 
            value={selectedItem.email || ''} 
            onChange={e => setSelectedItem({...selectedItem, email: e.target.value})} 
            placeholder="ej: nombre@gmail.com"
          />
        </div>
      </div>

      <div className="input-group">
        <label>Nueva Contraseña (Opcional)</label>
        <input 
          type="password" 
          value={selectedItem.password || ''} 
          onChange={e => setSelectedItem({...selectedItem, password: e.target.value})} 
          placeholder="Mínimo 6 caracteres para cambiarla"
        />
      </div>

      <div className="input-group">
        <label>Teléfono</label>
        <input 
          type="text" 
          value={selectedItem.telefono || ''} 
          onChange={e => setSelectedItem({...selectedItem, telefono: e.target.value})} 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="input-group">
          <label>Contacto Emergencia (Nombre)</label>
          <input 
            type="text" 
            value={selectedItem.nombreContactoEmergencia || ''} 
            onChange={e => setSelectedItem({...selectedItem, nombreContactoEmergencia: e.target.value})} 
            placeholder="Ej: Papá / Mamá" 
          />
        </div>
        <div className="input-group">
          <label>Número de Emergencia</label>
          <input 
            type="text" 
            value={selectedItem.contactoEmergencia || ''} 
            onChange={e => setSelectedItem({...selectedItem, contactoEmergencia: e.target.value})} 
            placeholder="+123456789" 
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="input-group">
          <label>Rol en el Sistema</label>
          <select 
            className="form-select" 
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }} 
            value={selectedItem.rol || 'miembro'} 
            onChange={e => setSelectedItem({...selectedItem, rol: e.target.value})}
          >
            <option value="miembro">Miembro</option>
            <option value="consejo">Consejo</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="input-group">
          <label>Cargo Catequesis Pomalca</label>
          <select 
            className="form-select" 
            style={{ padding: '0.8rem', borderRadius: '8px', border: '1px solid var(--border)', width: '100%' }} 
            value={selectedItem.cargo || 'ninguno'} 
            onChange={e => setSelectedItem({...selectedItem, cargo: e.target.value})}
          >
            <option value="ninguno">Ninguno</option>
            <option value="coordinador">Coordinador(a) / Ministro(a)</option>
            <option value="vice-coordinador">Vice-Coordinador(a)</option>
            <option value="secretario">Secretario(a)</option>
            <option value="tesorero">Tesorero(a)</option>
            <option value="formador">Formador(a)</option>
            <option value="animador">Animador(a)</option>
          </select>
        </div>
      </div>

      {/* Etapa de Formación eliminada */}

      <div className="input-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
        <input 
          type="checkbox" 
          id="activoCheck" 
          checked={selectedItem.activo || false} 
          onChange={e => setSelectedItem({...selectedItem, activo: e.target.checked})} 
          style={{ width: 'auto', margin: 0 }} 
        />
        <label htmlFor="activoCheck" style={{ margin: 0, cursor: 'pointer', color: selectedItem.activo ? '#4CAF50' : '#F44336' }}>
          {selectedItem.activo ? 'Cuenta Aprobada y Activa' : 'Cuenta Suspendida / Pendiente'}
        </label>
      </div>
    </>
  );
};

export default MiembrosEditModal;
