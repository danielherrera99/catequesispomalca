import React from 'react';

const PerfilView = ({ 
  data, 
  loading, 
  ActivityIndicator, 
  SafeImage, 
  isProfileEditing, 
  setIsProfileEditing, 
  profileData, 
  setProfileData, 
  handleUpdatePerfil, 
  getSafeDateForInput, 
  formatSafeDate 
}) => {
  const user = Array.isArray(data) ? {} : data;
  if (loading) return <div style={{ textAlign: 'center', padding: '3rem' }}><ActivityIndicator /> Cargando tu perfil...</div>;

  return (
    <div className="animate-fade" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Cabecera del Perfil */}
        <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', height: '140px', position: 'relative' }}>
           <div style={{ position: 'absolute', bottom: '-50px', left: '40px', width: '120px', height: '120px', borderRadius: '50%', border: '5px solid white', background: 'white', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
              <SafeImage src={user.foto} style={{ width: '100%', height: '100%' }} />
           </div>
        </div>
        
        <div style={{ padding: '60px 40px 40px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '2.2rem', margin: 0, color: 'var(--text-main)' }}>{user.nombre} {user.apellido}</h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '4px' }}>🛡️ {user.cargo || 'Miembro de Comunidad'}</p>
              <span style={{ fontSize: '0.85rem', background: '#E0E7FF', color: '#3730A3', padding: '4px 12px', borderRadius: '20px', fontWeight: 'bold', marginTop: '10px', display: 'inline-block' }}>
                 {user.etapaFormacion ? user.etapaFormacion.toUpperCase() : 'Catequesis Pomalca'}
              </span>
            </div>
            <button 
              onClick={() => { setIsProfileEditing(!isProfileEditing); setProfileData({...user}); }} 
              className="btn zoom-hover" 
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', fontWeight: 'bold' }}
            >
              {isProfileEditing ? 'Cancelar Edición' : '✏️ Editar mi Información'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isProfileEditing ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', marginTop: '3rem' }}>
            
            {/* Formulario de Edición o Info Estática */}
            {isProfileEditing ? (
              <form onSubmit={handleUpdatePerfil} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                 <div className="input-group">
                    <label>Nombre(s)</label>
                    <input type="text" value={profileData.nombre || ''} onChange={e => setProfileData({...profileData, nombre: e.target.value})} required />
                 </div>
                 <div className="input-group">
                    <label>Apellido(s)</label>
                    <input type="text" value={profileData.apellido || ''} onChange={e => setProfileData({...profileData, apellido: e.target.value})} required />
                 </div>
                 <div className="input-group">
                    <label>Correo Electrónico</label>
                    <input type="email" value={profileData.email || ''} onChange={e => setProfileData({...profileData, email: e.target.value})} placeholder="ej: nombre@gmail.com" />
                 </div>
                 <div className="input-group">
                    <label>Teléfono de Contacto</label>
                    <input type="text" value={profileData.telefono || ''} onChange={e => setProfileData({...profileData, telefono: e.target.value})} />
                 </div>
                 <div className="input-group">
                    <label>Contacto Emergencia (Nombre)</label>
                    <input type="text" value={profileData.nombreContactoEmergencia || ''} onChange={e => setProfileData({...profileData, nombreContactoEmergencia: e.target.value})} placeholder="Ej: Papá / Mamá" />
                 </div>
                 <div className="input-group">
                    <label>Número de Emergencia</label>
                    <input type="text" value={profileData.contactoEmergencia || ''} onChange={e => setProfileData({...profileData, contactoEmergencia: e.target.value})} placeholder="+123456789" />
                 </div>
                 <div className="input-group">
                    <label>Fecha de Nacimiento</label>
                    <input type="date" value={getSafeDateForInput(profileData.fechaNacimiento)} onChange={e => setProfileData({...profileData, fechaNacimiento: e.target.value})} />
                 </div>
                 <div className="input-group">
                    <label>Cambiar Foto de Perfil</label>
                    <input type="file" accept="image/*" onChange={e => setProfileData({...profileData, nuevaFotoFile: e.target.files[0]})} />
                 </div>
                 <div className="input-group" style={{ gridColumn: 'span 2' }}>
                    <label>Nueva Contraseña (Dejar vacío si no deseas cambiarla)</label>
                    <input type="password" placeholder="Mínimo 6 caracteres" value={profileData.password || ''} onChange={e => setProfileData({...profileData, password: e.target.value})} />
                 </div>
                 <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>💾 Guardar mis Cambios</button>
                 </div>
              </form>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                     <span style={{ fontSize: '1.5rem' }}>📧</span>
                     <div>
                       <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Institucional</p>
                       <p style={{ margin: 0, fontWeight: 'bold' }}>{user.email || 'No registrado'}</p>
                     </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                     <span style={{ fontSize: '1.5rem' }}>📱</span>
                     <div>
                       <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Teléfono / WhatsApp</p>
                       <p style={{ margin: 0, fontWeight: 'bold' }}>{user.telefono || 'Sin registrar'}</p>
                     </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                     <span style={{ fontSize: '1.5rem' }}>🆘</span>
                     <div>
                       <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Emergencia ({user.nombreContactoEmergencia || 'Contacto'})</p>
                       <p style={{ margin: 0, fontWeight: 'bold' }}>{user.contactoEmergencia || 'Sin registrar'}</p>
                     </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.2rem', background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
                     <span style={{ fontSize: '1.5rem' }}>🎂</span>
                     <div>
                       <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cumpleaños</p>
                       <p style={{ margin: 0, fontWeight: 'bold' }}>{formatSafeDate(user.fechaNacimiento, 'dd MMMM yyyy')}</p>
                     </div>
                  </div>
                </div>

                {/* QR de Identidad */}
                <div style={{ textAlign: 'center', padding: '2rem', background: 'var(--surface)', borderRadius: '20px', border: '2px dashed var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                   <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--primary)' }}>🆔 Mi Credencial Digital</h3>
                   {user.codigoQR ? (
                     <img src={user.codigoQR} style={{ width: '180px', height: '180px', marginBottom: '1rem' }} alt="QR Identidad" />
                   ) : (
                     <div style={{ width: '180px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f5f5', marginBottom: '1rem' }}><ActivityIndicator /></div>
                   )}
                   <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Usa este QR para marcar asistencia en reuniones de Comunidad.</p>
                   <button onClick={() => { const link = document.createElement('a'); link.href = user.codigoQR; link.download = `QR_${user.nombre}.png`; link.click(); }} style={{ marginTop: '1rem', background: 'none', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '6px 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>📥 Descargar mi QR</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilView;
