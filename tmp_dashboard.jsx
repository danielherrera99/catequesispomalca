  const renderDashboard = () => {
    if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}><ActivityIndicator /> Generando resumen del panel...</div>;
    
    const totalMiembros = data.Miembros?.length || 0;
    const activos = data.Miembros?.filter(h => h.activo)?.length || 0;
    const pendientes = totalMiembros - activos;
    const proxEvento = (data.eventos || [])
      .filter(e => new Date(e.fecha) >= new Date())
      .sort((a,b) => new Date(a.fecha) - new Date(b.fecha))[0];
    const ultimosAnuncios = (data.anuncios || []).slice(0, 3);

    return (
      <div className="animate-fade">
        <h2 style={{ fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '2rem' }}>Paz y Bien, {user?.nombre || 'Miembro'} 👋</h2>
        
        {/* Estadísticas Rápidas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div className="glass-card zoom-hover" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'linear-gradient(135deg, #FFF, #F0F9FF)' }}>
             <div style={{ fontSize: '2.5rem' }}>👥</div>
             <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>Miembros TOTALES</p>
                <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'var(--text-main)' }}>{totalMiembros}</h3>
             </div>
          </div>
          <div className="glass-card zoom-hover" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '5px solid #10B981' }}>
             <div style={{ fontSize: '2.5rem' }}>✅</div>
             <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>ACTIVOS</p>
                <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#10B981' }}>{activos}</h3>
             </div>
          </div>
          <div className="glass-card zoom-hover" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '5px solid #F59E0B' }}>
             <div style={{ fontSize: '2.5rem' }}>⏳</div>
             <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>PENDIENTES</p>
                <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#F59E0B' }}>{pendientes}</h3>
             </div>
          </div>
          <div className="glass-card zoom-hover" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '5px solid #6366F1' }}>
             <div style={{ fontSize: '2.5rem' }}>📅</div>
             <div>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>EN EL CALENDARIO</p>
                <h3 style={{ margin: 0, fontSize: '1.8rem', color: '#6366F1' }}>{data.eventos?.length || 0}</h3>
             </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
           
           {/* Próximo Evento / Actividad */}
           <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(139, 90, 43, 0.1)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '5rem', opacity: 0.05 }}>🗓️</div>
              <h3 style={{ marginTop: 0, color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem', marginBottom: '1.5rem' }}>Próxima Cita</h3>
              {proxEvento ? (
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                   <div style={{ background: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '15px', textAlign: 'center', minWidth: '80px' }}>
                      <p style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase' }}>{formatSafeDate(proxEvento.fecha, 'MMM')}</p>
                      <h4 style={{ margin: 0, fontSize: '2rem' }}>{formatSafeDate(proxEvento.fecha, 'dd')}</h4>
                   </div>
                   <div style={{ flex: 1 }}>
                      <h4 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-main)' }}>{proxEvento.titulo}</h4>
                      <p style={{ margin: '5px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>📍 {proxEvento.lugar}</p>
                      <button onClick={() => setActiveTab('Eventos')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', padding: 0, marginTop: '10px' }}>Ver detalles del evento →</button>
                   </div>
                </div>
              ) : (
                <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No hay eventos programados próximamente. 💤</p>
              )}
           </div>

           {/* Últimos Anuncios */}
           <div className="glass-card" style={{ padding: '2rem' }}>
              <h3 style={{ marginTop: 0, color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem', marginBottom: '1rem' }}>Anuncios Recientes</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 {ultimosAnuncios.length > 0 ? ultimosAnuncios.map(an => (
                   <div key={an._id} className="animate-fade" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', borderBottom: '1px solid #f9f9f9', paddingBottom: '0.8rem' }}>
                      <div style={{ fontSize: '1.2rem', padding: '8px', background: '#FEF3C7', borderRadius: '10px' }}>📢</div>
                      <div style={{ flex: 1 }}>
                         <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.95rem' }}>{an.titulo}</p>
                         <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{an.contenido}</p>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{formatSafeDate(an.createdAt, 'dd MMM')}</span>
                   </div>
                 )) : (
                   <p style={{ color: 'var(--text-muted)', textAlign: 'center' }}>No hay anuncios recientes.</p>
                 )}
                 <button onClick={() => setActiveTab('Anuncios')} className="btn" style={{ width: '100%', marginTop: '1rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)' }}>Ir al panel de anuncios ✅</button>
              </div>
           </div>

        </div>

        {/* Sección de Cumpleaños (Opcional, si hay dato) */}
        <div className="glass-card animate-fade" style={{ marginTop: '2rem', padding: '1.5rem', background: 'linear-gradient(90deg, #FDF2F8 0%, #FFF 100%)', border: '1px solid #FCE7F3' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem' }}>✨</span>
              <div>
                <h4 style={{ margin: 0, color: '#9D174D' }}>Atención, Miembro</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#BE185D' }}>Cada día es una nueva oportunidad para vivir la alegría de Francisco. ¡Que tengas una jornada bendecida!</p>
              </div>
           </div>
        </div>

        {/* Módulo de Aprobación Crítica (Dashboard) */}
        {pendientes > 0 && (
          <div className="glass-card animate-fade" style={{ marginTop: '2rem', border: '2px solid #F59E0B', background: '#FFFBEB' }}>
            <h3 style={{ margin: 0, color: '#B45309', display: 'flex', alignItems: 'center', gap: '10px' }}>⚠️ {pendientes} Solicitudes de Acceso Pendientes</h3>
            <p style={{ color: '#D97706', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Hay Miembros esperando que apruebes su cuenta para entrar a la App.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {data.Miembros.filter(h => !h.activo).map(h => (
                <div key={h._id} style={{ background: 'white', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>{h.nombre} {h.apellido}</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>@{h.username}</p>
                  </div>
                  <button 
                    onClick={(e) => handleApprove(h._id, e)} 
                    style={{ background: '#10B981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}
                    className="zoom-hover"
                  >
                    Aprobar ✅
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
