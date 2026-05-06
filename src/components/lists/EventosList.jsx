import React from 'react';

const getIconoEvento = (tipo) => {
  switch (tipo) {
      case 'reunion': return '🤝';
      case 'misa': return '⛪';
      case 'formacion': return '📖';
      case 'retiro': return '🔥';
      case 'Comunidad': return '🎉';
      default: return '📅';
  }
};

const getColorEvento = (tipo) => {
  switch (tipo) {
      case 'reunion': return 'var(--primary)';
      case 'misa': return '#D32F2F'; // Rojo
      case 'formacion': return '#7B1FA2'; // Morado
      case 'retiro': return '#F57C00'; // Naranja
      case 'Comunidad': return '#388E3C'; // Verde
      default: return 'var(--secondary)';
  }
};

const EventosList = ({ filteredData, setReadItem, openEditModal, handleDelete, formatSafeDate }) => {
  if (filteredData.length === 0) return <div className="glass-card animate-fade" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hay eventos próximos registrados en tu calendario. 📅</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
      {filteredData.map((item) => (
        <div key={item._id} className="glass-card animate-fade zoom-hover" onClick={() => setReadItem(item)} style={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer', overflow: 'hidden', borderLeft: `5px solid ${getColorEvento(item.tipo)}` }}>
          {item.imagenUrl && (
             <div style={{ width: '100%', height: '180px', backgroundImage: `url(${item.imagenUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', borderBottom: '1px solid var(--border)' }}></div>
          )}
          <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.85rem', color: getColorEvento(item.tipo), fontWeight: 'bold', textTransform: 'uppercase', background: `${getColorEvento(item.tipo)}20`, padding: '4px 10px', borderRadius: '12px' }}>
                {getIconoEvento(item.tipo)} {item.tipo || 'Otro'}
              </span>
              <span style={{ fontSize: '0.9rem', color: '#EF4444', fontWeight: 'bold' }}>🕒 {item.hora || 'Todo el día'}</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.4rem', lineHeight: '1.2' }}>{item.titulo}</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.5rem', fontWeight: 'bold' }}>📍 {item.lugar || 'Sede Catequesis Pomalca'}</p>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1, fontStyle: 'italic' }}>{item.descripcion}</p>
            <div style={{ fontSize: '1.1rem', marginTop: '1rem', padding: '0.8rem', background: 'var(--surface)', borderRadius: '8px', color: 'var(--primary)', fontWeight: 'bold', textAlign: 'center', border: '1px solid var(--border)' }}>
               📅 {formatSafeDate ? formatSafeDate(item.fecha, 'PPPP') : 'Sin fecha'}
            </div>
          </div>
          
          <div style={{ display: 'flex', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
             <button onClick={(e) => { e.stopPropagation(); openEditModal(item); }} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: 'none', color: 'var(--text-main)', fontWeight: 'bold' }}>✏️ Editar Evento</button>
             <button onClick={(e) => { e.stopPropagation(); handleDelete(item._id, 'eventos'); }} style={{ padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: '#EF4444' }}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventosList;
