import React from 'react';

const MensajesAdminView = ({ loading, ActivityIndicator, data, openChatAdmin, formatSafeDate }) => {
  if (loading) return <div className="animate-fade" style={{ textAlign: 'center', padding: '3rem' }}><ActivityIndicator /> Cargando conversaciones...</div>;
  if (!data || data.length === 0) return <div className="glass-card animate-fade" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No se han iniciado conversaciones en la plataforma todavía. 💬</div>;

  return (
    <div className="animate-fade">
      <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>🔍 Monitoreo administrativo de conversaciones entre Miembros.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1rem' }}>
        {data.map((conv, idx) => (
          <div 
            key={idx} 
            className="glass-card zoom-hover" 
            style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', borderLeft: '4px solid var(--secondary)' }}
            onClick={() => openChatAdmin(conv)}
          >
            <div style={{ display: 'flex', position: 'relative', width: '80px', height: '50px' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', position: 'absolute', left: 0, zIndex: 2, border: '2px solid white', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {conv.usuario1?.foto ? <img src={conv.usuario1.foto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="User 1" /> : <span style={{ color: 'white', fontWeight: 'bold' }}>{conv.usuario1?.nombre?.charAt(0)}</span>}
               </div>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--secondary)', position: 'absolute', right: 0, zIndex: 1, border: '2px solid white', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {conv.usuario2?.foto ? <img src={conv.usuario2.foto} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="User 2" /> : <span style={{ color: 'white', fontWeight: 'bold' }}>{conv.usuario2?.nombre?.charAt(0)}</span>}
               </div>
            </div>
            <div style={{ flex: 1, overflow: 'hidden' }}>
               <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)', display: 'flex', gap: '5px' }}>
                  <b>{conv.usuario1?.nombre}</b> y <b>{conv.usuario2?.nombre}</b>
               </h3>
               <p style={{ margin: '3px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  🗨️ {conv.ultimoMensaje?.contenido}
               </p>
            </div>
            <div style={{ textAlign: 'right', minWidth: '80px' }}>
               <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--primary)' }}>{conv.count} msgs</p>
               <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>{formatSafeDate(conv.ultimoMensaje?.createdAt, 'HH:mm')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MensajesAdminView;
