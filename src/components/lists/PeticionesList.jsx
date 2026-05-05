import React from 'react';

const PeticionesList = ({ filteredData, handleOrar, openEditModal, handleDelete }) => {
  if (filteredData.length === 0) return <div className="glass-card animate-fade" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hay peticiones de oración recientes. 🙏</div>;

  const loggedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
      {filteredData.map((item) => {
        const yaOro = item.oraciones?.some(o => o.usuario === loggedUser?._id || o.usuario?._id === loggedUser?._id);
        const esAutor = item.autor?._id === loggedUser?._id;
        
        return (
          <div key={item._id} className="glass-card animate-fade zoom-hover" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 2px 8px rgba(139, 90, 43, 0.3)' }}>
                {item.anonimo ? '?' : (item.autor?.nombre?.charAt(0) || '?')}
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1rem' }}>
                  {item.anonimo ? 'Miembro(a) Anónimo' : `${item.autor?.nombre} ${item.autor?.apellido}`}
                </h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {new Date(item.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {item.anonimo && (
                <span style={{ background: 'var(--surface)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.65rem', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>ANÓNIMO 🤫</span>
              )}
            </div>
            
            <div style={{ flex: 1, padding: '1rem', background: 'rgba(139, 90, 43, 0.03)', borderRadius: '12px', border: '1px solid var(--border)', marginBottom: '1.5rem', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '-10px', left: '15px', background: 'var(--surface)', padding: '0 8px', fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold' }}>Petición</span>
              <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>"{item.contenido}"</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              <button 
                onClick={(e) => handleOrar(item._id, e)} 
                className={`zoom-hover ${yaOro ? 'btn-primary' : ''}`}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', borderRadius: '20px', 
                  background: yaOro ? 'var(--primary)' : 'var(--surface)', 
                  color: yaOro ? 'white' : 'var(--primary)', 
                  border: `1px solid var(--primary)`,
                  fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease'
                }}
              >
                🙏 {yaOro ? 'Orando' : 'Orar'} ({item.oraciones?.length || 0})
              </button>
              
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                 {(esAutor || loggedUser?.rol === 'admin' || loggedUser?.rol === 'consejo') && (
                   <>
                     <button onClick={(e) => { e.stopPropagation(); openEditModal(item); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }} title="Editar">✏️</button>
                     <button onClick={(e) => { e.stopPropagation(); handleDelete(item._id, 'peticiones'); }} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }} title="Eliminar">🗑️</button>
                   </>
                 )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PeticionesList;
