import React from 'react';

const AsistenciaView = ({ 
  groupedAsistencias, 
  expandedArchivos, 
  toggleArchivo, 
  selectedAsistenciaDate, 
  setSelectedAsistenciaDate 
}) => {
  if (!groupedAsistencias || Object.keys(groupedAsistencias).length === 0) {
    return (
      <div className="glass-card animate-fade">
        <p style={{ color: "var(--text-muted)" }}>No se encontraron asistencias registradas.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', width: '100%' }}>
      {/* Izquierda: Menú de Archivos */}
      <div className="glass-card" style={{ flex: '0 0 280px', padding: '1rem', maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
        <h3 style={{ borderBottom: '2px solid var(--border)', paddingBottom: '0.8rem', marginBottom: '1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '1.1rem' }}>
          <span>📁</span> Archivo
        </h3>
        
        {Object.keys(groupedAsistencias).sort((a, b) => b - a).map(year => {
          const isYearExpanded = expandedArchivos[year] !== false;
          return (
            <div key={year} style={{ marginBottom: '0.5rem' }}>
              <div 
                onClick={() => toggleArchivo(year)}
                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', background: 'var(--surface)', borderRadius: '6px', fontWeight: 'bold', color: 'var(--text-main)', border: '1px solid var(--border)' }}
              >
                <span>📅 {year}</span>
                <span style={{ fontSize: '0.7rem' }}>{isYearExpanded ? '▼' : '▶'}</span>
              </div>
              
              {isYearExpanded && (
                <div style={{ paddingLeft: '0.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {Object.keys(groupedAsistencias[year] || {}).sort((a,b) => {
                    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
                    return months.indexOf(b) - months.indexOf(a);
                  }).map(monthStr => {
                    const monthKey = `${year}-${monthStr}`;
                    const isMonthExpanded = expandedArchivos[monthKey];

                    return (
                      <div key={monthStr}>
                        <div 
                          onClick={() => toggleArchivo(monthKey)}
                          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.4rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 'bold' }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ fontSize: '0.6rem' }}>{isMonthExpanded ? '▼' : '▶'}</span>
                            {monthStr}
                          </span>
                        </div>
                        
                        {isMonthExpanded && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', borderLeft: '2px solid var(--border)', marginLeft: '0.5rem', paddingLeft: '0.5rem', marginTop: '0.3rem' }}>
                            {Object.keys(groupedAsistencias[year][monthStr] || {}).sort((a,b) => {
                              try {
                                const timeA = new Date(a.split('/').reverse().join('-')).getTime();
                                const timeB = new Date(b.split('/').reverse().join('-')).getTime();
                                return timeB - timeA;
                              } catch(e) { return 0; }
                            }).map(dateStr => (
                              <button 
                                key={dateStr}
                                onClick={() => setSelectedAsistenciaDate({ year, month: monthStr, date: dateStr })}
                                style={{
                                  textAlign: 'left', padding: '0.5rem 0.8rem', borderRadius: '6px', border: 'none', cursor: 'pointer',
                                  background: selectedAsistenciaDate?.date === dateStr ? 'var(--primary)' : 'var(--surface)',
                                  color: selectedAsistenciaDate?.date === dateStr ? 'white' : 'var(--text-main)',
                                  transition: 'all 0.2s ease', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                  fontSize: '0.85rem'
                                }}
                              >
                                <span>{dateStr.slice(0, 5)}</span>
                                <span style={{ fontSize: '0.75rem', background: selectedAsistenciaDate?.date === dateStr ? 'rgba(255,255,255,0.3)' : 'var(--border)', padding: '2px 6px', borderRadius: '12px' }}>
                                  {groupedAsistencias[year][monthStr][dateStr]?.length || 0}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Derecha: Resultados */}
      <div style={{ flex: '1', width: '100%' }}>
        {!selectedAsistenciaDate ? (
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '400px', border: '2px dashed var(--border)' }}>
            <span style={{ fontSize: '5rem', opacity: 0.3, marginBottom: '1rem' }}>👈</span>
            <h2 style={{ color: 'var(--text-muted)' }}>Selecciona una reunión del archivo</h2>
          </div>
        ) : (
          <div className="animate-fade glass-card" style={{ padding: '2rem', minHeight: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--border)', paddingBottom: '1rem', marginBottom: '2rem' }}>
              <h2 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 Lista del {selectedAsistenciaDate.date}
              </h2>
              <div style={{ background: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                <strong style={{ color: 'var(--primary)', fontSize: '1.2rem' }}>
                  {groupedAsistencias[selectedAsistenciaDate.year]?.[selectedAsistenciaDate.month]?.[selectedAsistenciaDate.date]?.length || 0}
                </strong>
              </div>
            </div>
            
            <div style={{ display: 'grid', gap: '0.8rem', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
              {(groupedAsistencias[selectedAsistenciaDate.year]?.[selectedAsistenciaDate.month]?.[selectedAsistenciaDate.date] || []).map((item, index) => (
                <div key={item._id || index} style={{ 
                  background: 'var(--surface)', 
                  padding: '0.6rem 0.8rem', 
                  borderRadius: '6px', 
                  border: '1px solid var(--border)', 
                  borderLeft: `4px solid ${
                    item.estado === 'falta' ? '#F44336' : 
                    item.estado === 'permiso' ? '#F59E0B' : 
                    item.estado === 'tardanza' ? '#6366F1' : 
                    '#10B981'
                  }`, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.3rem' 
                }}>
                  <h3 style={{ margin: 0, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.usuario ? `${item.usuario.nombre} ${item.usuario.apellido}` : (item.nombreInvitado ? `👤 ${item.nombreInvitado}` : 'Usuario Desconocido')}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ 
                      fontWeight: 'bold', 
                      color: item.estado === 'falta' ? '#F44336' : 
                             item.estado === 'permiso' ? '#F59E0B' : 
                             item.estado === 'tardanza' ? '#6366F1' : 
                             '#10B981'
                    }}>
                      {(item.estado || 'Presente').toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AsistenciaView;
