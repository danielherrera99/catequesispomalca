import React from 'react';

const FormacionList = ({ filteredData, setReadItem, openEditModal, handleDelete }) => {
  if (filteredData.length === 0) return <div className="glass-card animate-fade" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hay temas de formación registrados. 📖</div>;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
      {filteredData.map((item) => (
        <div key={item._id} className="glass-card animate-fade zoom-hover" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '100%', cursor: 'pointer' }} onClick={() => setReadItem(item)}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.8rem', background: '#673AB7', color: 'white', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 2px 5px rgba(103, 58, 183, 0.3)' }}>
              FORMACIÓN
            </span>
            {item.archivoUrl && <span style={{ fontSize: '1.2rem', title: 'Contiene Adjunto' }}>📎</span>}
          </div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.4rem', lineHeight: '1.2' }}>{item.titulo}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Autor: {typeof item.autor === 'object' && item.autor !== null ? (item.autor.nombre + ' ' + item.autor.apellido) : 'Sistema / Admin'}</p>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>{item.descripcion || item.contenido}</p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
             <button onClick={(e) => { e.stopPropagation(); setReadItem(item); }} style={{ flex: 1, padding: '0.8rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-main)', fontWeight: 'bold' }}>📖 Leer Tema</button>
             <button onClick={(e) => { e.stopPropagation(); openEditModal(item); }} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: 'none', color: 'var(--text-main)', fontWeight: 'bold' }}>✏️ Editar</button>
             <button onClick={(e) => { e.stopPropagation(); handleDelete(item._id, 'formacion'); }} style={{ padding: '0.8rem 1rem', background: 'transparent', border: 'none', color: '#EF4444' }}>🗑️</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormacionList;
