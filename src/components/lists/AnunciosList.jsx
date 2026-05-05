import React from 'react';

const AnunciosList = ({ filteredData, setReadItem, getTipoIcon, SafeImage, openEditModal, handleDelete }) => {
  if (filteredData.length === 0) {
     return <div className="glass-card animate-fade"><p style={{ color: "var(--text-muted)" }}>No hay anuncios publicados.</p></div>
  }
  return (
    <div style={{ display: 'grid', gap: '1.2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
      {filteredData.map((item, index) => (
        <div key={item?._id || index} className="glass-card animate-fade zoom-hover" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div onClick={() => setReadItem(item)} style={{ cursor: 'pointer', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {item.imagen ? (
              <SafeImage src={item.imagen.replace('http://', 'https://')} style={{ width: '100%', height: '130px' }} fallbackIcon={getTipoIcon(item.tipo)} />
            ) : (
              <div style={{ width: '100%', height: '130px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '3rem' }}>{getTipoIcon(item.tipo)}</span>
              </div>
            )}
            <div style={{ padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', background: item.prioridad === 'alta' ? '#F44336' : 'var(--surface)', color: item.prioridad === 'alta' ? 'white' : 'var(--text-main)', padding: '3px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                {getTipoIcon(item.tipo)} {item.tipo?.toUpperCase() || 'GENERAL'}
              </span>
              <h3 style={{ margin: '0.5rem 0', color: 'var(--primary)', fontSize: '1.1rem' }}>{item.titulo}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', flex: 1, opacity: 0.8, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.contenido}</p>
            </div>
          </div>
          <div style={{ display: 'flex', borderTop: '1px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
             <button onClick={(e) => { e.stopPropagation(); openEditModal(item); }} style={{ flex: 1, padding: '0.6rem', background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 'bold' }}>Editar</button>
             <button onClick={(e) => { e.stopPropagation(); handleDelete(item._id, 'anuncios'); }} style={{ flex: 1, padding: '0.6rem', background: 'transparent', border: 'none', color: '#F44336', fontWeight: 'bold' }}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnunciosList;
