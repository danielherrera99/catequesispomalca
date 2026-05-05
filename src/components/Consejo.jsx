import React from 'react';

const Consejo = ({ miembrosData }) => {
  // Filtrar solo los que tienen cargo
  const miembros = miembrosData.filter(h => h.cargo && h.cargo !== 'ninguno');

  if (miembros.length === 0) {
    return (
      <div className="glass-card animate-fade" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        No hay miembros del consejo registrados aún. 🛡️
      </div>
    );
  }

  // Ordenar por jerarquía
  const ordenCargos = {
    'coordinador': 1,
    'vice-coordinador': 2,
    'secretario': 3,
    'tesorero': 4,
    'formador': 5,
    'animador': 6
  };

  const consejoSorted = [...miembros].sort((a, b) => (ordenCargos[a.cargo] || 99) - (ordenCargos[b.cargo] || 99));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
      {consejoSorted.map((miembro) => (
        <div key={miembro._id} className="glass-card animate-fade zoom-hover" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '40px', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
            {miembro.foto ? (
              <img src={miembro.foto} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              (miembro.nombre?.charAt(0) + miembro.apellido?.charAt(0))
            )}
          </div>
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {miembro.cargo.replace('-', ' ')}
            </span>
            <h3 style={{ margin: '4px 0 8px 0', fontSize: '1.25rem', color: 'var(--text-main)' }}>
              {miembro.nombre} {miembro.apellido}
            </h3>
            
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {miembro.telefono && (
                <>
                  <a href={`tel:${miembro.telefono}`} className="btn-icon" title="Llamar" style={{ padding: '8px', background: 'var(--surface)', borderRadius: '10px', textDecoration: 'none', border: '1px solid var(--border)' }}>📞</a>
                  <a href={`https://wa.me/${miembro.telefono.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="btn-icon" title="WhatsApp" style={{ padding: '8px', background: 'var(--surface)', borderRadius: '10px', textDecoration: 'none', border: '1px solid var(--border)' }}>💬</a>
                </>
              )}
              <button onClick={() => alert('Próximamente: Chat Integrado ✉️')} className="btn-icon" title="Enviar Mensaje" style={{ padding: '8px', background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--border)', cursor: 'pointer' }}>✉️</button>
            </div>
          </div>
          {miembro.rol === 'admin' && (
            <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '1.2rem' }} title="Administrador">👑</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Consejo;
