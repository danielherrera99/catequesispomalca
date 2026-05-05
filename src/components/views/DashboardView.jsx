import React, { useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area 
} from 'recharts';

const DashboardView = ({ loading, data, user, formatSafeDate, setActiveTab, handleApprove, ActivityIndicator }) => {
  
  // Procesamiento de Datos para Gráficos
  const chartData = useMemo(() => {
    if (!data) return { attendance: [], distribution: [] };

    // 1. Procesar Asistencia (Tendencia)
    // Asumiendo que data.asistencias es un array de objetos con { fecha, presentes: [] } o similar
    // Si la estructura es diferente, ajustamos. Generalmente es un array de registros por fecha.
    const attendanceMap = {};
    (data.asistencias || []).forEach(asis => {
      const date = formatSafeDate(asis.fecha, 'dd/MM');
      attendanceMap[date] = (attendanceMap[date] || 0) + (asis.presentes?.length || 0);
    });
    
    const attendance = Object.keys(attendanceMap).map(date => ({
      name: date,
      asistencia: attendanceMap[date]
    })).slice(-7); // Últimas 7 fechas

    // 2. Procesar Etapas de Formación
    const stagesMap = {
      'aspirante': { name: 'Aspirantes', value: 0, color: '#94A3B8' },
      'iniciado': { name: 'Iniciados', value: 0, color: '#38BDF8' },
      'en_formacion': { name: 'Formación', value: 0, color: '#818CF8' },
      'promesado': { name: 'Promesados', value: 0, color: '#10B981' }
    };

    (data.Miembros || []).forEach(h => {
      const etapa = h.etapaFormacion || 'aspirante';
      if (stagesMap[etapa]) stagesMap[etapa].value++;
    });

    const distribution = Object.values(stagesMap).filter(s => s.value > 0);

    return { attendance, distribution };
  }, [data, formatSafeDate]);

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem' }}><ActivityIndicator /> Generando resumen del panel...</div>;
  
  const totalMiembros = data.Miembros?.length || 0;
  const activos = data.Miembros?.filter(h => h.activo)?.length || 0;
  const pendientes = totalMiembros - activos;
  const proxEvento = (data.eventos || [])
    .filter(e => new Date(e.fecha) >= new Date())
    .sort((a,b) => new Date(a.fecha) - new Date(b.fecha))[0];
  const ultimosAnuncios = (data.anuncios || []).slice(0, 3);

  const COLORS = ['#38BDF8', '#818CF8', '#10B981', '#94A3B8', '#F59E0B'];

  return (
    <div className="animate-fade">
      <div className="flex-responsive" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ color: 'var(--primary)', margin: 0 }}>Bienvenido, {user?.nombre || 'Catequista'} 👋</h2>
          <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0' }}>Aquí tienes el resumen actual de la Comunidad.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
           <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--primary)' }}>{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
      </div>
      
      {/* Estadísticas Rápidas */}
      <div className="stats-grid">
        {[
          { label: 'Miembros TOTALES', value: totalMiembros, icon: '👥', color: 'var(--text-main)', bg: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)' },
          { label: 'ACTIVOS', value: activos, icon: '✅', color: '#10B981', border: '#10B981' },
          { label: 'PENDIENTES', value: pendientes, icon: '⏳', color: '#F59E0B', border: '#F59E0B' },
          { label: 'EN CALENDARIO', value: data.eventos?.length || 0, icon: '📅', color: '#6366F1', border: '#6366F1' }
        ].map((stat, i) => (
          <div key={i} className="glass-card zoom-hover" style={{ 
            padding: '1.5rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            background: stat.bg || 'white',
            borderLeft: stat.border ? `5px solid ${stat.border}` : 'none'
          }}>
             <div style={{ fontSize: '2.2rem' }}>{stat.icon}</div>
             <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'bold', letterSpacing: '1px' }}>{stat.label}</p>
                <h3 style={{ margin: 0, fontSize: '1.8rem', color: stat.color }}>{stat.value}</h3>
             </div>
          </div>
        ))}
      </div>

      {/* SECCIÓN DE GRÁFICOS */}
      <div className="charts-grid">
        
        {/* Gráfico de Tendencia de Asistencia */}
        <div className="glass-card" style={{ padding: '1.5rem', minHeight: '350px' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            📈 Tendencia de Asistencia
          </h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData.attendance}>
                <defs>
                  <linearGradient id="colorAsis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818CF8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818CF8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#666'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#666'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  itemStyle={{ color: '#4F46E5', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="asistencia" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorAsis)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '10px' }}>Basado en los últimos 7 registros de asistencia.</p>
        </div>

        {/* Gráfico de Distribución por Etapas */}
        <div className="glass-card" style={{ padding: '1.5rem', minHeight: '350px' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🍩 Distribución por Etapas
          </h3>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={chartData.distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '0.85rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="responsive-grid" style={{ '--grid-min': '300px' }}>
         
         {/* Próximo Evento / Actividad */}
         <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(139, 90, 43, 0.1)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '5rem', opacity: 0.05 }}>🗓️</div>
            <h3 style={{ marginTop: 0, color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem', marginBottom: '1.5rem' }}>Próxima Cita</h3>
            {proxEvento ? (
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                 <div style={{ background: 'var(--primary)', color: 'white', padding: '1rem', borderRadius: '15px', textAlign: 'center', minWidth: '80px', boxShadow: '0 4px 12px rgba(139, 90, 43, 0.2)' }}>
                    <p style={{ margin: 0, fontSize: '0.8rem', textTransform: 'uppercase', opacity: 0.8 }}>{formatSafeDate(proxEvento.fecha, 'MMM')}</p>
                    <h4 style={{ margin: 0, fontSize: '2.2rem' }}>{formatSafeDate(proxEvento.fecha, 'dd')}</h4>
                 </div>
                 <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-main)' }}>{proxEvento.titulo}</h4>
                    <p style={{ margin: '5px 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>📍 {proxEvento.lugar}</p>
                    <button onClick={() => setActiveTab('Eventos')} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontWeight: 'bold', cursor: 'pointer', padding: 0, marginTop: '10px', fontSize: '0.9rem' }}>Ver detalles →</button>
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
               <button onClick={() => setActiveTab('Anuncios')} className="btn" style={{ width: '100%', marginTop: '1rem', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-main)', fontSize: '0.9rem' }}>Gestionar Anuncios ✅</button>
            </div>
         </div>

      </div>

      {/* Módulo de Aprobación Crítica */}
      {pendientes > 0 && (
        <div className="glass-card animate-fade" style={{ marginTop: '2.5rem', border: '2px solid #F59E0B', background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ margin: 0, color: '#B45309', display: 'flex', alignItems: 'center', gap: '10px' }}>⚠️ {pendientes} Solicitudes Pendientes</h3>
              <p style={{ color: '#D97706', fontSize: '0.85rem', margin: '5px 0 0 0' }}>Miembros esperando aprobación para acceder a la App.</p>
            </div>
            <button onClick={() => setActiveTab('Miembros')} style={{ background: '#B45309', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '10px', fontSize: '0.8rem', cursor: 'pointer' }}>Ver Todos</button>
          </div>
          <div className="responsive-grid" style={{ '--grid-min': '280px' }}>
            {data.Miembros.filter(h => !h.activo).slice(0, 4).map(h => (
              <div key={h._id} style={{ background: 'white', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem' }}>{h.nombre} {h.apellido}</p>
                  <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--text-muted)' }}>{h.email || `@${h.username}`}</p>
                </div>
                <button 
                  onClick={(e) => handleApprove(h._id, e)} 
                  style={{ background: '#10B981', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s', fontSize: '0.8rem' }}
                  className="zoom-hover"
                >
                  Aprobar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardView;
