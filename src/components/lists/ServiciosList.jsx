import React from 'react';

const ServiciosList = ({ filteredData, setReadItem, openEditModal, handleDelete, handleParticipar }) => {
  if (filteredData.length === 0) return <div className="glass-card animate-fade" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No hay actividades de servicio programadas. 💼</div>;

  const loggedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
      {filteredData.map((item) => {
        const estaInscrito = item.participantes?.some(p => p === loggedUser?._id || p._id === loggedUser?._id);
        const cupoLleno = item.cupoMaximo > 0 && (item.participantes?.length || 0) >= item.cupoMaximo;
        const fecha = new Date(item.fecha);
        
        return (
          <div key={item._id} className="glass-card animate-fade" style={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
            <div style={{ display: 'flex', padding: '1.2rem', gap: '1rem', borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.01)' }}>
              <div style={{ background: 'var(--surface)', padding: '0.5rem', borderRadius: '10px', textAlign: 'center', minWidth: '60px', height: 'fit-content', border: '1px solid var(--border)' }}>
                 <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary)', lineHeight: 1 }}>{fecha.getDate()}</div>
                 <div style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{fecha.toLocaleDateString('es-ES', { month: 'short' })}</div>
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--primary)', lineHeight: 1.2 }}>{item.titulo}</h3>
                <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>📍 {item.lugar}</p>
              </div>
              {(loggedUser?.rol === 'admin' || loggedUser?.rol === 'consejo') && (
                <button onClick={() => handleDelete(item._id, 'servicios')} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
              )}
            </div>

            {item.imagen && (
              <div style={{ width: '100%', height: '160px', backgroundImage: `url(${item.imagen})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            )}

            <div style={{ padding: '1.2rem', flex: 1 }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', opacity: 0.9, marginBottom: '1.5rem', lineHeight: '1.5' }}>{item.descripcion}</p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.85rem' }}>
                  <span style={{ fontWeight: 'bold', color: cupoLleno ? '#EF4444' : 'var(--text-main)' }}>
                    👥 {item.participantes?.length || 0} {item.cupoMaximo > 0 ? `/ ${item.cupoMaximo}` : ''} inscritos
                  </span>
                  {(loggedUser?.rol === 'admin' || loggedUser?.rol === 'consejo') && (
                    <button onClick={() => setReadItem({ ...item, viewParticipants: true })} style={{ display: 'block', background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.75rem', padding: 0, cursor: 'pointer', marginTop: '2px' }}>Ver lista de inscritos</button>
                  )}
                </div>

                <button 
                  onClick={() => handleParticipar(item._id)}
                  disabled={!estaInscrito && cupoLleno}
                  className={`btn ${estaInscrito ? '' : 'btn-primary'}`}
                  style={{ 
                    padding: '0.5rem 1.2rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold',
                    background: estaInscrito ? 'transparent' : '',
                    border: estaInscrito ? '1px solid #EF4444' : '',
                    color: estaInscrito ? '#EF4444' : '',
                    opacity: (!estaInscrito && cupoLleno) ? 0.5 : 1
                  }}
                >
                  {estaInscrito ? 'Salir' : (cupoLleno ? 'Lleno' : 'Participar')}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiciosList;
