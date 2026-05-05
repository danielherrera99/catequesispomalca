import fs from 'fs';

let code = fs.readFileSync('src/App.jsx', 'utf8');

const imports = [
  "import AsistenciaView from './components/views/AsistenciaView';",
  "import DashboardView from './components/views/DashboardView';",
  "import PerfilView from './components/views/PerfilView';",
  "import MapaView from './components/views/MapaView';",
  "import MisMensajesView from './components/views/MisMensajesView';",
  "import MensajesAdminView from './components/views/MensajesAdminView';"
].join('\n');

// Add imports near other component imports
code = code.replace(/import DocumentosList from '\.\/components\/lists\/DocumentosList';/, "import DocumentosList from './components/lists/DocumentosList';\n" + imports);


// Replace switch cases
code = code.replace(/case 'Asistencia':\s*return renderAsistencia\(\);/,
  "case 'Asistencia': return <AsistenciaView groupedAsistencias={groupedAsistencias} expandedArchivos={expandedArchivos} toggleArchivo={toggleArchivo} selectedAsistenciaDate={selectedAsistenciaDate} setSelectedAsistenciaDate={setSelectedAsistenciaDate} />;"
);

code = code.replace(/case 'Dashboard':\s*return renderDashboard\(\);/,
  "case 'Dashboard': return <DashboardView loading={loading} data={data} user={user} formatSafeDate={formatSafeDate} setActiveTab={setActiveTab} handleApprove={handleApprove} ActivityIndicator={ActivityIndicator} />;"
);

code = code.replace(/case 'Perfil':\s*return renderPerfil\(\);/,
  "case 'Perfil': return <PerfilView data={data} loading={loading} ActivityIndicator={ActivityIndicator} SafeImage={SafeImage} isProfileEditing={isProfileEditing} setIsProfileEditing={setIsProfileEditing} profileData={profileData} setProfileData={setProfileData} handleUpdatePerfil={handleUpdatePerfil} getSafeDateForInput={getSafeDateForInput} formatSafeDate={formatSafeDate} />;"
);

code = code.replace(/case 'Mapa':\s*return renderMapa\(\);/,
  "case 'Mapa': return <MapaView data={data} loading={loading} ActivityIndicator={ActivityIndicator} setReadItem={setReadItem} setActiveTab={setActiveTab} />;"
);

code = code.replace(/case 'Mis Mensajes':\s*return renderMisMensajes\(\);/,
  "case 'Mis Mensajes': return <MisMensajesView loading={loading} ActivityIndicator={ActivityIndicator} data={data} showSearchChat={showSearchChat} setShowSearchChat={setShowSearchChat} openChatPersonal={openChatPersonal} SafeImage={SafeImage} activeChat={activeChat} user={user} formatSafeDate={formatSafeDate} chatLoading={chatLoading} chatMessages={chatMessages} handleSendChat={handleSendChat} nuevoMensaje={nuevoMensaje} setNuevoMensaje={setNuevoMensaje} />;"
);

code = code.replace(/case 'Mensajes':\s*return renderMensajes\(\);/,
  "case 'Mensajes': return <MensajesAdminView loading={loading} ActivityIndicator={ActivityIndicator} data={data} openChatAdmin={openChatAdmin} formatSafeDate={formatSafeDate} />;"
);

fs.writeFileSync('src/App.jsx', code);
console.log('Update switch cases done!');
