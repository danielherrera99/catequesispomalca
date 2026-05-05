import React from 'react';

const EspirituList = ({ filteredData, espirituTab, setEspirituTab, openEditModal, handleDelete }) => {
  const items = filteredData.filter(i => i.tipo === espirituTab);

  return (
    <div className="animate-fade">
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', background: 'var(--surface)', padding: '0.6rem', borderRadius: '15px', border: '1px solid var(--border)', width: 'fit-content' }}>
        <button onClick={() => setEspirituTab('oracion')} className={`btn ${espirituTab === 'oracion' ? 'btn-primary' : ''}`} style={{ background: espirituTab === 'oracion' ? '' : 'transparent', color: espirituTab === 'oracion' ? '' : 'var(--text-main)', border: 'none', borderRadius: '10px' }}>🙏 Oraciones</button>
        <button onClick={() => setEspirituTab('carisma')} className={`btn ${espirituTab === 'carisma' ? 'btn-primary' : ''}`} style={{ background: espirituTab === 'carisma' ? '' : 'transparent', color: espirituTab === 'carisma' ? '' : 'var(--text-main)', border: 'none', borderRadius: '10px' }}>🌿 Carisma</button>
      </div>

      {items.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hay contenido en esta sección todavía.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {items.map(item => (
            <div key={item._id} className="glass-card zoom-hover" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.4rem' }}>{item.titulo}</h3>
                 <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => openEditModal(item)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>✏️</button>
                    <button onClick={() => handleDelete(item._id, 'espiritualidad')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>🗑️</button>
                 </div>
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-main)', textAlign: 'justify', whiteSpace: 'pre-line' }}>{item.contenido}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EspirituList;
