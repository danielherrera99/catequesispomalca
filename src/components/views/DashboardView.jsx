import React, { useMemo } from 'react';
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend, AreaChart, Area 
} from 'recharts';

const DashboardView = ({ loading, data, user, formatSafeDate, setActiveTab, handleApprove, ActivityIndicator }) => {
  
  const [chartFilter, setChartFilter] = React.useState('semana'); // 'semana' o 'mes'

  // Procesamiento de Datos para Gráficos
  const chartData = useMemo(() => {
    if (!data) return { attendance: [], distribution: [], birthdays: [], missingDocs: [] };

    // 1. Procesar Asistencia (Tendencia)
    const now = new Date();
    const oneWeekAgo = new Date(now);
    oneWeekAgo.setDate(now.getDate() - 7);
    const twoWeeksAgo = new Date(now);
    twoWeeksAgo.setDate(now.getDate() - 14);

    const attendanceMap = {};
    const prevWeekMap = {};

    (data.asistencias || []).forEach(asis => {
      const asisDate = new Date(asis.fecha);
      const dateKey = formatSafeDate(asis.fecha, 'dd/MM');
      const count = asis.presentes?.length || 0;

      if (asisDate >= oneWeekAgo) {
        attendanceMap[dateKey] = (attendanceMap[dateKey] || 0) + count;
      } else if (asisDate >= twoWeeksAgo) {
        prevWeekMap[dateKey] = (prevWeekMap[dateKey] || 0) + count;
      }
    });
    
    // Unir datos para comparativa
    const attendance = Object.keys(attendanceMap).map(date => ({
      name: date,
      actual: attendanceMap[date],
      anterior: prevWeekMap[date] || 0
    })).slice(-7);

    // 2. Procesar Distribución por Cargos
    const positionsMap = {
      'coordinador': { name: 'Coordinador', value: 0, color: '#38BDF8' },
      'subcoordinadora': { name: 'Subcoordinadora', value: 0, color: '#818CF8' },
      'secretario': { name: 'Secretario', value: 0, color: '#10B981' },
      'tesorera': { name: 'Tesorera', value: 0, color: '#F59E0B' },
      'pro tesorera': { name: 'Pro tesorera', value: 0, color: '#EC4899' },
      'delegado': { name: 'Delegado', value: 0, color: '#8B5CF6' },
      'ninguno': { name: 'Sin Cargo', value: 0, color: '#94A3B8' }
    };

    const birthdays = [];
    const missingDocs = [];
    const todayStr = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });

    (data.Miembros || []).forEach(h => {
      // Cargos
      const cargo = (h.cargo || 'ninguno').toLowerCase();
      if (positionsMap[cargo]) {
        positionsMap[cargo].value++;
      } else {
        positionsMap['ninguno'].value++;
      }

      // Cumpleaños
      if (h.fechaNacimiento) {
        const bdayStr = new Date(h.fechaNacimiento).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
        if (bdayStr === todayStr) birthdays.push(h);
      }

    const distribution = Object.values(positionsMap).filter(s => s.value > 0);

    return { attendance, distribution, birthdays };
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
      <div className="flex-responsive" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ color: 'var(--primary)', margin: 0 }}>Bienvenido, {user?.nombre || 'Catequista'} 👋</h2>
          <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0' }}>Aquí tienes el resumen actual de la Comunidad.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
           <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--primary)' }}>{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
      </div>

      <div className="flex-responsive" style={{ gap: '1rem', marginBottom: '2.5rem' }}>
        {[
          { label: 'Asistencia', icon: '➕', tab: 'Asistencia' },
          { label: 'Anuncio', icon: '📝', tab: 'Anuncios' },
          { label: 'Documento', icon: '📂', tab: 'Documentos' },
          { label: 'Mapa', icon: '📍', tab: 'Mapa' }
        ].map((action, i) => (
          <button 
            key={i} 
            onClick={() => setActiveTab(action.tab)}
            className="glass-card zoom-hover"
            style={{ 
              flex: 1, 
              padding: '1.2rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '12px', 
              cursor: 'pointer',
              border: '1px solid var(--border)',
              background: 'white',
              fontWeight: 'bold',
              color: 'var(--primary)',
              fontSize: '0.95rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{action.icon}</span> {action.label}
          </button>
        ))}
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

      {/* SECCIÓN DE GRÁFICOS Y COMUNIDAD */}
      <div className="charts-grid" style={{ gridTemplateColumns: '2fr 1fr' }}>
        
        {/* Gráfico de Tendencia de Asistencia */}
        <div className="glass-card" style={{ padding: '1.5rem', minHeight: '350px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              📈 Tendencia de Asistencia
            </h3>
            <div className="flex-responsive" style={{ gap: '5px' }}>
               {['Semana', 'Mes'].map(f => (
                 <button 
                  key={f}
                  onClick={() => setChartFilter(f.toLowerCase())}
                  style={{ 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontSize: '0.7rem', 
                    border: '1px solid var(--border)',
                    background: chartFilter === f.toLowerCase() ? 'var(--primary)' : 'white',
                    color: chartFilter === f.toLowerCase() ? 'white' : 'var(--text-muted)',
                    cursor: 'pointer'
                  }}
                 >
                   {f}
                 </button>
               ))}
            </div>
          </div>
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData.attendance}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#666'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#666'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
                <Area name="Semana Actual" type="monotone" dataKey="actual" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                <Area name="Semana Anterior" type="monotone" dataKey="anterior" stroke="#94A3B8" strokeWidth={2} strokeDasharray="5 5" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '10px' }}>Comparativa de asistencia entre periodos.</p>
        </div>

        {/* Distribución por Cargos */}
        <div className="glass-card" style={{ padding: '1.5rem', minHeight: '350px' }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🍩 Distribución por Cargos
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
                <Legend iconType="circle" wrapperStyle={{ fontSize: '0.75rem' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="responsive-grid" style={{ '--grid-min': '300px', gridTemplateColumns: '1.2fr 1fr 0.8fr', marginTop: '2rem' }}>
         
         {/* Alertas de Comunidad */}
         <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginTop: 0, color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem', marginBottom: '1rem', fontSize: '1.1rem' }}>📣 Comunidad</h3>
            
            {/* Cumpleaños */}
            {chartData.birthdays.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.8rem', fontWeight: 'bold', color: '#EC4899', textTransform: 'uppercase' }}>🎂 Cumpleaños de hoy</p>
                {chartData.birthdays.map(h => (
                  <div key={h._id} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FDF2F8', padding: '10px', borderRadius: '10px', marginBottom: '5px' }}>
                    <span style={{ fontSize: '1.2rem' }}>🎁</span>
                    <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold' }}>{h.nombre} {h.apellido}</p>
                  </div>
                ))}
              </div>
            )}

            </div>
         </div>

         {/* Próximo Evento / Actividad */}
         <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(139, 90, 43, 0.1)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '5rem', opacity: 0.05 }}>🗓️</div>
            <h3 style={{ marginTop: 0, color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Próxima Cita</h3>
            {proxEvento ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ background: 'var(--primary)', color: 'white', padding: '0.8rem', borderRadius: '12px', textAlign: 'center', minWidth: '60px' }}>
                        <p style={{ margin: 0, fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.8 }}>{formatSafeDate(proxEvento.fecha, 'MMM')}</p>
                        <h4 style={{ margin: 0, fontSize: '1.5rem' }}>{formatSafeDate(proxEvento.fecha, 'dd')}</h4>
                    </div>
                    <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)' }}>{proxEvento.titulo}</h4>
                        <p style={{ margin: '2px 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>📍 {proxEvento.lugar}</p>
                    </div>
                 </div>
                 <button 
                  onClick={() => setActiveTab('Eventos')} 
                  style={{ 
                    width: '100%', 
                    padding: '14px', 
                    borderRadius: '12px', 
                    background: 'var(--primary)', 
                    color: 'white', 
                    border: 'none', 
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    fontSize: '1rem',
                    boxShadow: '0 4px 10px rgba(139, 90, 43, 0.2)',
                    marginTop: '5px'
                  }}
                  className="zoom-hover"
                >
                  Ver detalles completos
                </button>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '1rem' }}>No hay eventos programados. 💤</p>
            )}
         </div>

         {/* Recursos Rápidos */}
         <div className="glass-card" style={{ padding: '1.5rem' }}>
            <h3 style={{ marginTop: 0, color: 'var(--primary)', borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem', marginBottom: '1rem', fontSize: '1.1rem' }}>🔗 Recursos</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
               {[
                 { label: 'Evangelio del Día', icon: '📖', url: 'https://www.vaticannews.va/es/evangelio-de-hoy.html' },
                 { label: 'Calendario Litúrgico', icon: '📅', url: 'https://www.ciudadredonda.org/calendario-liturgico' },
                 { label: 'Manual de Usuario', icon: '🛠️', url: '#' }
               ].map((res, i) => (
                 <a 
                  key={i} 
                  href={res.url} 
                  target="_blank" 
                  rel="noreferrer"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    padding: '12px', 
                    background: '#F8FAFC', 
                    borderRadius: '12px', 
                    textDecoration: 'none', 
                    color: 'var(--text-main)',
                    fontSize: '0.85rem',
                    border: '1px solid #f1f5f9'
                  }}
                  className="zoom-hover"
                 >
                   <span style={{ fontSize: '1.1rem' }}>{res.icon}</span> {res.label}
                 </a>
               ))}
            </div>
         </div>
      </div>

      <div className="responsive-grid" style={{ '--grid-min': '300px', marginTop: '2.5rem' }}>
         
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
