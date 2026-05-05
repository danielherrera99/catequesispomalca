import React from 'react';
import api from '../config/api';

const ItemReadModal = ({ 
  readItem, 
  setReadItem, 
  activeTab, 
  chatMessages, 
  setChatMessages, 
  chatLoading, 
  formatSafeDate, 
  getTipoIcon, 
  SafeImage, 
  ActivityIndicator 
}) => {
  if (!readItem) return null;

  return (
    <div className="modal-overlay" onClick={() => { setReadItem(null); setChatMessages([]); }}>
      <div 
        className="modal-content animate-fade" 
        style={{ 
          maxWidth: readItem.type === 'chat' ? '500px' : (activeTab === 'Actas' ? '800px' : '600px'), 
          cursor: 'default', 
          padding: activeTab === 'Actas' ? '2.5rem' : (readItem.type === 'chat' ? '0' : '0'), 
          overflow: 'hidden', 
          maxHeight: '95vh', 
          display: 'flex', 
          flexDirection: 'column' 
        }} 
        onClick={e => e.stopPropagation()}
      >
        {readItem.type === 'chat' ? (
          <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', background: '#F5F5F5' }}>
             <div style={{ background: 'var(--primary)', color: 'white', padding: '1.2rem', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '1.5rem' }}>💬</div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ margin: 0, fontSize: '1.1rem' }}>Chat entre {readItem.usuario1?.nombre} y {readItem.usuario2?.nombre}</h2>
                  <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Modo Supervisión</span>
                </div>
                <button onClick={() => { setReadItem(null); setChatMessages([]); }} style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer' }}>✕</button>
             </div>

             <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {chatLoading ? <div style={{ textAlign: 'center', marginTop: '2rem' }}><ActivityIndicator /></div> : (
                  chatMessages.map(msg => {
                    const isFromUser1 = msg.remitente?._id === readItem.usuario1?._id;
                    return (
                      <div key={msg._id} style={{ alignSelf: isFromUser1 ? 'flex-start' : 'flex-end', maxWidth: '85%' }}>
                         <p style={{ margin: '0 0 4px 6px', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>{msg.remitente?.nombre}</p>
                         <div style={{ 
                            background: isFromUser1 ? 'white' : 'var(--secondary)', 
                            color: isFromUser1 ? 'var(--text-main)' : 'white', 
                            padding: '0.8rem 1rem', 
                            borderRadius: '15px', 
                            borderTopLeftRadius: isFromUser1 ? '0' : '15px',
                            borderTopRightRadius: isFromUser1 ? '15px' : '0',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                         }}>
                            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.4 }}>{msg.contenido}</p>
                            <p style={{ margin: '4px 0 0', fontSize: '0.65rem', textAlign: 'right', opacity: 0.7 }}>{formatSafeDate(msg.createdAt, 'HH:mm')}</p>
                         </div>
                      </div>
                    );
                  })
                )}
             </div>
             <div style={{ padding: '1rem', background: 'white', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>⚠️ Los administradores no pueden intervenir en chats privados por seguridad.</p>
             </div>
          </div>
        ) : activeTab === 'Actas' ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>📝</span>
                <div>
                  <h2 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.8rem' }}>{readItem.titulo || 'Acta sin título'}</h2>
                  <span style={{ color: 'var(--text-muted)' }}>
                    Acta de Reunión de {(readItem.tipoReunion || 'General').toUpperCase()} | {formatSafeDate(readItem.fecha, 'dd MMMM yyyy')}
                  </span>
                </div>
              </div>
              <button className="btn" style={{ background: '#ECEFF1', color: 'var(--text-main)', padding: '0.5rem 1rem' }} onClick={() => window.print()}>🖨️ Imprimir</button>
            </div>
            
            <div style={{ padding: '1rem', overflowY: 'auto', flex: 1 }}>
              <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--text-main)', whiteSpace: 'pre-line', background: 'var(--surface)', padding: '2rem', borderRadius: '12px', borderLeft: '4px solid var(--primary)', fontFamily: 'serif' }}>
                 {readItem.contenido || 'Sin contenido redactado.'}
              </div>

              {readItem.acuerdos && readItem.acuerdos.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                  <h3 style={{ color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>✅ Acuerdos Tomados</h3>
                  <ul style={{ paddingLeft: '1.5rem' }}>
                    {readItem.acuerdos.map((acuerdo, idx) => (
                      <li key={idx} style={{ marginBottom: '0.5rem', color: acuerdo.completado ? '#4CAF50' : 'var(--text-main)', textDecoration: acuerdo.completado ? 'line-through' : 'none' }}>
                        {acuerdo.descripcion} 
                        {acuerdo.responsable && <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '10px' }}>(Resp: {acuerdo.responsable.nombre})</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
               <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => setReadItem(null)}>Cerrar Acta</button>
            </div>
          </>
        ) : activeTab === 'Eventos' ? (
          <>
            <div style={{ padding: '0 0 1rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.9rem', background: 'var(--primary)', color: 'white', padding: '6px 14px', borderRadius: '16px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  📅 DETALLE DEL EVENTO
                </span>
                <h2 style={{ margin: '1rem 0 0.5rem 0', color: 'var(--text-main)', fontSize: '2.4rem', lineHeight: '1.2' }}>{readItem.titulo}</h2>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                   <span style={{ fontSize: '1.1rem', color: '#EF4444', fontWeight: 'bold' }}>🕒 {readItem.hora || 'Todo el día'}</span>
                   <span style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>📍 {readItem.lugar || 'Sede Catequesis Pomalca'}</span>
                </div>
              </div>
              <button className="btn" style={{ background: '#ECEFF1', color: 'var(--text-main)' }} onClick={() => window.print()}>🖨️ Imprimir</button>
            </div>

            {readItem.imagenUrl && (
              <div style={{ width: '100%', height: '300px', backgroundImage: `url(${readItem.imagenUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '16px', margin: '1rem 0', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}></div>
            )}
            
            <div style={{ marginTop: '1rem', background: 'var(--surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
               <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)', fontSize: '1.2rem' }}>Acerca de este evento</h3>
               <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', lineHeight: '1.7', whiteSpace: 'pre-line', fontStyle: 'italic', margin: 0 }}>
                  {readItem.descripcion || 'Sin descripción detallada.'}
               </p>
            </div>

            {readItem.ubicacion && readItem.ubicacion.lat && (
               <div style={{ marginTop: '1.5rem', background: 'var(--cream)', padding: '1.5rem', borderRadius: '12px', border: '1px dashed var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                     <h4 style={{ margin: '0 0 0.2rem 0', color: 'var(--primary)', fontSize: '1.1rem' }}>Ubicación Satelital</h4>
                     <p style={{ margin: 0, color: 'var(--text-muted)' }}>Míralo exactamente en el Mapa</p>
                  </div>
                  <a href={`https://www.google.com/maps/search/?api=1&query=${readItem.ubicacion.lat},${readItem.ubicacion.lng}`} target="_blank" rel="noreferrer" className="btn zoom-hover" style={{ textDecoration: 'none', background: 'var(--primary)', color: 'white', fontWeight: 'bold', padding: '0.8rem 1.5rem', borderRadius: '10px' }}>
                     🗺️ Abrir en Google Maps
                  </a>
               </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
               <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => setReadItem(null)}>Cerrar Evento</button>
            </div>
          </>
        ) : activeTab === 'Formacion' ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.8rem', background: '#673AB7', color: 'white', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>FORMACIÓN</span>
                <h2 style={{ margin: '0.5rem 0 0 0', color: 'var(--text-main)', fontSize: '2rem' }}>{readItem.titulo}</h2>
                <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-muted)' }}>Módulo redactado por: <b>{typeof readItem.autor === 'object' && readItem.autor !== null ? (readItem.autor.nombre + ' ' + readItem.autor.apellido) : 'Sistema / Admin'}</b></p>
              </div>
              <button className="btn" style={{ background: '#ECEFF1', color: 'var(--text-main)' }} onClick={() => window.print()}>🖨️ Imprimir</button>
            </div>
            
            <div style={{ padding: '1.5rem 2rem', overflowY: 'auto', flex: 1, background: 'var(--surface)', borderRadius: '12px', fontFamily: 'serif', whiteSpace: 'pre-line', fontSize: '1.1rem', lineHeight: '2.0', border: '1px solid var(--border)' }}>
               {readItem.contenido}
            </div>

            {readItem.archivoUrl && (
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <button className="btn zoom-hover" style={{ background: '#673AB7', padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '12px', color: 'white', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(103,58,183,0.4)', border: 'none', cursor: 'pointer' }} onClick={() => window.open(readItem.archivoUrl, '_blank')}>
                  📎 Abrir Documento Adjunto ({readItem.archivoNombre || 'Descargar'})
                </button>
              </div>
            )}

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
               {(readItem.etiquetas || []).map((etq, i) => (
                 <span key={i} style={{ background: '#ECEFF1', padding: '4px 10px', borderRadius: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>#{etq}</span>
               ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
               <button className="btn btn-primary" style={{ width: 'auto', background: '#673AB7', borderColor: '#673AB7' }} onClick={() => setReadItem(null)}>Cerrar Tema</button>
            </div>
          </>
        ) : activeTab === 'Cantos' ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid var(--border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.8rem', background: 'var(--primary)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>{(readItem.categoria || 'Otro').toUpperCase()}</span>
                <h2 style={{ margin: '0.5rem 0 0 0', color: 'var(--text-main)', fontSize: '2rem' }}>{readItem.titulo}</h2>
                <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-muted)' }}>Autor: <b>{typeof readItem.autor === 'object' && readItem.autor !== null ? (readItem.autor.nombre + ' ' + readItem.autor.apellido) : (readItem.autor || readItem.artista || 'Desconocido')}</b></p>
              </div>
              <button className="btn" style={{ background: '#ECEFF1', color: 'var(--text-main)' }} onClick={() => window.print()}>🖨️ Imprimir</button>
            </div>
            
            <div style={{ padding: '1.5rem 2rem', overflowY: 'auto', flex: 1, background: 'var(--surface)', borderRadius: '12px', fontFamily: 'serif', whiteSpace: 'pre-wrap', fontSize: '1.1rem', lineHeight: '2.2', border: '1px solid var(--border)' }}>
               {readItem.letra}
            </div>

            {readItem.archivoUrl && (
              <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(139, 90, 43, 0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '1.8rem' }}>📎</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--primary)' }}>Archivo Adjunto (Audio / Acordes)</p>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{readItem.archivoNombre || 'Descargar archivo adjunto'}</p>
                </div>
                <a href={readItem.archivoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', textDecoration: 'none' }}>Descargar / Abrir</a>
              </div>
            )}

            <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
               <button className="btn" style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)' }} onClick={() => setReadItem(null)}>Cerrar Letra</button>
            </div>
          </>
        ) : activeTab === 'Documentos' ? (
          <>
            <div style={{ padding: '2rem', borderBottom: '2px solid var(--border)', background: 'rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '0.8rem', background: 'var(--primary)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>BIBLIOTECA Catequesis Pomalca</span>
              <h2 style={{ margin: '0.5rem 0 0', color: 'var(--text-main)', fontSize: '2rem' }}>{readItem.titulo}</h2>
              <p style={{ margin: '4px 0 0', color: 'var(--text-muted)' }}>{readItem.descripcion || 'Sin descripción adicional.'}</p>
            </div>
            
            <div style={{ padding: '2.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem', opacity: 0.8 }}>📂</div>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '2rem', maxWidth: '400px' }}>
                Este documento está listo para ser revisado o descargado para su uso en la Comunidad.
              </p>
              
              {readItem.archivoUrl && (
                <button 
                  className="btn zoom-hover" 
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--primary)', color: 'white', padding: '1.2rem 2.5rem', fontSize: '1.2rem', borderRadius: '15px', border: 'none', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 20px rgba(139, 90, 43, 0.3)' }}
                  onClick={() => window.open(api.defaults.baseURL.replace('/api', '') + readItem.archivoUrl, '_blank')}
                >
                  📥 Descargar Documento
                </button>
              )}
            </div>

            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', padding: '1.5rem 2rem' }}>
               <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => setReadItem(null)}>Cerrar Biblioteca</button>
            </div>
          </>
        ) : activeTab === 'Galeria' ? (
          <>
            <div style={{ padding: '0', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px', position: 'relative' }}>
              {readItem.tipoArchivo === 'video' ? (
                <video src={readItem.archivoUrl} controls autoPlay style={{ maxWidth: '100%', maxHeight: '70vh' }} />
              ) : (
                <img src={readItem.archivoUrl} alt={readItem.titulo} style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain' }} />
              )}
              <button 
                onClick={() => setReadItem(null)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '1.5rem 2rem', background: 'var(--surface)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                 <h2 style={{ margin: 0, color: 'var(--primary)', fontSize: '1.5rem' }}>{readItem.titulo}</h2>
                 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>📅 {formatSafeDate(readItem.fecha)}</span>
              </div>
              {readItem.descripcion && (
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.5' }}>{readItem.descripcion}</p>
              )}
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                 <a 
                  href={readItem.archivoUrl} 
                  download={readItem.titulo || 'archivo_Catequesis Pomalca'} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn zoom-hover" 
                  style={{ padding: '0.6rem 1.2rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', textDecoration: 'none', fontWeight: 'bold' }}
                 >
                   📥 Descargar Archivo
                 </a>
                 <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => setReadItem(null)}>Cerrar</button>
              </div>
            </div>
          </>
        ) : (
          <>
            {readItem.imagen ? (
              <SafeImage src={readItem.imagen.replace('http://', 'https://')} style={{ width: '100%', minHeight: '220px', maxHeight: '220px' }} fallbackIcon="🖼️" />
            ) : (
               <div style={{ width: '100%', minHeight: '80px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}></div>
            )}
            <div style={{ padding: '2rem', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.85rem', background: readItem.prioridad === 'alta' ? '#F44336' : 'rgba(0,0,0,0.05)', color: readItem.prioridad === 'alta' ? 'white' : 'var(--text-main)', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
                  {getTipoIcon(readItem.tipo)} {readItem.tipo ? readItem.tipo.toUpperCase() : 'GENERAL'}
                </span>
                {readItem.destacado && <span style={{ fontSize: '1.2rem', color: '#ffb300', fontWeight: 'bold' }}>⭐ Destacado</span>}
              </div>
              
              <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1rem', lineHeight: 1.2 }}>{readItem.titulo}</h2>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem' }}>
                 <span>De: <b>{readItem.autor ? `${readItem.autor.nombre}` : 'Administrador Catequesis Pomalca'}</b></span>
                 <span>👁️ {readItem.vistas || 0} vistas</span>
              </div>
              
              <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: 1.6, whiteSpace: 'pre-line', maxHeight: '35vh', overflowY: 'auto', paddingRight: '1rem' }}>
                {readItem.contenido}
              </p>

              {readItem.ubicacion && readItem.ubicacion.lat && readItem.ubicacion.lng && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>📍 Mapa de Ubicación</h4>
                  <iframe
                    width="100%"
                    height="200"
                    style={{ border: '1px solid var(--border)', borderRadius: '8px' }}
                    src={`https://maps.google.com/maps?q=${readItem.ubicacion.lat},${readItem.ubicacion.lng}&z=15&output=embed`}
                  ></iframe>
                </div>
              )}
              
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                 <button className="btn btn-primary" style={{ width: 'auto' }} onClick={() => setReadItem(null)}>Entendido</button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemReadModal;
