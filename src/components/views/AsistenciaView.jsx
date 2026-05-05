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
            
            <div style={{ display: 'grid', gap: '0.8rem', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
              {(() => {
                const dayRecords = groupedAsistencias[selectedAsistenciaDate.year]?.[selectedAsistenciaDate.month]?.[selectedAsistenciaDate.date] || [];
                const allPresentes = [];

                dayRecords.forEach(record => {
                  if (record.presentes && record.presentes.length > 0) {
                    // Si es un registro de sesión (formato nuevo)
                    record.presentes.forEach(p => {
                      let nombre = 'Usuario Desconocido';
                      if (p.miembroId) {
                        const m = (window.MiembrosData || []).find(u => u._id === p.miembroId);
                        if (m) nombre = `${m.nombre} ${m.apellido}`;
                      } else if (p.nombreInvitado) {
                        nombre = `👤 ${p.nombreInvitado}`;
                      }
                      allPresentes.push({ ...p, nombreMostrar: nombre, tipoReunion: record.tipoReunion });
                    });
                  } else {
                    // Si es un registro individual (formato antiguo)
                    let nombre = record.usuario ? `${record.usuario.nombre} ${record.usuario.apellido}` : (record.nombreInvitado ? `👤 ${record.nombreInvitado}` : 'Usuario Desconocido');
                    allPresentes.push({ ...record, nombreMostrar: nombre });
                  }
                });

                return allPresentes.map((item, index) => (
                  <div key={index} style={{ 
                    background: 'white', 
                    padding: '1rem', 
                    borderRadius: '12px', 
                    border: '1px solid var(--border)', 
                    borderLeft: `5px solid ${
                      item.estado === 'falta' ? '#F44336' : 
                      item.estado === 'permiso' ? '#F59E0B' : 
                      item.estado === 'tardanza' ? '#6366F1' : 
                      '#10B981'
                    }`, 
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '0.4rem' 
                  }}>
                    <h3 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: 'bold' }}>
                      {item.nombreMostrar}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                      <span style={{ 
                        fontSize: '0.7rem',
                        fontWeight: 'bold', 
                        padding: '2px 8px',
                        borderRadius: '6px',
                        background: item.estado === 'falta' ? '#FEF2F2' : 
                                   item.estado === 'permiso' ? '#FFFBEB' : 
                                   item.estado === 'tardanza' ? '#EEF2FF' : 
                                   '#ECFDF5',
                        color: item.estado === 'falta' ? '#F44336' : 
                               item.estado === 'permiso' ? '#F59E0B' : 
                               item.estado === 'tardanza' ? '#6366F1' : 
                               '#10B981'
                      }}>
                        {(item.estado || 'Presente').toUpperCase()}
                      </span>
                      {item.tipoReunion && (
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                          🏷️ {item.tipoReunion}
                        </span>
                      )}
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AsistenciaView;
