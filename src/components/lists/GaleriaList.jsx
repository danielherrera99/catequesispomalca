import React from 'react';

const GaleriaList = ({ filteredData, setReadItem, SafeImage, formatSafeDate, handleDelete }) => {
  if (filteredData.length === 0) return (
    <div className="glass-card animate-fade" style={{ padding: '5rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🖼️</div>
      <h3 style={{ margin: 0 }}>La galería está esperando tus recuerdos</h3>
      <p style={{ marginTop: '0.5rem' }}>Aún no hay fotos o videos subidos para esta sección.</p>
    </div>
  );

  const getCategoryColor = (cat) => {
    const colors = {
      'retiro': '#818CF8',
      'mision': '#10B981',
      'formacion': '#6366F1',
      'social': '#F59E0B',
      'liturgia': '#EF4444',
      'general': '#94A3B8'
    };
    return colors[cat] || colors.general;
  };

  const getCategoryLabel = (cat) => {
    const labels = {
      'retiro': 'Retiro / Jornada',
      'mision': 'Misión',
      'formacion': 'Formación',
      'social': 'Social',
      'liturgia': 'Liturgia',
      'general': 'Recuerdo'
    };
    return labels[cat] || 'General';
  };

  return (
    <div className="animate-fade" style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
      gap: '2rem',
      paddingBottom: '2rem'
    }}>
      {filteredData.map(item => (
        <div 
          key={item._id} 
          className="glass-card zoom-hover animate-fade" 
          style={{ 
            padding: 0, 
            overflow: 'hidden', 
            position: 'relative', 
            cursor: 'pointer',
            border: '1px solid rgba(0,0,0,0.05)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }} 
          onClick={() => setReadItem(item)}
        >
          {/* Badge de Categoría */}
          <div style={{ 
            position: 'absolute', 
            top: '12px', 
            left: '12px', 
            zIndex: 10,
            background: getCategoryColor(item.categoria),
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            {getCategoryLabel(item.categoria)}
          </div>

          {/* Visual Content */}
          <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
            {item.tipoArchivo === 'video' ? (
              <div style={{ height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <video src={item.archivoUrl} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
                <div style={{ position: 'absolute', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', padding: '0.8rem', borderRadius: '50%', color: 'white', fontSize: '1.5rem', border: '2px solid white' }}>▶️</div>
              </div>
            ) : (
              <SafeImage src={item.archivoUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
            
            {/* Overlay Gradient */}
            <div style={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              height: '50%', 
              background: 'linear-gradient(transparent, rgba(0,0,0,0.4))',
              pointerEvents: 'none'
            }}></div>
          </div>

          {/* Info Section */}
          <div style={{ padding: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  fontSize: '1.1rem', 
                  margin: 0, 
                  color: 'var(--text-main)', 
                  fontWeight: 'bold',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {item.titulo}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  🗓️ {formatSafeDate(item.fecha, 'dd MMM, yyyy')}
                </p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); handleDelete(item._id, 'galeria'); }} 
                style={{ 
                  background: 'rgba(244, 67, 54, 0.08)', 
                  color: '#F44336', 
                  border: 'none', 
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px', 
                  cursor: 'pointer', 
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: '0.2s'
                }}
                className="zoom-hover"
                title="Eliminar de la galería"
              >
                🗑️
              </button>
            </div>
            
            {item.descripcion && (
              <p style={{ 
                fontSize: '0.8rem', 
                color: 'var(--text-muted)', 
                marginTop: '10px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.4
              }}>
                {item.descripcion}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GaleriaList;
