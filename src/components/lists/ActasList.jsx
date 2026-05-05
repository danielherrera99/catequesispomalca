import React from 'react';

const ActasList = ({ filteredData, getActaColor, formatSafeDate, setReadItem, openEditModal, handleDelete }) => {
  if (filteredData.length === 0) return <div className="glass-card animate-fade" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hay actas registradas. ¡Inicia una nueva reunión! 📝</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
      {filteredData.map((item) => (
        <div key={item?._id || Math.random()} className="glass-card animate-fade" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', borderTop: `4px solid ${getActaColor(item.tipoReunion)}` }}>
          <div style={{ padding: '1.5rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: getActaColor(item.tipoReunion), backgroundColor: `${getActaColor(item.tipoReunion)}15`, padding: '4px 10px', borderRadius: '12px' }}>
                {item.tipoReunion || 'General'}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {formatSafeDate(item.fecha)}
              </span>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>{item.titulo}</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', opacity: 0.9, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.contenido}</p>
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
             <button onClick={(e) => { e.stopPropagation(); setReadItem(item); }} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 'bold' }}>📄 Leer Acta</button>
             <button onClick={(e) => { e.stopPropagation(); openEditModal(item); }} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: 'none', color: 'var(--text-main)', fontWeight: 'bold' }}>✏️ Editar</button>
             <button onClick={(e) => { e.stopPropagation(); handleDelete(item._id, 'actas'); }} style={{ padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: '#F44336' }}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActasList;
