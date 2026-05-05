import React from 'react';

const CantosList = ({ filteredData, setReadItem, openEditModal, handleDelete }) => {
  if (filteredData.length === 0) return <div className="glass-card animate-fade" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hay cantos registrados en el cancionero. 🎵</div>;

  const getCategoriaColor = (cat) => {
    const colors = { entrada: '#4CAF50', ofertorio: '#FF9800', comunion: '#2196F3', salida: '#F44336', adoracion: '#9C27B0', franciscano: '#795548', mariano: '#03A9F4', animacion: '#FFEB3B', otro: '#9E9E9E' };
    return colors[cat] || colors['otro'];
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
      {filteredData.map((item) => (
        <div key={item._id} className="glass-card animate-fade zoom-hover" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }} onClick={() => setReadItem(item)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', background: getCategoriaColor(item.categoria), color: 'white', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
              {(item.categoria || 'Otro').toUpperCase()}
            </span>
            {item.archivoUrl && <span style={{ fontSize: '1.2rem', title: 'Contiene Adjunto' }}>📎</span>}
          </div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.4rem', lineHeight: '1.2' }}>{item.titulo}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 'bold', marginBottom: '1rem' }}>Autor: {typeof item.autor === 'object' && item.autor !== null ? (item.autor.nombre + ' ' + item.autor.apellido) : (item.autor || 'Desconocido')}</p>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1, fontFamily: 'serif' }}>{item.letra}</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
             <button onClick={(e) => { e.stopPropagation(); setReadItem(item); }} style={{ flex: 1, padding: '0.8rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', fontWeight: 'bold' }}>📄 Ver Letra</button>
             <button onClick={(e) => { e.stopPropagation(); openEditModal(item); }} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: 'none', color: 'var(--text-main)', fontWeight: 'bold' }}>✏️ Editar</button>
             <button onClick={(e) => { e.stopPropagation(); handleDelete(item._id, 'cantos'); }} style={{ padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: '#EF4444' }}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CantosList;
