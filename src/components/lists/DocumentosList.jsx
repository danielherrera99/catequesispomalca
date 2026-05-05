import React from 'react';

const DocumentosList = ({ filteredData, setReadItem, openEditModal, handleDelete }) => {
  if (filteredData.length === 0) return <div className="glass-card animate-fade" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hay documentos en la biblioteca. 📂</div>;

  const getIconDoc = (tipo) => {
    switch (tipo) {
      case 'regla': return '📜';
      case 'ccgg': return '⚖️';
      case 'estatuto': return '🏛️';
      case 'formacion': return '📚';
      default: return '📄';
    }
  };
  
  const getTipoLabel = (tipo) => {
    switch (tipo) {
      case 'regla': return 'Regla Catequesis Pomalca';
      case 'ccgg': return 'Const. Generales';
      case 'estatuto': return 'Estatuto';
      case 'formacion': return 'Material';
      default: return 'Otro';
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {filteredData.map((item) => (
        <div key={item._id} className="glass-card animate-fade zoom-hover" style={{ padding: '1.2rem', display: 'flex', gap: '1.2rem', alignItems: 'center', cursor: 'pointer' }} onClick={() => setReadItem(item)}>
          <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
            {getIconDoc(item.tipo)}
          </div>
          <div style={{ flex: 1 }}>
             <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase', background: 'rgba(139, 90, 43, 0.1)', padding: '2px 8px', borderRadius: '10px', marginBottom: '4px', display: 'inline-block' }}>{getTipoLabel(item.tipo)}</span>
             <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.titulo}</h3>
             <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.descripcion || 'Sin descripción'}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
             <button onClick={(e) => { e.stopPropagation(); openEditModal(item); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>✏️</button>
             <button onClick={(e) => { e.stopPropagation(); handleDelete(item._id, 'documentos'); }} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentosList;
