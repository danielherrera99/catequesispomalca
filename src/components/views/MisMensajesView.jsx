import React from 'react';

const MisMensajesView = ({ 
  loading, ActivityIndicator, data, showSearchChat, setShowSearchChat, openChatPersonal, 
  SafeImage, activeChat, user, formatSafeDate, chatLoading, chatMessages, 
  handleSendChat, nuevoMensaje, setNuevoMensaje 
}) => {
  if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}><ActivityIndicator /> Conectando al servidor...</div>;

  const conversaciones = Array.isArray(data) ? data : [];

  return (
    <div className="animate-fade" style={{ display: 'flex', height: 'calc(100vh - 220px)', border: '1px solid var(--border)', borderRadius: '20px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)', background: 'white' }}>
      
      {/* Sidebar de Chats */}
      <div style={{ width: '350px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: '#F9FAFB' }}>
         <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.2rem' }}>Mis Chats</h3>
            <button 
              onClick={() => setShowSearchChat(!showSearchChat)} 
              style={{ background: 'var(--primary)', color: 'white', border: 'none', width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              +
            </button>
         </div>
         
         <div style={{ flex: 1, overflowY: 'auto' }}>
            {showSearchChat ? (
              <div style={{ padding: '1rem' }}>
                 <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '10px' }}>BUSCAR Miembro PARA CHATEAR:</p>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(data.Miembros || []).slice(0, 10).map(h => (
                      <div key={h._id} onClick={() => { openChatPersonal(h); setShowSearchChat(false); }} className="zoom-hover" style={{ padding: '8px 12px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', border: '1px solid var(--border)' }}>
                         <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'var(--secondary)', overflow: 'hidden' }}>
                            <SafeImage src={h.foto} />
                         </div>
                         <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{h.nombre} {h.apellido}</span>
                      </div>
                    ))}
                    <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '10px' }}>Usa el buscador general para más resultados.</p>
                    <button onClick={() => setShowSearchChat(false)} style={{ width: '100%', padding: '8px', background: 'none', border: '1px solid #ccc', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}>Cerrar buscador</button>
                 </div>
              </div>
            ) : (
              conversaciones.length > 0 ? conversaciones.map((conv, idx) => {
                const otroUser = conv.usuario1?._id === user?.id ? conv.usuario2 : conv.usuario1;
                const isActive = activeChat?._id === otroUser?._id;
                return (
                  <div 
                    key={idx} 
                    onClick={() => openChatPersonal(otroUser)}
                    style={{ 
                      padding: '1.2rem', borderBottom: '1px solid rgba(0,0,0,0.03)', cursor: 'pointer', 
                      display: 'flex', alignItems: 'center', gap: '1rem', 
                      background: isActive ? 'white' : 'transparent',
                      borderLeft: isActive ? '4px solid var(--primary)' : '4px solid transparent',
                      transition: '0.2s'
                    }}
                  >
                     <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#E5E7EB', overflow: 'hidden', border: '2px solid white', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                        <SafeImage src={otroUser?.foto} />
                     </div>
                     <div style={{ flex: 1, overflow: 'hidden' }}>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', color: isActive ? 'var(--primary)' : 'var(--text-main)' }}>{otroUser?.nombre} {otroUser?.apellido}</h4>
                        <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{conv.ultimoMensaje?.contenido || 'Inicia una charla...'}</p>
                     </div>
                     <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{formatSafeDate(conv.ultimoMensaje?.createdAt, 'HH:mm')}</span>
                  </div>
                );
              }) : <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Todavía no tienes conversaciones iniciadas. ¡Pulsa "+" para comenzar! 👋</div>
            )}
         </div>
      </div>

      {/* Ventana de Chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#F3F4F6' }}>
         {activeChat ? (
           <>
             {/* Header Chat */}
             <div style={{ background: 'white', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--secondary)', overflow: 'hidden' }}>
                  <SafeImage src={activeChat.foto} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{activeChat.nombre} {activeChat.apellido}</h3>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#10B981', fontWeight: 'bold' }}>● En línea</p>
                </div>
             </div>
             
             {/* Mensajes */}
             <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {chatLoading ? <div style={{ textAlign: 'center', marginTop: '3rem' }}><ActivityIndicator /></div> : (
                  chatMessages.map(msg => {
                    const isMe = msg.remitente?._id === user?.id || msg.remitente === user?.id;
                    return (
                      <div key={msg._id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '70%' }}>
                         <div style={{ 
                           background: isMe ? 'var(--primary)' : 'white', 
                           color: isMe ? 'white' : 'var(--text-main)', 
                           padding: '0.8rem 1.2rem', 
                           borderRadius: '18px',
                           borderTopRightRadius: isMe ? '2px' : '18px',
                           borderTopLeftRadius: isMe ? '18px' : '2px',
                           boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                           position: 'relative'
                         }}>
                            <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.4 }}>{msg.contenido}</p>
                            <p style={{ margin: '4px 0 0', fontSize: '0.6rem', textAlign: 'right', opacity: 0.8 }}>{formatSafeDate(msg.createdAt, 'HH:mm')}</p>
                         </div>
                      </div>
                    )
                  })
                )}
             </div>
             
             {/* Input Area */}
             <form onSubmit={handleSendChat} style={{ padding: '1.2rem', background: 'white', borderTop: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input 
                  type="text" 
                  placeholder="Escribe un mensaje aquí..." 
                  value={nuevoMensaje}
                  onChange={(e) => setNuevoMensaje(e.target.value)}
                  style={{ flex: 1, padding: '0.8rem 1.2rem', borderRadius: '25px', background: '#F3F4F6', border: '1px solid #E5E7EB' }} 
                />
                <button type="submit" style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'var(--primary)', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
                  🚀
                </button>
             </form>
           </>
         ) : (
           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
              <span style={{ fontSize: '5rem', marginBottom: '1rem' }}>💬</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Tus Mensajes Privados</h2>
              <p>Selecciona una conversación a la izquierda o inicia una nueva.</p>
           </div>
         )}
      </div>
    </div>
  );
};

export default MisMensajesView;
